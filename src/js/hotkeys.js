synthquencer.hotkeys.config = {
    'Space': synthquencer.actions.toggle,
}

synthquencer.hotkeys.init = function() {
    document.addEventListener('keydown', evt => {
        const action = synthquencer.hotkeys.config[evt.code]
        if (action === undefined) { return }
        action()
    })
}