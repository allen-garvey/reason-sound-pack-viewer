export const getPacks = () => 
    fetch('/packs.json')
    .then((res) => res.json())
    .then((packs) => {
        const packsMap = {};
        const patchTagsSet = new Set();
        packs.forEach((packRaw) => {
            const pack = {
                id: packRaw.id,
                title: packRaw.title,
                coverPhoto: `/images/pack-${packRaw.id}.webp`,
                author: packRaw.authorDisplayName,
                previewUrl: packRaw.audio?.audioPreviewKey,
                description: packRaw.description,
                patches: packRaw.patchList.map((patch) => ({
                    id: patch.id,
                    name: patch.patchName,
                    previewUrl: patch.patchAudio?.audioPreviewKey,
                    tags: patch.tagList.reduce((tagsSet, tag) => { 
                        const tagName = tag.title;
                        patchTagsSet.add(tagName);
                        tagsSet.add(tagName);
                        return tagsSet;
                    }, new Set),
                })),
            };
            packsMap[pack.id] = pack;
        });

        return {packsMap, patchTagsSet};
    });