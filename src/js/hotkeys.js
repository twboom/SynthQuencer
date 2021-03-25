synthquencer.hotkeys.config = {
    'Space': synthquencer.actions.toggle,
    'Delete': synthquencer.actions.reset
}

synthquencer.hotkeys.init = function() {
    document.addEventListener('keydown', evt => {
        const action = synthquencer.hotkeys.config[evt.code]
        if (action === undefined) { return }
        action()
    })
}