let synthquencer = [];
synthquencer.hotkeys = [];
synthquencer.synths = [];
synthquencer.tiles = [];

synthquencer.state = { // States that SynthQuencer can have
    'active': false
};

/* Beneath is config */
synthquencer.config = { // Configurable settings
    'startNote': 60, // The lowest note, in MIDI note
    'notes': 16, // Number of notes in step
    'steps': 16, // The number of steps
    'speed': 100, // Interval between steps, in ms
    'tuning': 440, // Tuning of A4, in Hz
    'volume': 0.5, // Master volume
    'transposition': 0, // Transpose all the grids, in octaves
    'defaultWave': 'sawtooth' // The default wave value when no wave is specified
};