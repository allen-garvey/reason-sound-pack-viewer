const VOLUME_SETTING_KEY = 'RPF_USER_VOLUME';
let volumeTimeout = null;

const getUserVolume = () => {
    const volume = parseFloat(localStorage.getItem(VOLUME_SETTING_KEY));
    
    if(isNaN(volume)){
        return 1;
    }

    return Math.max(Math.min(volume, 1), 0);
};

const saveUserVolume = (volume) => {
    clearTimeout(volumeTimeout);

    volumeTimeout = setTimeout(() => {
        localStorage.setItem(VOLUME_SETTING_KEY, volume);
    }, 500);
};


export default {
    getUserVolume,
    saveUserVolume,
};