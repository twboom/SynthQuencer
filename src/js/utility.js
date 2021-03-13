synthquencer.utility = [];

synthquencer.utility.getFrequency = function(midiNote) {
    note = midiNote - 68
    frequency = synthquencer.config.tuning * 2 ** (note / 12)
    return frequency
}

synthquencer.utility.getBPM = function(interval, steps) {
    const tpm = interval / steps;
    const tpb = tpm / 4;
    const bpm = 60000 / tpb
    return bpm / 1000
}