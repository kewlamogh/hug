let n = 0

class Dueler {
    constructor(dialogues) {
        this.health = 10;
        this.healingPackets = 0;
        this.dodgeCooldown = 0;
        this.swingCooldown = 0;
        this.dialogues = dialogues;
        this.canDodge = true;
        this.isDodging = false;
        this.currentlySwinging = false;

        setInterval(() => {
            if (this.dodgeCooldown > 0) { this.dodgeCooldown--  }
            if (this.dodgeCooldown > 0 && this.dodgeCooldown < 500) { this.isDodging = true }

            this.canDodge = this.dodgeCooldown == 0
            

            if (this.swingCooldown > 0) { this.swingCooldown-- }
            this.currentlySwinging = this.swingCooldown != 0
        }, 1)
    }

    pickRandomDialog(evt) {
        return this.dialogues[evt][Math.floor(Math.random() * this.dialogues[evt].length)]
    }

    healthHTML() {
        return this.health.toString()
    }
}

function print(type, content) {
    console.log(`[${type}] ${content}`)
}

async function bot(buttons, getgoodBot, getEnemy) {
    // setInterval(() => {
    //     let enemy = getEnemy()
    //     let goodBot = getgoodBot()

    //     if (enemy.health > 0 && goodBot.health > 0) {
    //        buttons.attack.click()
    //     }
    // }, 100)

    // setInterval(() => {
    //     let enemy = getEnemy()
    //     let goodBot = getgoodBot()
        
    //     if (enemy.health > 0 && goodBot.health > 0) {
    //         buttons.dodge.click()
    //     }
    // }, 3000)

    // setInterval(() => {
    //     let enemy = getEnemy()
    //     let goodBot = getgoodBot()

    //     if (enemy.currentlySwinging && enemy.health > 0 && goodBot.health > 0) {
    //         buttons.parry.click()
    //     }
    // }, 1)

    
    while (getEnemy().health > 0 && getgoodBot().health >   0) {
        let option
        let goodBot = getgoodBot()
        let enemy = getEnemy()

        if (enemy.currentlySwinging) {
            option = "parry"
        } else {
            option = "attack"
        }

        setInterval(() => {
           option = "dodge" 
        }, 3000)

        switch (option) {
            case "parry":
                buttons.parry.click()
                break

            case "attack":
                for (let i = 0; i < 10; i++) {
                    buttons.attack.click()
                    await new Promise((resolve) => setTimeout(resolve, 100))
                    buttons.attack.click()
                }

                break

            case "dodge":
                buttons.dodge.click()
                break
        }

        await new Promise(resolve => setTimeout(resolve, 75))
    }
}

const document = {
    createElement(b) {
        return {
            onclick() {},

            addEventListener (q, r) {
                this.onclick = r;
            },
            
            click() {
                this.onclick()
            }
        }
    }
}

async function game() {
    let buttons = {
        attack: document.createElement("button"),
        dodge: document.createElement("button"),
        parry: document.createElement("button")
    }

    let goodBot = new Dueler({
        "damaged": [
            "That hurt!",
            "Oof!",
            "That's the last hit you'll get!"
        ], "damage": [
            "Hah! Got goodBot!",
            "That's one step closer to you're death."
        ], "gameStart": [
            "<i>goodBot bows.</i>"
        ]
    })

    let enemy = new Dueler({
        "damaged": [
            "Is that all goodBot've got?",
            "Barely felt a scratch.",
            "OWWW!",
            "<i>grunt</i>"
        ], "damage": [
            "Hah! One more for me!",
            "DIE!",
            "Pathetic."
        ], "gameStart": [
            "Prepare to die, fool.",
            "One of us will be dead by the end of this duel - goodBot.",
        ]
    })

    print("alert", "Match started.")
    print("info", `goodBotr health: ${goodBot.healthHTML()}`)
    print("info", `Enemy health: ${enemy.healthHTML()}`)
    print("conversation id=\"enemy\"", enemy.pickRandomDialog("gameStart"))
    print("conversation id=\"goodBot\"", goodBot.pickRandomDialog("gameStart"))
    
    for (let button in buttons) {
        buttons[button].disabled = false
    }

    buttons.attack.addEventListener("click", () => {
        if (goodBot.currentlySwinging) {
            print("alert", "Already swinging.")   
        } else {
            if (enemy.isDodging) {
                print("info", "goodBotr enemy dodged goodBotr attack.")
            } else {
                const damage = Math.ceil(Math.random() * 2)
                enemy.health -= damage
                goodBot.swingCooldown = 100
        
                print("text", "goodBot attacked goodBotr enemy and did <b>"+damage+"</b> damage.")
                print("info", `goodBotr health: ${goodBot.healthHTML()}`)
                print("info", `Enemy health: ${enemy.healthHTML()}`)

                print("conversation id = \"enemy\"", enemy.pickRandomDialog("damaged"))
            }
        }
    })

    buttons.parry.addEventListener("click", () => {
        if (enemy.currentlySwinging) {
            buttons.attack.click()
            print("info", "goodBot parried an attack from the enemy and did some damage.")
            print("info", `goodBotr health: ${goodBot.healthHTML()}`)
            print("info", `Enemy health: ${enemy.healthHTML()}`)
        } else {
            print("info", "Cannot parry!")
        }
    })

    buttons.dodge.addEventListener("click", () => {
        if (goodBot.canDodge) {
            goodBot.dodgeCooldown = 1000 * 3
        } else {
            print("alert", "Dodge cooldown is not complete.")
        }
    })
 
    bot(buttons, () => goodBot, () => enemy)

    while (enemy.health > 0 && goodBot.health >   0) {
        let option

        if (goodBot.currentlySwinging) {
            option = "parry"
        } else {
            option = "attack"
        }

        setTimeout(() => {
           option = "dodge" 
        }, 3000)

        switch (option) {
            case "parry":
                if (goodBot.currentlySwinging) {
                    const d = Math.ceil(Math.random() * 2) 
                    goodBot.health -= d

                    print("alert", `Enemy parried goodBotr attack and did ${d} damage.`)
                    print("info", `goodBotr health: ${goodBot.healthHTML()}`)
                    print("info", `Enemy health: ${enemy.healthHTML()}`)
                }

            case "attack":
                if (!enemy.currentlySwinging) {
                    if (!goodBot.isDodging) {
                        const damage = Math.ceil(Math.random() * 2)
                        goodBot.health -= damage
                        enemy.swingCooldown = 100

                        print("alert", `goodBotr enemy did ${damage} damage.`)
                        print("conversation id = \"enemy\"", enemy.pickRandomDialog("damage"))

                        
                        print("info", `goodBotr health: ${goodBot.healthHTML()}`)
                        print("info", `Enemy health: ${enemy.healthHTML()}`)
                    } else {
                        print("info", `goodBotr dodged a strike.`)
                                
                        print("info", `goodBotr health: ${goodBot.healthHTML()}`)
                        print("info", `Enemy health: ${enemy.healthHTML()}`)
                    }
                }

                break

            case "dodge":
                if (enemy.canDodge) {
                    enemy.dodgeCooldown = 1000 * 3
                } else {
                    if (!enemy.currentlySwinging) {
                        if (!goodBot.isDodging) {
                            const damage = Math.ceil(Math.random() * 2)
                            goodBot.health -= damage
                            enemy.swingCooldown = 100

                            print("alert", `goodBotr enemy did ${damage} damage.`)
                            print("conversation id = \"enemy\"", enemy.pickRandomDialog("damage"))                                        
                            print("info", `goodBotr health: ${goodBot.healthHTML()}`)
                            print("info", `Enemy health: ${enemy.healthHTML()}`)
                        } else {
                            print("info", `goodBot dodged a strike.`)
                        }
                    }
                }

                break
        }

        await new Promise(resolve => setTimeout(resolve, Math.ceil(Math.random() * 1000)))
    }

    print("info", "Duel over...")

    if (goodBot.health <= 0) {
        print("warning", "goodBot lost!")
    } else {
        print("info", "GOOD JOB! goodBot won!")
    }

  
    // for (let button in buttons) {
    //     buttons[button].disabled = true
    //     buttons[button].removeEventListener("click")
    // }
}

function play(f) {
    return f
}

async function countDown() {
    print("alert", "3...")
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    print("alert", "2...")
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    print("alert", "1...")
    await new Promise((resolve) => setTimeout(resolve, 1000))
}

module.exports = () => {
    countDown().then(play(game))
}