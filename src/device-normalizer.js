const deviceMap = new Map();

const RV700_NAME = 'RV7000 Reverb';
const THOR_NAME = 'Thor';
const MALSTROM_NAME = 'Malström';
const ALLIGATOR_NAME = 'Alligator Filter Gate';
const FRIKTION_NAME = 'Friktion Modeled Strings';
const KONG_NAME = 'Kong Drum Studio';
const NN19_NAME = 'NN-19 Sampler';
const NNXT_NAME = 'NN-XT Sampler';
const UMPF_NAME = 'Umpf Club Drums'
const SCREAM_NAME = 'Scream 4 Distortion';
const ROTOR_NAME = 'Rotor Rotary Speaker';
const REASON_DRUM_KITS_NAME = 'Reason Drum Kits';
const ALGORITM_NAME = 'Algoritm FM Synthesizer';
const AUDIOMATIC_NAME = 'Audiomatic Retro Transformer';
const RYTMIK_NAME = 'Rytmik Drum Machine';
const COMPLEX_NAME = 'Complex-1 Modular Synthesizer';
const EUROPA_NAME = 'Europa Shapeshifting Synthesizer';
const GRAIN_NAME = 'Grain Sample Manipulator';
const HUMANA_NAME = 'Humana Vocal Ensemble';
const KLANG_NAME = 'Klang Tuned Percussion';
const PANGEA_NAME = 'Pangea World Instruments';
const REASON_ELECTRIC_BASS_NAME = 'Reason Electric Bass';
const SWEEPER_NAME = 'Sweeper Modulation Effect';
const SYNCHRONOUS_NAME = 'Synchronous Effect Modulator';
const REDRUM_NAME = 'Redrum Drum Computer';
const QUARTET_NAME = 'Quartet Chorus Ensemble';
const PULVERISER_NAME = 'Pulveriser Demolition';
const PARSEC_NAME = 'Parsec Spectral Synthesizer';
const PULSAR_NAME = 'Pulsar Dual LFO';
const SCENIC_NAME = 'Scenic Hybrid Instrument';
const POLAR_NAME = 'Polar Dual Pitch Shifter';
const MONOTONE_NAME = 'Monotone Bass Synthesizer';
const MASTER_BUS_COMPRESSOR_NAME = 'Master Bus Compressor';
const LAYERS_WAVES_NAME = 'Layers Wave Edition';
const DRUM_SEQUENCER_NAME = 'Drum Sequencer';
const SOFTUBE_AMP_NAME = 'Softube Amp';
const SOFTUBE_BASS_AMP_NAME = 'Softube Bass Amp';
const SCALES_AND_CHORDS_NAME = 'Scales & Chords';
const RADICAL_PIANO_NAME = 'Radical Piano';
const PATTERN_MUTATOR_NAME = 'Pattern Mutator';
const DR_REX_NAME = 'Dr. Octo Rex Loop Player';
const LINE_MIXER_NAME = 'Line Mixer 6:2';
const MIXER_NAME = 'Mixer 14:2';
const DUAL_ARPEGGIO_NAME = 'Dual Arpeggio';

[
    RV700_NAME,
    KONG_NAME,
    ALLIGATOR_NAME,
    FRIKTION_NAME,
    UMPF_NAME,
    ROTOR_NAME,
    ALGORITM_NAME,
    AUDIOMATIC_NAME,
    COMPLEX_NAME,
    EUROPA_NAME,
    GRAIN_NAME,
    HUMANA_NAME,
    KLANG_NAME,
    PANGEA_NAME,
    SWEEPER_NAME,
    SYNCHRONOUS_NAME,
    REDRUM_NAME,
    QUARTET_NAME,
    PULVERISER_NAME,
    PARSEC_NAME,
    PULSAR_NAME,
    POLAR_NAME,
    MONOTONE_NAME,
].forEach((deviceFullName) => {
    const firstWord = deviceFullName.split(' ')[0];
    deviceMap.set(firstWord, deviceFullName);
});


deviceMap.set('NN19', NN19_NAME);
deviceMap.set('NN19 Sampler', NN19_NAME);
deviceMap.set('NN19 Digital Sampler', NN19_NAME);
deviceMap.set('NNXT', NNXT_NAME);
deviceMap.set('NNXT Digital Sampler', NNXT_NAME);
deviceMap.set('XWave Synth', MALSTROM_NAME);
deviceMap.set('CRM-3 Synth', THOR_NAME);
deviceMap.set('Scream4', SCREAM_NAME);
deviceMap.set('Scream 4', SCREAM_NAME);
deviceMap.set('RDK', REASON_DRUM_KITS_NAME);
deviceMap.set('DMFC', RYTMIK_NAME);
deviceMap.set('Complex', COMPLEX_NAME);
deviceMap.set('Electric Bass', REASON_ELECTRIC_BASS_NAME);
deviceMap.set('Scenic Hybrid', SCENIC_NAME);
deviceMap.set('Master Compressor', MASTER_BUS_COMPRESSOR_NAME);
deviceMap.set('Layers_wave_edition', LAYERS_WAVES_NAME);
deviceMap.set('Drum Seq', DRUM_SEQUENCER_NAME);
deviceMap.set('Reason Amp', SOFTUBE_AMP_NAME);
deviceMap.set('Reason Bass Amp', SOFTUBE_BASS_AMP_NAME);
deviceMap.set('Scales And Chords', SCALES_AND_CHORDS_NAME);
deviceMap.set('Radicalpiano', RADICAL_PIANO_NAME);
deviceMap.set('Mutator', PATTERN_MUTATOR_NAME);
deviceMap.set('REX Loop Player', DR_REX_NAME);
deviceMap.set('REX', DR_REX_NAME);
deviceMap.set('LM6', LINE_MIXER_NAME);
deviceMap.set('Mixer14:2', MIXER_NAME);
deviceMap.set('Arpeggio', DUAL_ARPEGGIO_NAME);

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// based on https://stackoverflow.com/questions/5582228/insert-space-before-capital-letters
const removePascalCase = (str) => str.replace(/([a-z])([A-Z])/g, '$1 $2');


export const normalizeDeviceName = (deviceNameRaw) => {
    const deviceName = removePascalCase(capitalize(deviceNameRaw.replace(/^.*\./, '')));

    if(deviceMap.has(deviceName)){
        return deviceMap.get(deviceName);
    }
    return deviceName;
};