const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const OUTPUT_DIR = path.join(__dirname, '..', 'public_html');
const IMAGES_DIR = path.join(__dirname, '..', 'public_html', 'images');

fetch('https://nautilus.reasonstudios.com/pack/')
    .then(res => res.json())
    .then((packs) => {
        fs.promises.writeFile(path.join(OUTPUT_DIR, 'packs2.json'), JSON.stringify(packs))
    });