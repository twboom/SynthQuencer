/*
This file contains some utility functions
*/

const utility = [];


// Almost zero for exponential ramps
utility.zero = 0.00000000000000000001


// MIDI note to frequency converter
utility.midiToFrequency = (midi, transposition, tuning) => {
    if (transposition === undefined) { transposition = 0 };
    if (tuning === undefined) { tuning = 440 };
    const note = midi - 68;
    const transposed = note + (12 * transposition);
    const frequency = tuning * 2 ** (transposed / 12);
    return frequency;
};


// Milliseconds to BPM converter
utility.msToBPM = function(ms) {
    return 60000 / ms
}
