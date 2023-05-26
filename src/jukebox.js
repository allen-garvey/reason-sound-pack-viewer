const AUDIO_PREVIEW_URL_PREFIX = 'https://d3l7thry0a8a7p.cloudfront.net/audio/';

const corsUrlsMap = {
    '2c83841d-dd78-4c2e-8317-6297ace89aae/Hazy+Lofi/Hazy+Lofi+Demo+Track.wav': '/audio/hazy-lofi-demo-track.mp3',
    'ded5a2b6-5be5-462a-b193-73306ca5c749/Venus+Theory+-+Cinetronica/Cinetronica+Demo+Track.wav': '/audio/cinetronica-demo-track.mp3',
    'a36a53a5-ab7b-4ec5-a6b5-72cc7719cee4/Medicina+Dramatica/Medicina+Dramatica+Demo+Track.wav': '/audio/medicina-dramatica-demo-track.mp3',
};

export const generatePreviewUrl = (previewUrl) => {
    const corsBypassUrl = corsUrlsMap[previewUrl];
    return corsBypassUrl || `${AUDIO_PREVIEW_URL_PREFIX}${previewUrl}`;
};