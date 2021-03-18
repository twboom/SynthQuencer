synthquencer.tile = class {
    constructor(wave, note, step) {
        this.wave = wave;
        this.note = note;
        this.step = step;
        this.activated = false;
        this.id = `${synthquencer.synths.length}-${this.wave}-${this.step}-${this.note}`
    }

    changeState(tile, obj) {
        if (tile.activated) {
            tile.activated = false;
            obj.setAttribute('data-activated', 'false');
            console.log(`Deactivated ${this.wave}, ${this.note}, ${this.step}`);
        }
        else {
            tile.activated = true;
            obj.setAttribute('data-activated', 'true');
            console.log(`Activated ${this.wave}, ${this.note}, ${this.step}`);
        }
    }
    
    create(parent) {
        const id = this.id;
        const tile = document.createElement('button');
        tile.setAttribute('class', 'tile');
        tile.setAttribute('draggable', false);
        tile.setAttribute('data-wave', this .wave);
        tile.setAttribute('data-note', this.note);
        tile.setAttribute('data-step', this.step);
        tile.setAttribute('data-activated', false);
        tile.setAttribute('data-isPlaying', false);
        tile.setAttribute('id', id);
        tile.addEventListener('mousedown', _ => {this.changeState(this, tile)});
        tile.addEventListener('mouseover', synthquencer.drag.move);
        parent.appendChild(tile);
        synthquencer.tiles.push(this)
        return this
    }
}

synthquencer.synth = class {
    constructor(wave, notes, steps) {
        this.wave = wave;
        this.notes = notes;
        this.steps = steps;
        this.id = synthquencer.synths.length;
        this.tiles = []
    }

    create() {
        const wave = this.wave
        const notes = this.notes;
        const steps = this.steps;
        for (let i = 0; i < steps; i++) {
            const step = document.createElement('div')
            step.setAttribute('class', 'step')
            for (let x = 0; x < notes; x++) {
                const note = synthquencer.config.startNote + x
                const tile = new synthquencer.tile(wave, note, i)
                tile.create(step)
                this.tiles.push(tile)
            }
            document.querySelector(`div#synth-${this.id}`).appendChild(step)
        }
    }
}

synthquencer.frame = []
synthquencer.frame.create = function(wave) {
    const frame = document.createElement('div')
    frame.setAttribute('id', `synth-${synthquencer.synths.length}`)
    frame.setAttribute('class', 'synth')
    frame.addEventListener('mousedown', synthquencer.drag.start)
    frame.addEventListener('mouseup', synthquencer.drag.stop)
    document.querySelector('div#sequencer').appendChild(frame)
    const synth = new synthquencer.synth(wave, 16, 16)
    synth.create()
    synthquencer.synths.push(synth)
}

synthquencer.frame.remove = function() {
    document.querySelectorAll('div.synth').forEach(item => {
        item.remove()
    })
}