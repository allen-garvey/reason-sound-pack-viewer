import playStates from './play-states.js';

export const isMediaPlaying = (mediaId, globalMediaId, playState) =>
    mediaId === globalMediaId &&
    (playState === playStates.IS_PLAYING ||
        playState === playStates.IS_LOADING);
