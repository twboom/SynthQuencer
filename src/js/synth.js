synthquencer.tile = class {
    constructor(wave, note, step) {
        this.wave = wave;
        this.note = note;
        this.step = step;
        this.activated = false;
    }
    
    create(parent) {
        const id = `${this.wave}-${this.note}-${this.step}`
        const tile = document.createElement('button')
        tile.setAttribute('class', 'tile')
        tile.setAttribute('wave', this .wave)
        tile.setAttribute('note', this.note)
        tile.setAttribute('step', this.step)
        tile.setAttribute('activated', false)
        tile.setAttribute('isPlaying', false)
        tile.setAttribute('id', id)
        tile.addEventListener('click', _ => {
            if (this.activated) {
                this.activated = false;
                tile.setAttribute('activated', 'false')
                console.log(`Deactivated ${this.wave}, ${this.note}, ${this.step}`)
            }
            else {
                this.activated = true;
                tile.setAttribute('activated', 'true')
                console.log(`Activated ${this.wave}, ${this.note}, ${this.step}`)
            }
        })
        parent.appendChild(tile)
    }
}

synthquencer.frame = []
synthquencer.frame.sine = function() {
    const frame = document.getElementById('frame')
    const notes = synthquencer.config.notes;
    const steps = synthquencer.config.steps;
    for (let i = 0; i < steps; i++) {
        const step = document.createElement('div')
        for (let x = 0; x < notes; x++) {
            const note = synthquencer.config.startNote + x
            const tile = new synthquencer.tile('sine', note, i)
            tile.create(step)
        }
        document.getElementById('frame').appendChild(step)
    }
}