import path from 'path';
import sharp from 'sharp';
import { IMAGES_DIR } from './values.mjs';

const IMAGE_DIMENSIONS = 300;

const packImageName = (pack) => `pack-${pack.id}.webp`;

export const writePackImages = (packs, imageSet) =>
    packs.map((pack) => {
        const imageName = packImageName(pack);
        if (imageSet.has(imageName)) {
            return Promise.resolve();
        }
        return fetch(pack.coverPhoto)
            .then((res) => res.arrayBuffer())
            .then((data) =>
                sharp(Buffer.from(data))
                    .resize({
                        width: IMAGE_DIMENSIONS,
                        height: IMAGE_DIMENSIONS,
                        quality: 85,
                    })
                    .toFile(path.join(IMAGES_DIR, imageName))
            )
            .then(() => 1);
    });
