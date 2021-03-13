let synthquencer = [];

synthquencer.config = { // Configurable settings
    'startNote': 60, // The lowest note, in MIDI note
    'notes': 16, // Number of notes in step
    'steps': 16, // The number of steps
    'speed': 100, // Interval between steps, in ms
    'tuning': 440 // Tuning of A4, in hz
}

synthquencer.state = { // States of SynthQuencer
    'active': false
}

synthquencer.synths = []