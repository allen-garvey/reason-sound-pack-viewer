import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const mimeTypeMap = new Map([['.webp', 'image/webp']]);

// serve images from dist-images, so we don't have extra copying of images to the /dist folder
const serveStaticMiddleware = (req, res, next) => {
    const urlPrelude = '/images/';
    if (!req.url.startsWith(urlPrelude)) {
        return next();
    }
    const fileRelativePath = req.url.slice(urlPrelude.length);
    const fileSourcePath = path.join(
        import.meta.dirname,
        'dist-images',
        fileRelativePath
    );
    res.statusCode = 200;
    res.setHeader(
        'Content-Type',
        mimeTypeMap.get(path.extname(fileRelativePath))
    );
    const readStream = fs.createReadStream(fileSourcePath);
    readStream.pipe(res);
};

export default defineConfig({
    server: {
        port: 3000,
        open: true,
    },
    plugins: [
        vue(),
        {
            name: 'vite-serve-static-plugin',
            configureServer(server) {
                server.middlewares.use(serveStaticMiddleware);
            },
        },
    ],
});
