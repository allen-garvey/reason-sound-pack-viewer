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

const fillInnerSet = (masterMap, items, packId, key='title') => {
    return items.reduce((localSet, item) => { 
        const itemName = item[key] || item;
        let masterEntry;
        if(masterMap.has(itemName)){
            masterEntry = masterMap.get(itemName);
        }
        else {
            masterEntry = {
                length: 0,
                set: new Set(),
            };
            masterMap.set(itemName, masterEntry);
        }
        masterEntry.set.add(packId);
        masterEntry.length++;
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
                    const devicesCombined = (patch.data.devices.rackExtensions || patch.data.devices.builtin || []).concat(patch.devices);
                    
                    const devices = devicesCombined.map((deviceRaw) => {
                        const deviceName = typeof deviceRaw === 'object' ? deviceRaw.name : deviceRaw;
                        return normalizeDeviceName(deviceName);
                    });
                    return {
                        id: patch.id,
                        name: patch.patchName,
                        previewUrl: patch.patchAudio?.audioPreviewKey,
                        tags: fillInnerSet(patchTagsMap, patch.tagList, id),
                        devices: fillInnerSet(patchDevicesMap, devices, id, null),
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