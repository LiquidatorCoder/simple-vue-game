new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        healsLeft: 3,
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = !this.gameIsRunning;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.healsLeft = 3;
        },
        attack: function () {

            if (this.playerHealth == 0) {
                this.healsLeft = 0;
            }
            else if (this.monsterHealth == 0) {
            }
            else {
                new Audio("sounds/attack.wav").play();
                this.monsterHealth -= Math.max(Math.floor(Math.random() * 11), 3);
                this.playerHealth -= Math.max(Math.floor(Math.random() * 15), 5);
                if (this.playerHealth < 0) {
                    this.playerHealth = 0;
                }
                if (this.monsterHealth < 0) {
                    this.monsterHealth = 0;
                }
            }
        },
        specialAttack: function () {
            if (this.playerHealth == 0) {
                this.healsLeft = 0;
            }
            else if (this.monsterHealth == 0) {
            }
            else {
                new Audio("sounds/specialAttack.wav").play();
                this.monsterHealth -= Math.max(Math.floor(Math.random() * 31), 3);
                this.playerHealth -= Math.max(Math.floor(Math.random() * 15), 5);
                if (this.playerHealth < 0) {
                    this.playerHealth = 0;
                }
                if (this.monsterHealth < 0) {
                    this.monsterHealth = 0;
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
        }
    }
})