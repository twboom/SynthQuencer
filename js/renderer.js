// General renderer class
class Renderer {

    constructor(renderType, parent) {
        this.renderType = renderType;
        this.parent = parent;


    };

};

// Sequencer renderer class
class SequencerRenderer extends Renderer {
    

    constructor(parent) {
        super('sequencer', parent);
    }

    render() {

        const container = document.createElement('div');
        container.classList.add('sequencer');
        

    }
    
}