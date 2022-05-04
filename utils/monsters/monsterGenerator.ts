// Find all the single number in a string
export const findNumbers = (str: string) => {
  if (typeof str !== 'string') {
    return [];
  }

  const regex = /\d+/g;
  const numbers = str.match(regex);

  //split numbers that are above 10
  const numbersSplit = [] as number[];

  numbers?.forEach(number => {
    if (number.length > 1) {
      return number.split('').forEach(num => numbersSplit.push(parseInt(num)));
    }
    numbersSplit.push(parseInt(number));
  });
  return numbersSplit;
};

export const convertLetterToNumber = (letter: string) => {
  if (letter.length != 1) {
    return 0;
  }
  if (typeof letter !== 'string') {
    return 0;
  }

  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  return alphabet.indexOf(letter.toLowerCase()) + 1;
};

const MonsterNames = [
  'Goblin',
  'Orc',
  'Troll',
  'Giant',
  'Dragon',
  'Vampire',
  'Werewolf',
  'Hydra',
  'Golem',
  'Golem',
];

const MonsterTypes = [
  'Ice',
  'Fire',
  'Lightning',
  'Earth',
  'Water',
  'Air',
  'Dark',
  'Light',
  'Poison',
  'Undead',
];

export const generateMonster = (monsterId: string, rating: number) => {
  const monsterStats = findNumbers(monsterId);
  if (monsterStats.length < 5) {
    //loop through monsterId String
    for (let i = 0; monsterStats.length < 5; i++) {
      const letter = monsterId[i];
      const number = convertLetterToNumber(letter);
      if (number) {
        monsterStats.push(number);
      }
    }
  }

  return {
    id: monsterId,
    name: MonsterNames[monsterStats[0]],
    type: MonsterTypes[monsterStats[1]],
    hp: Math.floor(monsterStats[2] * rating * 1000),
    attack: Math.floor(monsterStats[3] * rating),
    speed: Math.floor(monsterStats[4] * rating),
  };
};
