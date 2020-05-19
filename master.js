new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        healsLeft: 3,
        sAttacksLeft: 2,
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = !this.gameIsRunning;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.healsLeft = 3;
            this.sAttacksLeft = 2;
        },
        attack: function () {

            new Audio("sounds/attack.wav").play();
            this.monsterHealth -= Math.max(Math.floor(Math.random() * 11), 3);
            this.playerHealth -= Math.max(Math.floor(Math.random() * 15), 5);
            if (this.playerHealth < 0) {
                this.playerHealth = 0;
            }
            if (this.monsterHealth < 0) {
                this.monsterHealth = 0;
            }

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
                } else if (this.playerHealth == this.monsterHealth) {
                    console.log("Tie!");
                } else {
                    console.log("Monster Won!");
                }
            }

        },
        specialAttack: function () {
            if (this.sAttacksLeft != 0) {
                new Audio("sounds/specialAttack.wav").play();
                this.monsterHealth -= Math.max(Math.floor(Math.random() * 31), 3);
                this.playerHealth -= Math.max(Math.floor(Math.random() * 15), 5);
                if (this.playerHealth < 0) {
                    this.playerHealth = 0;
                }
                if (this.monsterHealth < 0) {
                    this.monsterHealth = 0;
                }
                if (this.playerHealth == 0) {
                    this.healsLeft = 0;
                    this.gameIsRunning = false;
                }
                else if (this.monsterHealth == 0) {
                    this.gameIsRunning = false;
                }

                this.sAttacksLeft -= 1;
            }

            if (!this.gameIsRunning) {
                if (this.playerHealth > this.monsterHealth) {
                    console.log("Player Won!");
                } else if (this.playerHealth == this.monsterHealth) {
                    console.log("Tie!");
                } else {
                    console.log("Monster Won!");
                }
            }
        },
        heal: function () {
            if (this.monsterHealth == 0) {
            }
            else {
                if (this.playerHealth < 100 && this.playerHealth > 0 && this.healsLeft != 0) {
                    new Audio("sounds/heal.wav").play();
                    this.playerHealth = this.playerHealth + Math.floor(Math.random() * 15);
                    this.healsLeft -= 1;
                }
                if (this.playerHealth > 100) {
                    this.playerHealth = 100;
                }
            }
        },
        giveUp: function () {
            new Audio("sounds/giveUp.wav").play();
            this.playerHealth = 0;
            this.gameIsRunning = false;
            console.log("Monster Won!")
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
    }
})