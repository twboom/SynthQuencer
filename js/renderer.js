// General renderer class
class Renderer {

    type = 'RENDERER';

    constructor(renderType, parent) {
        this.renderType = renderType;
        this.parent = parent;


    };

    // Render the object
    render() {

    }

};

// Sequencer renderer class
class SequencerRenderer extends Renderer {
    
    type = 'SEQUENCER_RENDERER';

    constructor(parent) {
        super('sequencer', parent);
    }

    render() {
    }
    
}