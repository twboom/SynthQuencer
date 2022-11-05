// Modal buttons
export class ModalButton {
    constructor(text, style, callback) {
        this.text = text;
        this.style = style;
        this.callback = callback;
        this.html = create();
    };

    create() {
        const button = document.createElement('button');
        button.classList.add('modal')
        button.classList.add(this.style);
        button.innerText = this.text;
        button.addEventListener('click', this.callback)
    };
};

export class ModalCloseButton extends ModalButton {
    constructor(modal) {
        super('Close', 'neutral', _ => {
            this.modal.delete();
        })
        this.modal = modal;
    };
};

// General modal class
export class Modal {
    constructor(content='<p>Lorum ipsum</p>', title='myModal', buttons=[], hidden) {
        this.content = content;
        this.title = title;
        this.buttons = buttons;
        this.html = this.create(hidden);
    };

    create(hidden) {
        const outerContainer = document.createElement('div');
        outerContainer.classList = 'modal outer-container';
        if (hidden) { outerContainer.classList.add('hidden') };

        const modal = document.createElement('div');
        outerContainer.appendChild(modal);
        modal.classList = 'modal main-container';

        const title = document.createElement('h1');
        modal.appendChild(title);
        title.classList = 'modal title';
        title.innerHTML = this.title;

        const content = document.createElement('div');
        modal.appendChild(content);
        content.classList = 'modal content';
        content.innerHTML = this.content;

        const buttonContainer = document.createElement('div');
        modal.appendChild(buttonContainer);
        buttonContainer.classList = 'modal button-container';
        this.buttons.forEach(button => {
            buttonContainer.appendChild(button);
        });

        return outerContainer;
    };

    spawn() {
        document.body.appendChild(this.html);
    };

    show() {
        this.html.classList.remove('hidden');
    }

    hide() {
        this.html.classList.add('hidden');
    };

    remove() {
        document.body.removeChild(this.html);
    };

    delete() {
        this.html.remove();
    };

};
