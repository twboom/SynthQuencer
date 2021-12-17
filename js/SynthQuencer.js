import { Project } from './project.js';
import { Envelope, Synthesizer } from './instrument.js';
import { Sequencer } from './sequencer.js';
import { SequencerRenderer } from './renderer.js';

// Create the Project object
export const project = new Project();

// Testing code
const myEnv = new Envelope()
const mySynth = new Synthesizer({wave: 'sawtooth'}, myEnv);
const mySeq = new Sequencer([16,16]);
mySeq.attach(mySynth);

const myRen = new SequencerRenderer(document.body, mySeq);
mySeq.attach(myRen);
myRen.render();

mySeq.start();