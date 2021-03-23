synthquencer.sound = async function(note, wave) {
    const almostZero = 0.00000000000000000001
    const envelope = synthquencer.envelope.envelope;
    const interface = synthquencer.interface;
    const oscillator = interface.createOscillator();
    oscillator.type = wave;
    oscillator.frequency.value = synthquencer.utility.getFrequency(note);
    const gainNode = interface.createGain();
    gainNode.gain.setValueAtTime(0,0);
    console.log(`Playing ${note}, ${wave}: ${envelope.attack}, ${envelope.decay}, ${envelope.sustain}, ${envelope.release}`);
    let passedTime = interface.currentTime;
    gainNode.gain.exponentialRampToValueAtTime(1, envelope.attack);
    passedTime += envelope.attack;
    gainNode.gain.exponentialRampToValueAtTime(almostZero + envelope.sustain, passedTime + envelope.decay);
    passedTime += envelope.decay;
    gainNode.gain.exponentialRampToValueAtTime(almostZero, passedTime + envelope.release);
    oscillator.connect(gainNode);
    gainNode.connect(interface.destination);
    oscillator.start(0);
    synthquencer.stats.stats.played++
}

synthquencer.playRow = function(synth, step) {
    const row = document.querySelectorAll(`div#synth-${synth} button.tile[data-step="${step}"][data-activated=true]`)
    if (row.length === 0) { return }
    const wave = row[0].getAttribute('data-wave')
    for (let i = 0; i < row.length; i++) {
        const note = (row[i].getAttribute('data-note'))
        synthquencer.sound(note, wave)
    }
}

synthquencer.tick = function(synth, step) {
    lastStep = step - 1;
    if (step === 0) { lastStep = 15 };
    synthquencer.playRow(synth, step)
        {
            const row = document.querySelectorAll(`button.tile[data-step="${step}"]`)
            for (let i = 0; i < row.length; i++) {
                row[i].setAttribute('data-isplaying', true)
            }
        }
        {
            const row = document.querySelectorAll(`button.tile[data-step="${lastStep}"]`)
            for (let i = 0; i < row.length; i++) {
                row[i].setAttribute('data-isplaying', false)
            }
        }
}

synthquencer.deactivate = function() {
    clearInterval(synthquencer.clock);
    document.querySelectorAll('button.tile[data-isplaying=true]').forEach(item => {
        item.setAttribute('data-isplaying', false)
    })
    synthquencer.state.active = false;
};

synthquencer.toggle = function() {
    let step = 0;
    if (synthquencer.state.active) {
        synthquencer.deactivate()
        return
    }
    synthquencer.state.active = true
    synthquencer.clock = setInterval(_ => {
        for (let i = 0; i < synthquencer.synths.length; i++) {
            synthquencer.tick(i, step);
        };
        step += 1;
        if (step == 16) { step = 0 };
    }, synthquencer.config.speed);
};