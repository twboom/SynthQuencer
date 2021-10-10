// General renderer class
class Renderer {

    constructor(renderType, parent, obj) {
        this.renderType = renderType;
        this.parent = parent;
        this.obj = obj;

    };

};

// Sequencer renderer class
class SequencerRenderer extends Renderer {
    

    constructor(parent, obj) {
        super('SEQUENCER', parent, obj);
    }

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

        for (let y = 0; y < size[0]; y++) {
            const line = document.createElement('div');
            for (let x = 0; x < size[1]; x++) {
                const cell = document.createElement('button');
                cell.classList.add('sequencer');
                cell.classList.add('cell');
                cell.dataset.x = x;
                cell.dataset.y = y;
                cell.dataset.current = false;

                const memoryCell = this.obj.memory[x][y];
                cell.dataset.active = memoryCell.active;

                cell.addEventListener('click', _ => { obj.toggle([x, y]) });

                line.appendChild(cell);
            };
            gridContainer.appendChild(line);
        };

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