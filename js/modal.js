// General modal class
class Modal {

    constructor(bodyContent, headerContent, closeButton) {

        this.content = content;
        this.closeButton = closeButton;

        this.outerContainer = document.createElement('div');
        this.outerContainer.classList.add('modal-outer-container');

        const container = document.createElement('div');
        container.classList.add('modal-container');

        const header = document.createElement('div');
        header.classList.add('modal-header');

        const body = document.createElement('div');
        body.classList.add('modal-body');

        const footer = document.createElement('div');
        footer.classList.add('modal-footer');
    };

    // Close modal
    close() {

        this.outerContainer.remove();

    };

};

// Confirmation modal class
class ConfirmationModal extends Modal {

    constructor(message, callback) {

        const content = document.createElement('div');
        
        const messageElement = document.createElement('p');
        messageElement.innerText = message;
        content.appendChild(messageElement);

        super(content, null, false);

    }

}