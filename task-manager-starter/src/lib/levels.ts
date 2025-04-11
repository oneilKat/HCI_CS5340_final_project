export const levelXP: Record<number, number> = {
    1: 0,
    2: 100,
    3: 250,
    4: 450,
    5: 700,
    6: 1000,
    7: 1350,
    8: 1750,
    9: 2200,
    10: 2700,
  };
  

export function getXPForLevel(level: number): number {
    return 100 * level * (level -1 );
}

export function getLevelFromXP(xp: number): number {
    let level = 1;
  
    for (const [lvlStr, requiredXP] of Object.entries(levelXP)) {
      const lvl = parseInt(lvlStr);
      if (xp >= requiredXP) {
        level = lvl;
      } else {
        break;
      }
    }
  
    return level;
  }
  