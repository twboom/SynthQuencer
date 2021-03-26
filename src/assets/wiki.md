# General info
SynthQuencer is a entirly web-based grid sequencer that allows everyone to have a go at music. No, you won't compose entire songs on this (or you take this statement as a challenge), but it will be fun to play with nonetheless! With every feature we are implementing, we are trying to make it easy and understandable, but still as powerfull as possible.

## For what can I use it?
For everything that you want! Just drawing some shapes and trying how it sounds or just comming up with inspiration! It's all up to you!

PS: For the teachers (or other people), you can use it as an tool for introduction in music lessons!

# Main controls
In the main controls (on the left), you can find several buttons and sliders.

## Start (Button)
This button will start and stop SynthQuencer. When you restart SynthQuencer, it will always start on the first row.

## Speed (Slider)
The speed slider set the speed of SynthQuencer (the time it takes to go to the next step). It is set in milliseconds (ms)

The speed slider is somewhat of a special slider because when you slide it, it's value updates in realtime. The effects are not applied immediately. When you release the slider, then will SynthQuencer automatically restart to apply the changes.

## Volume (Slider)
The volume slider is a value between 0 and 1. This will multiply with the gain at different points (see Envelope). This will update for every note that is played after adjusting it's value.

## Transpose (Slider)
The transposition slider allows you to pitch the entire grid up or down 4 octaves. That makes it's range -4 octaves to +4 octaves.

You might use this feature when you want to make a bass line or a higher pitched line. 

## Tuning (Slider)
The tuning slider is quite an advanced feature and most people will probably never use it. It adjusts the frequency of the note A4. It's value range is 432hz to 440hz (standard).

We've implemented this feature, because we had to create an configuration element for it and it can be quite handy to help you think 'out of the box'.

## Reset (Button)
The reset button will reset your entire grid. It will not reset your settings!

## Kill (Button)
The kill button will stop all the sounds that are playing.

# Grid
The grid is ofcourse the main element of SynthQuencer! You can look at it as a coordinate system with every square (button) being a coordinate. Time is represented on the vertical axis, the note height on the horizontal axis.

Just play around with it and you'll figure it out!

## Drawing
When pressing and holding, it'll flip the state (activated or not) of the buttons you cross on your path. Try drawing a little heart!

# Envelope (ADSR)
The envelope is currently the most powerfull tool for customizing your sound! It consist of a normal ADSR.

ADSR stands for Attack, Decay, Sustain and Release. All are explained below!

All of this might sound and look complicated, because it is! You can play around with the values and hear what sounds good!

PS: We're working on an visual and interactive way of displaying this information, that will be in a future release!

## Attack (Slider)
Attack is the value that adjusts the ramp of the notes when they start (a bit like a fade in). It's value is in seconds.

## Decay (Slider)
Decay is the time it takes the gain to go to the level of sustain

## Sustain (Slider)
Sustain is the only non-time value in here. It sets the value the decay should go to.

## Release (Slider)
Release is the value it takes to reach zero gain after the notes is at it's sustain level.

# Keyboard Hotkeys
We have implemented some keyboard hotkeys.

If you want more hotkeys, please open up a feature request in our Issues section on GitHub!

## Hotkeys
Space: play/stop
Delete: reset grid

# Advanced
SynthQuencer also has some features that are not fully implemented yet. These features might be changed any time! This page will ofcourse be updated accordingly!

## Different wave types
You are able to set the wave type by adding '?wave={wave}' to the end of the URL. Your available options are: 'sine', 'triangle', 'sawtooth' (default), 'square'.