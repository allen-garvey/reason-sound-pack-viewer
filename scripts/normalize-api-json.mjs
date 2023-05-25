import { normalizeDeviceName } from './device-normalizer.mjs';

/**
@param {Object} map
@param {String} value
@returns {Number}
*/
const getIdAndAddToMap = (map, value) => {
    if(map[value]){
        return map[value];
    }
    const id = Object.keys(map).length + 1;
    map[value] = id;
    return id;
};

const reverseObject = (object) => Object.fromEntries(Object.entries(object).map(([key, value]) => [value, key]));

/**
@param {Array.<Object>} rawJson
@returns {Array.<Object>}
*/
export const normalizeApiJson = (rawJson) => {
    const patchTags = {};
    const packTags = {};
    const devicesMap = {};
    const creatorsMap = {};
    
    const packs = rawJson.map(pack => ({
        id: pack.id,
        title: pack.title,
        created: pack.created.replace(/T.*$/, ''),
        previewUrl: pack.audio?.audioPreviewKey,
        author: getIdAndAddToMap(creatorsMap, pack.authorDisplayName),
        coverPhoto: pack.coverPhoto,
        description: pack.description,
        size: pack.size,
        patches: pack.patchList.map(patch => {
            const devicesCombined = (patch.data.devices.rackExtensions || patch.data.devices.builtin || []).concat(patch.devices);

            const devices = [...new Set(devicesCombined.map((deviceRaw) => {
                const deviceName = typeof deviceRaw === 'object' ? deviceRaw.name : deviceRaw;
                return normalizeDeviceName(deviceName);
            })).keys()];

            return {
                id: patch.id,
                name: patch.patchName,
                previewUrl: patch.patchAudio?.audioPreviewKey,
                devices: devices.map(name => getIdAndAddToMap(devicesMap, name)),
                tags: patch.tagList.map(({id, title}) => {
                    patchTags[id] = title;
                    return id;
                }),
            };
        }),
        tags: pack.tagList.map(({id, title}) => {
            packTags[id] = title;
            return id;
        }),
    }));

    return {
        packs,
        patchTags,
        packTags,
        devicesMap: reverseObject(devicesMap),
        creators: reverseObject(creatorsMap),
    };
};