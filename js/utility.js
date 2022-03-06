import { Renderer } from "./renderer.js";
import { Instrument, Note } from "./instrument.js";
import { Sequencer } from "./sequencer.js";
import { Control } from "./controls.js";

// MIDI note to frequency
export function noteToFrequency(note, {transpose, detune, tuning}) {
    if (!transpose) { transpose = 0; };
    if (!detune) { detune = 0; };
    if (!tuning) { tuning = 440; };

    note = note - 68;
    note = note + (12 * transpose);

    const frequency = Math.pow(2, (note - (12 * detune)) / 12) * tuning;
    
    return frequency;
};


// Get BPM from milliseconds
export function getBPM(milliseconds) {
    const bpm = Math.round(60000 / milliseconds);
    return bpm;
};

// Get milliseconds from BPM
export function getMS(bpm) {
    const ms = 60000 / bpm;
    return ms;
};

// Get the object type
export function getType(object) {
    
    if (object instanceof Renderer) { return 'RENDERER' };
    if (object instanceof Instrument) { return 'INSTRUMENT' };
    if (object instanceof Note) { return 'NOTE' };
    if (object instanceof Sequencer) { return 'SEQUENCER' };
    if (object instanceof Control) { return 'CONTROL' }
    
};