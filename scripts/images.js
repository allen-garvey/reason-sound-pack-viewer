import path from 'path';
import sharp from 'sharp';
import { IMAGES_DIR } from './values.js';

const IMAGE_DIMENSIONS = 300;

export const getPackImageName = pack => `pack-${pack.id}.webp`;

export const getFetchAndSaveImageForPack = pack => {
    const imageName = getPackImageName(pack);
    return fetch(pack.coverPhoto)
        .then(res => res.arrayBuffer())
        .then(data =>
            sharp(Buffer.from(data))
                .resize({
                    width: IMAGE_DIMENSIONS,
                    height: IMAGE_DIMENSIONS,
                    quality: 85,
                })
                .toFile(path.join(IMAGES_DIR, imageName))
        )
        .then(() => 1);
};
