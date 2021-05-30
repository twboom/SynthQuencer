/*
This file contains some utility functions
*/

const utility = [];

// MIDI note to frequency converter
utility.midiToFrequency = (midi, transposition, tuning) => {
    if (transposition === undefined) { transposition = 0 };
    if (tuning === undefined) { tuning = 440 };
    const note = midi - 68;
    const transposed = note + (12 * transposition);
    const frequency = tuning * 2 ** (transposed / 12);
    return frequency;
};