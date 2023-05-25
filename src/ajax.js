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
        
        packs.forEach(pack => {
            const id = pack.id;
            const author = pack.author;

            pack.coverPhoto = {
                webp: `/images/pack-${id}.webp`,
                png: pack.coverPhoto,
            };
            pack.patches = pack.patches.map((patch) => {
                patch.tags = fillInnerSet(patchTagsMap, patch.tags, id);
                patch.devices = fillInnerSet(patchDevicesMap, patch.devices, id, null);
                return patch;
            });
            pack.tags = fillSet(packTagsMap, pack.tags, id);

            if(creatorsMap.has(author)){
                creatorsMap.get(author).push(id);
            }
            else{
                creatorsMap.set(author, [id]);
            }
            packsMap[id] = pack;
        });

        return { packsMap, packTagsMap, patchTagsMap,patchDevicesMap, creatorsMap };
    });