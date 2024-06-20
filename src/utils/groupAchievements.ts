import { AchievementType, UserToAchievement } from "@api/responses";
import { DisplayedAchievement } from "../types/types";




  export const groupAchievements = (userToAchievement: UserToAchievement[]) => {

    let groupedAchievements = {
        NTH_STREAM: [] as DisplayedAchievement[],
        MINUTES_STREAMED: [] as DisplayedAchievement[],
        NTH_VIEWERS: [] as DisplayedAchievement[],
      } as Record<AchievementType, DisplayedAchievement[]>;
    
    
     userToAchievement.forEach((a) => {
        const type = a.achievement.type as AchievementType;
        const temp: DisplayedAchievement = {
          level: a.achievement.level,
          type: a.achievement.type,
          progress: a.progress,
          condition: a.achievement.condition,
          id: a.achievement.id,
          name: a.achievement.name,
        };
        groupedAchievements[type].push(temp);
      });
    
      // Sort each group by level
      Object.keys(groupedAchievements).forEach((type) => {
        groupedAchievements[type as AchievementType].sort((a, b) => a.level - b.level);
      });
    
      // Flatten the sorted groups into a single array
      const sortedAchievements = Object.values(groupedAchievements).flatMap((group) => group);

      return sortedAchievements;

  }

  