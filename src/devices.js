const deviceOrdering = {
    PLAYER: 1,
    INSTRUMENT: 2,
    CREATIVE_EFFECT: 3,
    EFFECT: 4,
    UTILITY: 5,
};

const deviceType = {
    'Line Mixer 6:2': deviceOrdering.UTILITY,
    'Malström': deviceOrdering.INSTRUMENT,
    'MClass': deviceOrdering.EFFECT,
    'MClass Stereo Imager': deviceOrdering.EFFECT,
    'Pattern Mutator': deviceOrdering.PLAYER,
    'D-11': deviceOrdering.EFFECT,
    'NN-XT Sampler': deviceOrdering.INSTRUMENT,
    'Pulveriser Demolition': deviceOrdering.CREATIVE_EFFECT,
    'Neptune': deviceOrdering.CREATIVE_EFFECT,
    'Scream 4 Distortion': deviceOrdering.CREATIVE_EFFECT,
    'Audiomatic Retro Transformer': deviceOrdering.CREATIVE_EFFECT,
    'Quartet Chorus Ensemble': deviceOrdering.CREATIVE_EFFECT,
    'The Echo': deviceOrdering.CREATIVE_EFFECT,
    'Grain Sample Manipulator': deviceOrdering.INSTRUMENT,
    'RV7000 Reverb': deviceOrdering.EFFECT,
    'Scenic Hybrid Instrument': deviceOrdering.INSTRUMENT,
    'Umpf Retro Beats': deviceOrdering.INSTRUMENT,
    'Parsec Spectral Synthesizer': deviceOrdering.INSTRUMENT,
    'Processed Pianos': deviceOrdering.INSTRUMENT,
    'Softube Bass Amp': deviceOrdering.EFFECT,
    'Sweeper Modulation Effect': deviceOrdering.CREATIVE_EFFECT,
    'Europa Shapeshifting Synthesizer': deviceOrdering.INSTRUMENT,
    'NN-19 Sampler': deviceOrdering.INSTRUMENT,
    'Monotone Bass Synthesizer': deviceOrdering.INSTRUMENT,
    'Channel EQ': deviceOrdering.EFFECT,
    'Drum Sequencer': deviceOrdering.PLAYER,
    'Spider Audio': deviceOrdering.UTILITY,
    'Spider CV': deviceOrdering.UTILITY,
    'Channel Dynamics': deviceOrdering.EFFECT,
    'Kong Drum Studio': deviceOrdering.INSTRUMENT,
    'BV-512': deviceOrdering.CREATIVE_EFFECT,
    'Rotor Rotary Speaker': deviceOrdering.EFFECT,
    'Scales & Chords': deviceOrdering.PLAYER,
    'Dual Arpeggio': deviceOrdering.PLAYER,
    'Thor': deviceOrdering.INSTRUMENT,
    'Mixer 14:2': deviceOrdering.UTILITY,
    'Humana Vocal Ensemble': deviceOrdering.INSTRUMENT,
    'Master Bus Compressor': deviceOrdering.EFFECT,
    'RPG-8': deviceOrdering.UTILITY,
    'Radical Piano': deviceOrdering.INSTRUMENT,
    'MClass Compressor': deviceOrdering.EFFECT,
    'Poly Step Sequencer': deviceOrdering.PLAYER,
    'Pulsar Dual LFO': deviceOrdering.UTILITY,
    'MClass Equalizer': deviceOrdering.EFFECT,
    'Rytmik Drum Machine': deviceOrdering.INSTRUMENT,
    'Matrix': deviceOrdering.UTILITY,
    'Reason Drum Kits': deviceOrdering.INSTRUMENT,
    'Synchronous Effect Modulator': deviceOrdering.CREATIVE_EFFECT,
    'ID8': deviceOrdering.INSTRUMENT,
    'ECF-42': deviceOrdering.EFFECT,
    'Alligator Filter Gate': deviceOrdering.CREATIVE_EFFECT,
    'Polar Dual Pitch Shifter': deviceOrdering.CREATIVE_EFFECT,
    'Dr. Octo Rex Loop Player': deviceOrdering.INSTRUMENT,
    'Softube Amp': deviceOrdering.EFFECT,
    'Subtractor': deviceOrdering.INSTRUMENT,
    'Reason Electric Bass': deviceOrdering.INSTRUMENT,
    'PH-90': deviceOrdering.EFFECT,
    'PEQ2': deviceOrdering.EFFECT,
    'RV-7': deviceOrdering.EFFECT,
    'Note Echo': deviceOrdering.PLAYER,
    'CF-101': deviceOrdering.EFFECT,
    'Complex-1 Modular Synthesizer': deviceOrdering.INSTRUMENT,
    'Radical Keys': deviceOrdering.INSTRUMENT,
    'Friktion Modeled Strings': deviceOrdering.INSTRUMENT,
    'COMP-01': deviceOrdering.EFFECT,
    'DDL': deviceOrdering.EFFECT,
    'UN-16': deviceOrdering.EFFECT,
    'Pangea World Instruments': deviceOrdering.INSTRUMENT,
    'Quad Note Generator': deviceOrdering.INSTRUMENT,
    'Klang Tuned Percussion': deviceOrdering.INSTRUMENT,
    'Beat Map': deviceOrdering.PLAYER,
    'Umpf Club Drums': deviceOrdering.INSTRUMENT,
    'Algoritm FM Synthesizer': deviceOrdering.INSTRUMENT,
    'Layers Wave Edition': deviceOrdering.INSTRUMENT,
    'Layers': deviceOrdering.INSTRUMENT,
    'Redrum Drum Computer': deviceOrdering.INSTRUMENT,
    'BVXVocoder': deviceOrdering.CREATIVE_EFFECT,
    'Chord Sequencer': deviceOrdering.PLAYER,
    'Mimic Creative Sampler': deviceOrdering.INSTRUMENT,
    'Bassline Generator': deviceOrdering.PLAYER,
    'Objekt': deviceOrdering.INSTRUMENT,
};

export const sortDevices = (devices) => devices.sort((a, b) => {
    const diff = deviceType[a] - deviceType[b];
    return diff || a.localeCompare(b);
});

export const isInstrument = (device) => deviceType[device] === deviceOrdering.INSTRUMENT;