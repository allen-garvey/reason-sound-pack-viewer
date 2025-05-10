import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { normalizeApiJson } from './normalize-api-json.js';
import { API_PATH, OUTPUT_DIR, IMAGES_DIR, API_CACHE_DIR } from './values.js';
import { getFileListSet, createDirectory, fetchPack } from './cache.js';
import { getFetchAndSaveImageForPack, getPackImageName } from './images.js';

Promise.all([
    fetch(`${API_PATH}/`),
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
            packs.map(pack => fetchPack(cachedPacksSet, pack.id))
        );
        return Promise.all([packsPromises, Promise.resolve(imageSet)]);
    })
    .then(([packs, imageSet]) => {
        const packsThatNeedImages = packs.filter(pack => {
            const imageName = getPackImageName(pack);
            return !imageSet.has(imageName);
        });
        console.log(
            `Fetching images for ${packsThatNeedImages.length} pack(s).`
        );
        const promises = packsThatNeedImages.map(pack =>
            getFetchAndSaveImageForPack(pack)
        );
        promises.push(
            fs.promises.writeFile(
                path.join(OUTPUT_DIR, 'packs.json'),
                JSON.stringify(normalizeApiJson(packs))
            )
        );

        return Promise.all(promises);
    })
    .then(() => {
        console.log('Hydration complete.');
    });
