// Find all the single number in a string
const findNumbers = (str: string) => {
    const regex = /\d+/g;
    const numbers =  str.match(regex);
    
    //split numbers that are above 10
    const numbersSplit = [] as number[]

    numbers?.forEach(number => {
        if(number.length > 1){
            return number.split('').forEach(num => numbersSplit.push(parseInt(num)));
        }
        numbersSplit.push(parseInt(number));
    })
    return numbersSplit;
}

const convertLetterToNumber = (letter: string) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet.indexOf(letter.toLowerCase()) + 1;
}

const MonsterNames = [
    'Goblin',
    'Orc',
    'Troll',
    'Giant',
    'Dragon',
    "Vampire",
    "Werewolf",
    "Hydra",
    "Golem",
]

const MonsterTypes = [
    "Ice",
    "Fire",
    "Lightning",
    "Earth",
    "Water",
    "Air",
    "Dark",
    "Light",
    "Poison",
]





export const generateMonster = (monsterId: string,rating : number) => {
    const monsterStats = findNumbers(monsterId);
    if(monsterStats.length < 5){
        //loop through monsterId String
        for(let i = 0; monsterStats.length < 5; i++){
            const letter = monsterId[i];
            const number = convertLetterToNumber(letter);
            if(number){
                monsterStats.push(number);
            }
        }
    }

    return{
        id : monsterId,
        name : MonsterNames[monsterStats[0] - 1],
        type : MonsterTypes[monsterStats[1] -1 ],
        hp : Math.floor(monsterStats[2] * rating * 1000),
        attack : Math.floor(monsterStats[3] * rating),
        speed : Math.floor(monsterStats[4] * rating),
    }
  
}