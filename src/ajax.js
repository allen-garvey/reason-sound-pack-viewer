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
            };
            ret[pack.id] = pack;
        });

        return ret;
    });
