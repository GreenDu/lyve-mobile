import { AchievementType } from "@api/responses";
import { LevelType } from "../types/types";

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