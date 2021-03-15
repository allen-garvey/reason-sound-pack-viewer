export const getPacks = () => 
    fetch('/packs.json')
    .then((res) => res.json())
    .then((packs) => {
        const ret = {};
        packs.forEach((packRaw) => {
            const pack = {
                id: packRaw.id,
                title: packRaw.title,
                coverPhoto: packRaw.coverPhoto,
                author: packRaw.authorDisplayName,
                previewUrl: packRaw.audio?.audioPreviewKey,
                description: packRaw.description,
                patches: packRaw.patchList.map((patch) => ({
                    id: patch.id,
                    name: patch.patchName,
                    previewUrl: patch.patchAudio?.audioPreviewKey,
                })),
            };
            ret[pack.id] = pack;
        });

        return ret;
    });
