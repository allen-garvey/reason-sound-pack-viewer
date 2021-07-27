import { normalizeDeviceName } from './device-normalizer';

const fillSet = (masterMap, items, packId, key='title') => {
    return items.reduce((localSet, item) => { 
        const itemName = item[key] || item;
        if(masterMap.has(itemName)){
            masterMap.get(itemName).push(packId);
        }
        else {
            masterMap.set(itemName, [packId]);
        }
        localSet.add(itemName);
        return localSet;
    }, new Set);
};

export const getPacks = () => 
    fetch('/packs.json')
    .then((res) => res.json())
    .then((packs) => {
        const packsMap = {};
        const packTagsMap = new Map();
        const patchTagsMap = new Map();
        const patchDevicesMap = new Map();
        const creatorsMap = new Map();
        packs.forEach((packRaw) => {
            const id = packRaw.id;
            const author = packRaw.authorDisplayName;

            const pack = {
                id,
                title: packRaw.title,
                coverPhoto: {
                    webp: `/images/pack-${id}.webp`,
                    png: packRaw.coverPhoto,
                },
                author,
                previewUrl: packRaw.audio?.audioPreviewKey,
                description: packRaw.description,
                size: packRaw.size,
                tags: fillSet(packTagsMap, packRaw.tagList, id),
                patches: packRaw.patchList.map((patch) => {
                    const devices = (patch.data.devices.rackExtensions || patch.data.devices.builtin || []).map((deviceRaw) => {
                        const deviceName = typeof deviceRaw === 'object' ? deviceRaw.name : deviceRaw;
                        return normalizeDeviceName(deviceName);
                    });
                    return {
                        id: patch.id,
                        name: patch.patchName,
                        previewUrl: patch.patchAudio?.audioPreviewKey,
                        tags: fillSet(patchTagsMap, patch.tagList, id),
                        devices: fillSet(patchDevicesMap, devices, id, null),
                    }
                }),
            };
            if(creatorsMap.has(author)){
                creatorsMap.get(author).push(id);
            }
            else{
                creatorsMap.set(author, [id]);
            }
            packsMap[id] = pack;
        });

        return {packsMap, packTagsMap, patchTagsMap,patchDevicesMap, creatorsMap};
    });