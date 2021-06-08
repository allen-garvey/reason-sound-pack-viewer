const fillTagsSet = (set, tags) => {
    return tags.reduce((tagsSet, tag) => { 
        const tagName = tag.title;
        set.add(tagName);
        tagsSet.add(tagName);
        return tagsSet;
    }, new Set);
};

export const getPacks = () => 
    fetch('/packs.json')
    .then((res) => res.json())
    .then((packs) => {
        const packsMap = {};
        const packTagsSet = new Set();
        const patchTagsSet = new Set();
        packs.forEach((packRaw) => {
            const pack = {
                id: packRaw.id,
                title: packRaw.title,
                coverPhoto: `/images/pack-${packRaw.id}.webp`,
                author: packRaw.authorDisplayName,
                previewUrl: packRaw.audio?.audioPreviewKey,
                description: packRaw.description,
                tags: fillTagsSet(packTagsSet, packRaw.tagList),
                patches: packRaw.patchList.map((patch) => ({
                    id: patch.id,
                    name: patch.patchName,
                    previewUrl: patch.patchAudio?.audioPreviewKey,
                    tags: fillTagsSet(patchTagsSet, patch.tagList),
                })),
            };
            packsMap[pack.id] = pack;
        });

        return {packsMap, packTagsSet, patchTagsSet};
    });