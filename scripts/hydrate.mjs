import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import sharp from 'sharp';
import * as url from 'url';
import { normalizeApiJson } from './normalize-api-json.mjs';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const OUTPUT_DIR = path.join(__dirname, '..', 'public_html');
const IMAGES_DIR = path.join(__dirname, '..', 'public_html', 'images');
const IMAGE_DIMENSIONS = 300;

const packImageName = (pack) => `pack-${pack.id}.webp`;

const createImageCacheSet = () => 
    fs.promises.readdir(IMAGES_DIR)
    .then((files) => Promise.resolve(new Set(files)));

const writePackImages = (packs, imageSet) => packs.map((pack) => {
    const imageName = packImageName(pack);
    if(imageSet.has(imageName)){
        return Promise.resolve();
    }
    return fetch(pack.coverPhoto)
        .then(res => res.arrayBuffer())
        .then((data) => sharp(Buffer.from(data))
            .resize({width: IMAGE_DIMENSIONS, height: IMAGE_DIMENSIONS, quality: 85})
            .toFile(path.join(IMAGES_DIR, imageName)))
        .then(() => 1);
});

Promise.all([
    fetch('https://nautilus.reasonstudios.com/pack/'),
    fs.promises.mkdir(IMAGES_DIR, {recursive: true})
])
    .then(([res]) => Promise.all([res.json(), createImageCacheSet()]))
    .then(([packs, imageSet]) => {
        const promises = writePackImages(packs, imageSet);
        promises.push(fs.promises.writeFile(path.join(OUTPUT_DIR, 'packs.json'), JSON.stringify(normalizeApiJson(packs))));
        
        return Promise.all(promises);
    })
    .then((results) => {
        const amountUpdated = results.reduce((total, currentValue) => currentValue === 1 ? total + currentValue : total, 0);
        console.log(`${amountUpdated} pack cover${amountUpdated === 1 ? '' : 's'} downloaded`);
    });