function getRandomValue(max, min){

    return Math.floor(Math.random() * (max - min)) + min
}
const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0
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
    methods: {
        attackMonster(){
            this.currentRound ++;
            const attackValue = getRandomValue(12 , 5)
            this.monsterHealth -= attackValue
            console.log(this.currentRound);
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
    },  
})

app.mount('#game')