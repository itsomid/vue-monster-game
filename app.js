function getRandomValue(max, min){

    return Math.floor(Math.random() * (max - min)) + min
}
const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null
        }
    },
    computed:{
        monsterHealthBar(){
            return { width: this.monsterHealth + '%' }
        },
        playerHealthBar(){
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
            this.attackPlayer() 
        },
        attackPlayer(){
            const attackValue = getRandomValue(15 , 8)
            this.playerHealth -= attackValue
        },
        specialAttackMonster(){
            this.currentRound ++;
            const attackValue = getRandomValue(10 , 25)
            this.monsterHealth -= attackValue
            this.attackPlayer() 
        },
        healPlayer(){
            this.currentRound ++;
            const healValue = getRandomValue(20,8)
            if(this.playerHealth + healValue > 100){
                console.log(this.playerHealth)
                this.playerHealth = 100
            }else{
                console.log(healValue,this.playerHealth)
                this.playerHealth += healValue
            }
            this.attackPlayer()
        }
    },  
})

app.mount('#game')