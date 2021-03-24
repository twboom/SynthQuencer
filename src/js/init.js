const sq = synthquencer

let session = []
session.wave = (new URL(document.location)).searchParams.get('wave')
if (session.wave === null) { session.wave = synthquencer.config.defaultWave }

sq.frame.create(session.wave)
sq.interface.init()
sq.modal()