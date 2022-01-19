// General renderer class
export class Renderer {

    constructor(renderType, parent, obj) {
        this.renderType = renderType;
        this.parent = parent;
        this.obj = obj;

    };

};

// Sequencer renderer class
export class SequencerRenderer extends Renderer {
    

    constructor(parent, obj) {
        super('SEQUENCER', parent, obj);
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

        gridContainer.dataset.color = 'purple';

        for (let y = 0; y < size[0]; y++) {
            const line = document.createElement('div');
            line.classList.add('sequencer');
            line.classList.add('row');
            for (let x = 0; x < size[1]; x++) {
                const cell = document.createElement('button');
                cell.classList.add('sequencer');
                cell.classList.add('cell');
                cell.dataset.x = x;
                cell.dataset.y = y;
                cell.dataset.current = false;

                const memoryCell = this.obj.memory[x][y];
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
                const cell = this.gridContainer.querySelector(`[data-x="${content[0]}"][data-y="${content[1]}"]`);
                const memoryCell = this.obj.memory[content[1]][content[0]];
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

        }

    };
    
};

export class EnvelopeRenderer extends Renderer {

    constructor(parent, obj) {
        super('ENVELOPE', parent, obj);
    }

    render() {}

    update() {}

}