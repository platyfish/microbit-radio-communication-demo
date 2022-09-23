enum RadioMessage {
    message1 = 49434
}
// Emoji List!
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 3) {
        basic.showLeds(`
            # # . # #
            # # . # #
            . . . . .
            # . . . #
            . # # # .
            `)
    }
    if (receivedNumber == 4) {
        basic.showLeds(`
            # # . # #
            # # . # #
            . # # # .
            # . . . #
            . # # # .
            `)
    }
    if (receivedNumber == 5) {
        basic.showIcon(IconNames.Heart)
    }
})
// This is button A code. The "ifs" check if the variable "Sending or changing channel?" Is equal to one so it enters channel mode, 2 for message to channel, and 3 for power level.
input.onButtonPressed(Button.A, function () {
    if (Sending_or_changing_channel == 1) {
        Radio_Frequency += -1
        music.playTone(220, music.beat(BeatFraction.Sixteenth))
    }
    // Message delay variable must be under 1 or =0 to be able to send message.
    if (Sending_or_changing_channel == 2 && Message_Delay_antispam < 1) {
        // This is the delay code that makes it so you can't send a message, but only send after 10 seconds after sending to prevent spamming.
        Message_Delay_antispam = 10
        music.playTone(262, music.beat(BeatFraction.Quarter))
        music.playTone(494, music.beat(BeatFraction.Quarter))
        music.playTone(659, music.beat(BeatFraction.Quarter))
        radio.sendString("" + (text_list[Message_to_send]))
        radio.sendNumber(Message_to_send)
    }
    if (Sending_or_changing_channel == 3) {
        Power_Level += -1
        music.playTone(220, music.beat(BeatFraction.Sixteenth))
    }
})
// Add +1 to "Sending or changing channel?" This therefore switches the mode from channel to send message and from send message to configure signal strength and from signal strength back to channel
input.onButtonPressed(Button.AB, function () {
    Sending_or_changing_channel += 1
    music.playTone(440, music.beat(BeatFraction.Eighth))
    music.playTone(494, music.beat(BeatFraction.Quarter))
})
// This is the code where it shows you the string you have received from someone on the same channel
radio.onReceivedString(function (receivedString) {
    if (Message_to_send != 3) {
        if (Message_to_send != 4) {
            if (Message_to_send != 5) {
                basic.showString(receivedString)
            }
        }
    }
})
// This is the button B code. Same logic applies for this as button A but it has different functions. This one just increases the variable in the mode selected by 1.
input.onButtonPressed(Button.B, function () {
    if (Sending_or_changing_channel == 1) {
        Radio_Frequency += 1
        music.playTone(698, music.beat(BeatFraction.Sixteenth))
    }
    if (Sending_or_changing_channel == 2) {
        Message_to_send += 1
        music.playTone(698, music.beat(BeatFraction.Sixteenth))
    }
    if (Sending_or_changing_channel == 3) {
        Power_Level += 1
        music.playTone(698, music.beat(BeatFraction.Sixteenth))
    }
})
// This is the block to toggle sound on or off if the beeps annoy you. Or if you wanna keep it quiet.
input.onGesture(Gesture.Shake, function () {
    Audio += 1
    music.playTone(262, music.beat(BeatFraction.Whole))
})
// Hello! Welcome to this "simple" micro:bit program, I Andrei am making, basically, what this is, is a simple radio communication software that lets you switch from channels 0-20 to communicate with other microbits, setting your channels on 10 means you send on channel 10 and recieve from channel 10 and the same logic applies to the rest. The chat functions are basic and very short to make up for the 5x5 led screen of the micro:bit, I like the micro:bit having this limitation as it teaches you to think outside of the box. For example, the screen shows slowly so, if one were to quickly spam the channels, then it'd show their current channel very slowly, so, I'll make my own 20 led pixel screens to show which channel you are on. The default channel is 1. You can change the "Null" blocks to something else that you want to put there, so far, "Hello!", "No", "Yes" text messages exist. But you can allocate only 3,4 and 5 because the rest haven't been programmed yet. This place is also where everything gets initialized before the program fully starts
let Message_Delay_antispam = 0
let Message_to_send = 0
let Sending_or_changing_channel = 0
let text_list: string[] = []
text_list = [
"Hello!",
"No",
"Yes",
" ",
" ",
" ",
"Null",
"Null",
"Null",
"Null"
]
let Audio = 1
let Power_Level = 7
Sending_or_changing_channel = 1
Message_to_send = 0
radio.setGroup(1)
let Radio_Frequency = 1
Message_Delay_antispam = 0
led.setBrightness(255)
basic.clearScreen()
// Every one second remove one from message delay (antispam), this is the code that counts down the message delay variable.
loops.everyInterval(1000, function () {
    Message_Delay_antispam += -1
})
// This is where all the logic is located. This calculates stuff from, "is variable (radio frequency) over 20, and if so, do this. Without this, the micro:bit would have many issues especially with variables that increase or decrease forever. So this is very necessary.
basic.forever(function () {
    if (3 < Sending_or_changing_channel) {
        Sending_or_changing_channel = 1
    }
    if (20 < Radio_Frequency) {
        Radio_Frequency = 20
        basic.showIcon(IconNames.No)
        music.playTone(175, music.beat(BeatFraction.Quarter))
    }
    if (Radio_Frequency < 1) {
        Radio_Frequency = 1
        basic.showIcon(IconNames.No)
        music.playTone(175, music.beat(BeatFraction.Quarter))
    }
    if (Audio == 0) {
        music.setVolume(0)
    }
    if (Audio == 1) {
        music.setVolume(255)
    }
    if (1 < Audio) {
        Audio = 0
    }
    if (10 < Message_to_send) {
        Message_to_send = 0
    }
    radio.setTransmitPower(Power_Level)
    if (Power_Level < 0) {
        Power_Level = 1
        basic.showIcon(IconNames.No)
        Power_Level += -1
        music.playTone(175, music.beat(BeatFraction.Quarter))
    }
    if (7 < Power_Level) {
        Power_Level = 6
        basic.showIcon(IconNames.No)
        Power_Level += 1
        music.playTone(175, music.beat(BeatFraction.Quarter))
    }
})
basic.forever(function () {
    // This is  the display code for radio frequency, if the radio frequency is between 1-20 and it's  5 for example, the micro:bit will show 5. Adding more than 20 channels is possible but hard to read on screen due to the 5x5 Led screen. I might revamp this eventually but for now, I like it.
    while (Sending_or_changing_channel == 1) {
        basic.pause(5)
        radio.setGroup(Radio_Frequency)
        if (Radio_Frequency == 1) {
            basic.showLeds(`
                . # . . .
                # # . . .
                . # . . .
                . # . . .
                # # # . .
                `)
        }
        if (Radio_Frequency == 2) {
            basic.showLeds(`
                . # # . .
                # . . # .
                . . # . .
                . # . . .
                # # # # .
                `)
        }
        if (Radio_Frequency == 3) {
            basic.showLeds(`
                . # # . .
                # . . # .
                . . # . .
                # . . # .
                . # # . .
                `)
        }
        if (Radio_Frequency == 4) {
            basic.showLeds(`
                . # # . .
                # . # . .
                # # # # .
                . . # . .
                . . # . .
                `)
        }
        if (Radio_Frequency == 5) {
            basic.showLeds(`
                # # # # .
                # . . . .
                # # # . .
                . . . # .
                # # # . .
                `)
        }
        if (Radio_Frequency == 6) {
            basic.showLeds(`
                . # # . .
                # . . . .
                # # # . .
                # . . # .
                . # # . .
                `)
        }
        if (Radio_Frequency == 7) {
            basic.showLeds(`
                # # # # .
                . . . # .
                . . # . .
                . # . . .
                . # . . .
                `)
        }
        if (Radio_Frequency == 8) {
            basic.showLeds(`
                # # # . .
                # . # . .
                # # # . .
                # . # . .
                # # # . .
                `)
        }
        if (Radio_Frequency == 9) {
            basic.showLeds(`
                # # # . .
                # . # . .
                # # # . .
                . . # . .
                # # # . .
                `)
        }
        if (Radio_Frequency == 10) {
            basic.showLeds(`
                . # . # #
                # # . # #
                . # . # #
                . # . # #
                . # . # #
                `)
        }
        if (Radio_Frequency == 11) {
            basic.showLeds(`
                . # . . #
                # # . # #
                . # . . #
                . # . . #
                . # . . #
                `)
        }
        if (Radio_Frequency == 12) {
            basic.showLeds(`
                . # . # #
                # # # . #
                . # . . #
                . # . # .
                . # # # #
                `)
        }
        if (Radio_Frequency == 13) {
            basic.showLeds(`
                . # . # .
                # # . . #
                . # . # #
                . # . . #
                . # . # .
                `)
        }
        if (Radio_Frequency == 14) {
            basic.showLeds(`
                . # . . #
                # # . # #
                . # # # #
                . # . . #
                . # . . #
                `)
        }
        if (Radio_Frequency == 15) {
            basic.showLeds(`
                . # # # #
                # # # . .
                . # # # #
                . # . . #
                . # # # #
                `)
        }
        if (Radio_Frequency == 16) {
            basic.showLeds(`
                . # # # #
                # # # . .
                . # # # #
                . # # . #
                . # # # #
                `)
        }
        if (Radio_Frequency == 17) {
            basic.showLeds(`
                . # # # #
                # # . . #
                . # . . #
                . # . # .
                . # . # .
                `)
        }
        if (Radio_Frequency == 18) {
            basic.showLeds(`
                . # # # #
                # # # . #
                . # # # #
                . # # . #
                . # # # #
                `)
        }
        if (Radio_Frequency == 19) {
            basic.showLeds(`
                . # # # #
                # # # . #
                . # # # #
                . # . . #
                . # # # #
                `)
        }
        if (Radio_Frequency == 20) {
            basic.showLeds(`
                . # # # #
                # . # # #
                . . # # #
                . # . # #
                # # # # #
                `)
        }
    }
})
// This is the display code for sending a premade message. It uses the same principle as the radio frequency display code.
basic.forever(function () {
    while (Sending_or_changing_channel == 2) {
        if (Message_to_send == 0) {
            basic.showLeds(`
                . # . . .
                # . # . .
                # . # . .
                # . # . .
                . # . . .
                `)
        }
        if (Message_to_send == 1) {
            basic.showLeds(`
                . # . . .
                # # . . .
                . # . . .
                . # . . .
                # # # . .
                `)
        }
        if (Message_to_send == 2) {
            basic.showLeds(`
                . # # . .
                # . . # .
                . . # . .
                . # . . .
                # # # # .
                `)
        }
        if (Message_to_send == 3) {
            basic.showLeds(`
                . # # . .
                # . . # .
                . . # . .
                # . . # .
                . # # . .
                `)
        }
        if (Message_to_send == 4) {
            basic.showLeds(`
                . # # . .
                # . # . .
                # # # # .
                . . # . .
                . . # . .
                `)
        }
        if (Message_to_send == 5) {
            basic.showLeds(`
                # # # # .
                # . . . .
                # # # . .
                . . . # .
                # # # . .
                `)
        }
        if (Message_to_send == 6) {
            basic.showLeds(`
                . # # . .
                # . . . .
                # # # . .
                # . . # .
                . # # . .
                `)
        }
        if (Message_to_send == 7) {
            basic.showLeds(`
                # # # # .
                . . . # .
                . . # . .
                . # . . .
                . # . . .
                `)
        }
        if (Message_to_send == 8) {
            basic.showLeds(`
                # # # . .
                # . # . .
                # # # . .
                # . # . .
                # # # . .
                `)
        }
        if (Message_to_send == 9) {
            basic.showLeds(`
                # # # . .
                # . # . .
                # # # . .
                . . # . .
                # # # . .
                `)
        }
        if (Message_to_send == 10) {
            basic.showLeds(`
                . # . # #
                # # . # #
                . # . # #
                . # . # #
                . # . # #
                `)
        }
    }
})
// This is the display code for power level. It also, just like it's message and channel brothers. It uses the same principle for the display as them.
basic.forever(function () {
    while (Sending_or_changing_channel == 3) {
        if (Power_Level == 0) {
            basic.showLeds(`
                . # . . .
                # . # . .
                # . # . .
                # . # . .
                . # . . .
                `)
        }
        if (Power_Level == 1) {
            basic.showLeds(`
                . # . . .
                # # . . .
                . # . . .
                . # . . .
                # # # . .
                `)
        }
        if (Power_Level == 2) {
            basic.showLeds(`
                . # # . .
                # . . # .
                . . # . .
                . # . . .
                # # # # .
                `)
        }
        if (Power_Level == 3) {
            basic.showLeds(`
                . # # . .
                # . . # .
                . . # . .
                # . . # .
                . # # . .
                `)
        }
        if (Power_Level == 4) {
            basic.showLeds(`
                . # # . .
                # . # . .
                # # # # .
                . . # . .
                . . # . .
                `)
        }
        if (Power_Level == 5) {
            basic.showLeds(`
                # # # # .
                # . . . .
                # # # . .
                . . . # .
                # # # . .
                `)
        }
        if (Power_Level == 6) {
            basic.showLeds(`
                . # # . .
                # . . . .
                # # # . .
                # . . # .
                . # # . .
                `)
        }
        if (Power_Level == 7) {
            basic.showLeds(`
                # # # # .
                . . . # .
                . . # . .
                . # . . .
                . # . . .
                `)
        }
    }
})
