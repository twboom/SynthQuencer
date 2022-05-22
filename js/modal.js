// General modal class
class Modal {
    constructor(content='<p>Lorum ipsum</p>', title='myModal', buttons=[], hidden) {
        this.content = content;
        this.title = title;
        this.buttons = buttons;
        this.html = this.create(hidden);
    };

    create(hidden) {
        const outerContainer = document.createElement('div');
        outerContainer.classList.add('modal outer-container');
        if (hidden) { outerContainer.classList.add('hidden') };

        const modal = document.createElement('div');
        outerContainer.appendChild(modal);
        modal.classList.add('modal main-container');

        const title = document.createElement('h1');
        modal.appendChild(title);
        title.classList.add('modal title');
        title.innerHTML = this.title;

        const content = document.createElement('div');
        modal.appendChild(content);
        content.classList.add('modal content');
        content.innerHTML = this.content;

        const buttonContainer = document.createElement('div');
        modal.appendChild(buttonContainer);
        buttonContainer.classList.add('modal button-container');
        this.buttons.forEach(button => {
            buttonContainer.appendChild(button);
        });

        return outerContainer
    };

    show() {
        this.html.classList.remove('hidden');
    }

    hide() {
        this.html.classList.add('hidden');
    };

    delete() {
        this.html.remove();
    };

};
