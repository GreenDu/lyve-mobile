import { AchievementType } from "@api/responses";
import { LevelType } from "../types/types";


const achievementDescriptions: Record<AchievementType, (condition: number) => string> = {
    'NTH_STREAM': (condition) => `Stream ${condition} times to unlock this achievement.`,
    'MINUTES_STREAMED': (condition) => `Stream for ${condition} minutes to unlock this achievement.`,
    'NTH_VIEWERS': (condition) => `Reach ${condition} viewers to unlock this achievement.`,
  };
  
  // Function to get achievement description based on type and progress
  export const getAchievementDescription = (type: AchievementType, condition: number): string =>
    achievementDescriptions[type]
      ? achievementDescriptions[type](condition)
      : 'No description available';

    
export const achievementLookupTable: Record<AchievementType, Record<LevelType, string>> = {
    NTH_STREAM: {
      1: '1️⃣',
      2: '🔟',
      3: '🔥',
      4: '🎥',
      5: '💯',
      6: '🏆',
      7: '',
      8: ''
    },
    NTH_VIEWERS: {
      1: '🔟',
      2: '📈',
      3: '💯',
      4: '✨',
      5: '💛',
      6: '🌟',
      7: '👑',
      8: '🌏'
    },
    MINUTES_STREAMED: {
      1: '🔟',
      2: '⌛️',
      3: '🏃',
      4: '🔥',
      5: '🌄',
      6: '🤯',
      7: '💓',
      8: '',
    }
  };