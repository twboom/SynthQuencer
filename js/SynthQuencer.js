import { Project } from './project.js';
import { Synthesizer } from './instrument.js';
import { Sequencer } from './sequencer.js';
import { SequencerRenderer } from './renderer.js';

// Create the Project object
export const project = new Project();

// Testing code
const mySynth = new Synthesizer({wave: 'sawtooth'});
const mySeq = new Sequencer([16,16]);
mySeq.attach(mySynth);

const myRen = new SequencerRenderer(document.body, mySeq);
mySeq.attach(myRen);
myRen.render();

mySeq.start();