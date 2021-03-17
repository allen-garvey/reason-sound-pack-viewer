const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const sharp = require('sharp');

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
        .then(res => res.buffer())
        .then((data) => sharp(data)
            .resize({width: IMAGE_DIMENSIONS, height: IMAGE_DIMENSIONS, quality: 85})
            .toFile(path.join(IMAGES_DIR, imageName)))
});

Promise.all([
    fetch('https://nautilus.reasonstudios.com/pack/'),
    fs.promises.mkdir(IMAGES_DIR, {recursive: true})
])
    .then(([res]) => Promise.all([res.json(), createImageCacheSet()]))
    .then(([packs, imageSet]) => {
        const promises = writePackImages(packs, imageSet);
        promises.push(fs.promises.writeFile(path.join(OUTPUT_DIR, 'packs.json'), JSON.stringify(packs)));
        
        return Promise.all(promises);
    });