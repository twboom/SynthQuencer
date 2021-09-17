// Utility object
const utility = [];

// MIDI note to frequency
utility.noteToFrequency = function(note, transpose, detune, tuning) {
    if (!transpose) { transpose = 0; };
    if (!detune) { detune = 0; };
    if (!tuning) { tuning = 440; };

    note = note - 68;
    note = note + (12 * transpose);

    const frequency = Math.pow(2, (note - (12 * detune)) / 12) * tuning;
    
    return frequency;
}


// Get BPM from milliseconds
utility.getBPM = function(milliseconds) {
    const bpm = Math.round(60000 / milliseconds);
    return bpm;
}