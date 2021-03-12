synthquencer.getFrequency = function(midiNote) {
    note = midiNote - 68
    frequency = synthquencer.config.tuning * 2 ** (note / 12)
    return frequency
}

synthquencer.sound = function(note, wave) {
    const interface = new AudioContext();
    const oscillator = interface.createOscillator();
    oscillator.type = wave;
    oscillator.frequency.value = synthquencer.getFrequency(note);
    const gainNode = interface.createGain();
    gainNode.gain.exponentialRampToValueAtTime(0.0001, interface.currentTime + 1);
    oscillator.connect(gainNode);
    gainNode.connect(interface.destination);
    oscillator.start(0);
    oscillator.stop(interface.currentTime + 2)
}