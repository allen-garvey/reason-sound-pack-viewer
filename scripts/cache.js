import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

import { API_CACHE_DIR, API_PATH } from './values.js';

export const createDirectory = path =>
    fs.promises.mkdir(path, { recursive: true });

export const getFileListSet = path =>
    fs.promises.readdir(path).then(files => Promise.resolve(new Set(files)));

export const fetchPack = (cachedPacksSet, packId) => {
    const cachedPackFilename = `${packId}.json`;
    const cachedPackPath = path.join(API_CACHE_DIR, cachedPackFilename);

    if (cachedPacksSet.has(cachedPackFilename)) {
        return fs.promises
            .readFile(cachedPackPath, 'utf-8')
            .then(contents => Promise.resolve(JSON.parse(contents)));
    }

    return fetch(`${API_PATH}/${packId}`)
        .then(res => res.json())
        .then(json =>
            fs.promises
                .writeFile(cachedPackPath, JSON.stringify(json))
                .then(() => Promise.resolve(json))
        );
};
