synthquencer.utility = [];

synthquencer.utility.getTarget = function(prop) {
    let target;
    for (const [key, value] of Object.entries(synthquencer.targets)) {
        const properties = Object.keys(value)
        if (!properties.includes(prop)) { continue }
        target = value
    }
    return target
}

synthquencer.utility.getFrequency = function(midiNote) {
    const note = midiNote - 68
    const transposed = note + (12 * synthquencer.config.transposition)
    const frequency = synthquencer.config.tuning * 2 ** (transposed / 12)
    return frequency
}

synthquencer.utility.getBPM = function(interval, steps) {
    const tpm = interval / steps;
    const tpb = tpm / 4;
    const bpm = 60000 / tpb
    return bpm / 1000
}