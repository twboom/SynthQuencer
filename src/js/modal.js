synthquencer.modal = function() {
    document.querySelectorAll('.modalButton').forEach(item => {
        item.addEventListener('click', evt => {
            let action = 'block'; // This is the CSS Display property of the item
            if (evt.target.classList[1] === 'close') { action = 'none' };
            const modal = document.querySelector(`div#${evt.target.classList[2]}Modal`);
            modal.style.display = action
        })
    })
}