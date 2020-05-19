new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        healsLeft: 3,
        sAttacksLeft: 2,
        turns: [],
        status: "Clash!",
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = !this.gameIsRunning;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.healsLeft = 3;
            this.sAttacksLeft = 2;
            this.turns = []
            this.status = "Clash!"
        },
        attack: function () {
            this.playerAttacks();
            this.monsterAttacks();
            this.checkWin();

        },
        specialAttack: function () {
            if (this.sAttacksLeft != 0) {
                this.playerSpecialAttacks();
                this.monsterAttacks();
                this.sAttacksLeft -= 1;
            }
            this.checkWin();

        },
        heal: function () {
            this.playerHeals();
        },
        giveUp: function () {
            new Audio("sounds/giveUp.wav").play();
            this.playerHealth = 0;
            this.gameIsRunning = false;
            console.log("Monster Won!")
            this.status = "Monster Won!"
        },
        getPlayerBarColor: function () {
            if (this.playerHealth < 20) {
                return "red";
            }
            else if (this.playerHealth < 60) {
                return "yellow";
            }
            else {
                return "green";
            }
        },
        getMonsterBarColor: function () {
            if (this.monsterHealth < 20) {
                return "red";
            }
            else if (this.monsterHealth < 60) {
                return "yellow";
            }
            else {
                return "green";
            }
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max + 1), min)
        },
        checkWin: function () {
            if (this.playerHealth == 0) {
                this.healsLeft = 0;
                this.gameIsRunning = false;
            }
            else if (this.monsterHealth == 0) {
                this.gameIsRunning = false;
            }
            if (!this.gameIsRunning) {
                if (this.playerHealth > this.monsterHealth) {
                    console.log("Player Won!");
                    this.status = "Player Won!"
                } else if (this.playerHealth == this.monsterHealth) {
                    console.log("Tie!");
                    this.status = "Tie!"
                } else {
                    console.log("Monster Won!");
                    this.status = "Monster Won!"
                }
            }
        },
        monsterAttacks: function () {
            var damage = this.calculateDamage(5, 15);
            this.playerHealth -= damage;
            if (this.playerHealth < 0) {
                this.playerHealth = 0;
            }
            this.turns.unshift({ isPlayer: false, text: "Monster attacked Player for " + damage })
        },
        playerAttacks: function () {
            var damage = this.calculateDamage(3, 10)
            new Audio("sounds/attack.wav").play();
            this.monsterHealth -= damage;
            if (this.monsterHealth < 0) {
                this.monsterHealth = 0;
            }
            this.turns.unshift({ isPlayer: true, text: "Player attacked Monster for " + damage })
        },
        playerSpecialAttacks: function () {
            var damage = this.calculateDamage(5, 30)
            new Audio("sounds/specialAttack.wav").play();
            this.monsterHealth -= damage;
            if (this.monsterHealth < 0) {
                this.monsterHealth = 0;
            }
            this.turns.unshift({ isPlayer: true, text: "Player used Special Attack for " + damage })
        },
        playerHeals: function () {
            if (this.monsterHealth != 0) {
                if (this.playerHealth < 100 && this.playerHealth > 0 && this.healsLeft != 0) {
                    var health = this.calculateDamage(5, 20);
                    new Audio("sounds/heal.wav").play();
                    this.playerHealth += health;
                    this.healsLeft -= 1;
                    this.turns.unshift({ isPlayer: true, text: "Player healed for " + health })

                }
                if (this.playerHealth > 100) {
                    this.playerHealth = 100;
                }
            }
        }
    }
})