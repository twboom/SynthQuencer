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