import { project } from './SynthQuencer.js'
import { capitalize } from './utility.js';

// General renderer class
export class Renderer {

    constructor(renderType, parent, obj) {
        this.renderType = renderType;
        this.parent = parent;
        this.obj = obj;
        project.attach(this);
    };

};

// Sequencer renderer class
export class SequencerRenderer extends Renderer {
    

    constructor(parent, obj) {
        super('SEQUENCER', parent, obj);
        this.color = obj.color
    }

    dragState = false;
    currentDrag = [];

    render() {

        const obj = this.obj;

        const size = obj.size

        const container = document.createElement('div');
        container.classList.add('sequencer');
        
        this.gridContainer = document.createElement('div');
        const gridContainer = this.gridContainer;
        gridContainer.classList.add('sequencer');
        gridContainer.classList.add('grid');
        container.appendChild(gridContainer);

        gridContainer.dataset.color = this.color;

        for (let y = 0; y < size[1]; y++) {
            const line = document.createElement('div');
            line.classList.add('sequencer');
            line.classList.add('row');
            for (let x = 0; x < size[0]; x++) {
                const cell = document.createElement('button');
                cell.classList.add('sequencer');
                cell.classList.add('cell');
                cell.dataset.x = x;
                cell.dataset.y = y;
                cell.dataset.current = false;

                const memoryCell = this.obj.memory[y][x];
                cell.dataset.active = memoryCell.active;

                cell.addEventListener('mousedown', _ => {
                    obj.toggle([x, y]);
                    this.currentDrag.push([x, y]);
                });

                cell.addEventListener('mouseover', evt => { // Toggle if dragging
                    if (
                        this.dragState &&
                        !this.currentDrag.includes(evt.target)
                    ) {
                        obj.toggle([x, y]);
                        this.currentDrag.push(evt.target);
                    }
                });

                line.appendChild(cell);
            };
            gridContainer.appendChild(line);
        };

        // Drag functionality
        gridContainer.addEventListener('mousedown', _ => { this.dragState = true; this.currentDrag = []; });
        window.addEventListener('mouseup', _ => { this.dragState = false; });

        this.parent.appendChild(container);

    };

    update(type, content) {

        switch(type) {

            case 'TOGGLE_NOTE':
                const [x, y] = content;
                const cell = this.gridContainer.querySelector(`[data-x="${x}"][data-y="${y}"]`);
                const memoryCell = this.obj.memory[y][x];
                cell.dataset.active = memoryCell.active;
                break;

            case 'CHANGE_STEP':
                this.gridContainer.querySelectorAll('[data-current="true"]').forEach(item => {
                    item.dataset.current = false;
                });
                this.gridContainer.querySelectorAll(`[data-y="${content}"]`).forEach(item => {
                    item.dataset.current = true;
                });
                break;

            case 'CLEAR_STEP':
                this.gridContainer.querySelectorAll('[data-current="true"]').forEach(item => {
                    item.dataset.current = false;
                });
                break;

        };

    };
    
};

export class ControlRenderer extends Renderer {

    constructor(parent, obj, parameter, displaySuffix) {
        super('CONTROL', parent, obj);
        this.parameter = parameter;
        this.displaySuffix = displaySuffix;
        this.inputContainer = document.createElement('div');
    };

    render() {
        const container = document.createElement('div');
        container.classList.add('control-group');

        // Label
        const label = document.createElement('label');
        label.setAttribute('for', `${this.obj.id}-${this.parameter}`);
        label.innerText = capitalize(this.parameter) + ': ';

        const display = document.createElement('span');
        display.setAttribute('id', `${this.obj.id}-${this.parameter}-value-display`);
        label.appendChild(display);

        if (this.displaySuffix) {
            label.innerHTML += ' ' + this.displaySuffix;
        };

        container.appendChild(label)

        container.appendChild(this.inputContainer);

        this.display = display;

        this.parent.appendChild(container);

    };

};

export class InputControlRenderer extends Renderer {
    
    constructor(parent, obj, parameter, min, max, step, value) {
        super('CONTROL-INPUT', parent, obj);
        this.parameter = parameter;
        this.min = min;
        this.max = max;
        this.step = step;
        this.value = value;
    };

    render() {
        const input = document.createElement('input');
        input.setAttribute('type', 'range');
        input.setAttribute('name', `${this.obj.id}-${this.parameter}`);
        input.setAttribute('id', `${this.obj.id}-${this.parameter}`);
        input.setAttribute('min', this.min);
        input.setAttribute('max', this.max);
        input.setAttribute('step', this.step);
        input.setAttribute('value', this.value);

        this.element = input;

        this.parent.appendChild(input)
    };

};

export class SelectControlRenderer extends Renderer {
    
    constructor(parent, obj, parameter, options) {
        super('CONTROL-INPUT', parent, obj);
        this.parameter = parameter;
        this.options = options;
        
    };

    render() {
        const select = document.createElement('select');
        select.setAttribute('name', `${this.obj.id}-${this.parameter}`);
        select.setAttribute('id', `${this.obj.id}-${this.parameter}`);

        this.options.forEach(option => {
            const el = document.createElement('option');
            el.setAttribute('value', option.value);
            el.innerText = option.name;
            select.appendChild(el);
        });
        
        this.element = select;

        this.parent.appendChild(select);
    };

};

export class WaveSelectControlRenderer extends SelectControlRenderer {

    constructor(parent, obj) {
        const options = [
            {'name': 'Sine', 'value': 'sine'},
            {'name': 'Square', 'value': 'square'},
            {'name': 'Sawtooth', 'value': 'sawtooth'},
            {'name': 'Triangle', 'value': 'triangle'},
        ]

        super(parent, obj, 'wave', options);
    };

};

export class EnvelopeRenderer extends Renderer {

    constructor(parent, obj) {
        super('ENVELOPE', parent, obj);
    }

    render() {}

    update() {}

}