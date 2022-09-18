function getRandomValue(max, min){

    return Math.floor(Math.random() * (max - min)) + min
}
const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        }
    },
    computed:{
        monsterHealthBar(){
            if(this.monsterHealth <= 0){
                return { width: '0%' }
            }
            return { width: this.monsterHealth + '%' }
        },
        playerHealthBar(){
            if(this.playerHealth <= 0){
                return { width: '0%' }
            }
            return { width: this.playerHealth + '%' }
        },
        mayUseSpecialAttack(){    
            return this.currentRound % 3 !== 0
        }
    },
    watch:{
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <=0){
                this.winner = 'draw'
            }else if (value <= 0){
                this.winner = 'monster'
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <=0){
                this.winner = 'draw'
            }else if(value <= 0){
                this.winner = 'player'
            }
        }
    },
    methods: {
        attackMonster(){
            this.currentRound ++;
            const attackValue = getRandomValue(12 , 5)
            this.monsterHealth -= attackValue
            this.createLogMessage('player', 'attack', attackValue);
            this.attackPlayer() 
        },
        attackPlayer(){
            const attackValue = getRandomValue(15 , 8)
            this.playerHealth -= attackValue
            this.createLogMessage('monster', 'attack', attackValue);
        },
        specialAttackMonster(){
            this.currentRound ++;
            const attackValue = getRandomValue(10 , 25)
            this.monsterHealth -= attackValue
            this.createLogMessage('player', 'attack', attackValue);
            this.attackPlayer() 
        },
        healPlayer(){
            this.currentRound ++;
            const healValue = getRandomValue(20,8)
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100
            }else{
                this.playerHealth += healValue
            }
            this.createLogMessage('player', 'heal', healValue);
            this.attackPlayer()
        },
        startNewGame(){
            this.monsterHealth = 100
            this.playerHealth = 100
            this.currentRound = 0
            this.winner = null
            this.logMessage = []
        },
        surrender(){
            this.winner = 'monster'
        },
        createLogMessage(who,what,value){
            this.logMessages.push({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }
    },  
})

app.mount('#game')