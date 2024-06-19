import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const API_PATH = 'https://nautilus.reasonstudios.com/pack';

export const OUTPUT_DIR = path.join(__dirname, '..', 'public_html');
export const IMAGES_DIR = path.join(__dirname, '..', 'public_html', 'images');

export const API_CACHE_DIR = path.join(__dirname, 'cache');
