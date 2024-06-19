import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { normalizeApiJson } from './normalize-api-json.mjs';
import { API_PATH, OUTPUT_DIR, IMAGES_DIR, API_CACHE_DIR } from './values.mjs';
import { getFileListSet, createDirectory, fetchPack } from './cache.mjs';
import { writePackImages } from './images.mjs';

Promise.all([
    fetch(API_PATH),
    createDirectory(IMAGES_DIR),
    createDirectory(API_CACHE_DIR),
])
    .then(([res]) =>
        Promise.all([
            res.json(),
            getFileListSet(IMAGES_DIR),
            getFileListSet(API_CACHE_DIR),
        ])
    )
    .then(([packs, imageSet, cachedPacksSet]) => {
        const packsPromises = Promise.all(
            packs.map((pack) => fetchPack(cachedPacksSet, pack.id))
        );
        return Promise.all([packsPromises, Promise.resolve(imageSet)]);
    })
    .then(([packs, imageSet]) => {
        const promises = writePackImages(packs, imageSet);
        promises.push(
            fs.promises.writeFile(
                path.join(OUTPUT_DIR, 'packs.json'),
                JSON.stringify(normalizeApiJson(packs))
            )
        );

        return Promise.all(promises);
    })
    .then((results) => {
        const amountUpdated = results.reduce(
            (total, currentValue) =>
                currentValue === 1 ? total + currentValue : total,
            0
        );
        console.log(
            `${amountUpdated} pack cover${
                amountUpdated === 1 ? '' : 's'
            } downloaded`
        );
    });
