synthquencer.envelope = [];

synthquencer.envelope.envelope = {
    'attack': 0,
    'decay': 1,
    'sustain': 0.01,
    'release': 1
};

synthquencer.envelope.config = {
    'attack': {
        'min': 0,
        'max': 10
    },
    'decay': {
        'min': 0,
        'max': 10
    },
    'sustain': {
        'min': 0,
        'max': 10
    },
    'release': {
        'min': 0,
        'max': 10
    }
}

synthquencer.envelope.update = function(property, value) {
    const envelope = synthquencer.envelope.envelope[property];
    const config = synthquencer.envelope.config[property];

    if (config.min <= value <= config.max) { envelope = value}

    throw new Error('Value is invalid')
}