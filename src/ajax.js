const fillSet = (masterSet, items, key='title') => {
    return items.reduce((localSet, item) => { 
        const itemName = item[key] || item;
        masterSet.add(itemName);
        localSet.add(itemName);
        return localSet;
    }, new Set);
};

export const getPacks = () => 
    fetch('/packs.json')
    .then((res) => res.json())
    .then((packs) => {
        const packsMap = {};
        const packTagsSet = new Set();
        const patchTagsSet = new Set();
        const patchDevicesSet = new Set();
        packs.forEach((packRaw) => {
            const pack = {
                id: packRaw.id,
                title: packRaw.title,
                coverPhoto: `/images/pack-${packRaw.id}.webp`,
                author: packRaw.authorDisplayName,
                previewUrl: packRaw.audio?.audioPreviewKey,
                description: packRaw.description,
                tags: fillSet(packTagsSet, packRaw.tagList),
                patches: packRaw.patchList.map((patch) => {
                    const devices = patch.data.devices.rackExtensions || patch.data.devices.builtin || [];
                    return {
                        id: patch.id,
                        name: patch.patchName,
                        previewUrl: patch.patchAudio?.audioPreviewKey,
                        tags: fillSet(patchTagsSet, patch.tagList),
                        devices: fillSet(patchDevicesSet, devices, 'name'),
                    }
                }),
            };
            packsMap[pack.id] = pack;
        });

        return {packsMap, packTagsSet, patchTagsSet, patchDevicesSet};
    });