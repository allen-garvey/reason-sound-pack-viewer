import path from 'path';

export const API_PATH = 'https://nautilus.reasonstudios.com/pack';

export const IMAGES_DIR = path.join(
    import.meta.dirname,
    '..',
    'public',
    'images'
);

export const API_CACHE_DIR = path.join(import.meta.dirname, 'cache');
