const RV700_NAME = 'RV7000 Reverb';
const THOR_NAME = 'Thor';
const MALSTROM_NAME = 'Malström';
const ALLIGATOR_NAME = 'Alligator Filter Gate';
const FRIKTION_NAME = 'Friktion Modeled Strings';
const KONG_NAME = 'Kong Drum Studio';
const NN19_NAME = 'NN-19 Sampler';
const NNXT_NAME = 'NN-XT Sampler';

const deviceMap = new Map();
deviceMap.set('RV7000', RV700_NAME);
deviceMap.set('Kong', KONG_NAME);
deviceMap.set('NN19 Sampler', NN19_NAME);
deviceMap.set('NN19 Digital Sampler', NN19_NAME);
deviceMap.set('NNXT Digital Sampler', NNXT_NAME);
deviceMap.set('Alligator', ALLIGATOR_NAME);
deviceMap.set('Friktion', FRIKTION_NAME);
deviceMap.set('XWave Synth', MALSTROM_NAME);
deviceMap.set('CRM-3 Synth', THOR_NAME);


export const normalizeDeviceName = (deviceName) => deviceMap.has(deviceName) ? deviceMap.get(deviceName) : deviceName;