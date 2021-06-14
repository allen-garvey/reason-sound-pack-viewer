import { normalizeDeviceName } from './device-normalizer';

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
                coverPhoto: {
                    webp: `/images/pack-${packRaw.id}.webp`,
                    png: packRaw.coverPhoto,
                },
                author: packRaw.authorDisplayName,
                previewUrl: packRaw.audio?.audioPreviewKey,
                description: packRaw.description,
                size: packRaw.size,
                tags: fillSet(packTagsSet, packRaw.tagList),
                patches: packRaw.patchList.map((patch) => {
                    const devices = (patch.data.devices.rackExtensions || patch.data.devices.builtin || []).map((deviceRaw) => {
                        const deviceName = typeof deviceRaw === 'object' ? deviceRaw.name : deviceRaw;
                        return normalizeDeviceName(deviceName);
                    });
                    return {
                        id: patch.id,
                        name: patch.patchName,
                        previewUrl: patch.patchAudio?.audioPreviewKey,
                        tags: fillSet(patchTagsSet, patch.tagList),
                        devices: fillSet(patchDevicesSet, devices, null),
                    }
                }),
            };
            packsMap[pack.id] = pack;
        });

        return {packsMap, packTagsSet, patchTagsSet, patchDevicesSet};
    });