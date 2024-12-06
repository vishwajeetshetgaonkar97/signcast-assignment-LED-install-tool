
type AthleteTeamInfo = {
  team_id: string;
  name: string;
  sport: string;
  logo: string;
  position: string;
  jersey_num: number;
};

interface Athlete extends UserDoc {
  sport: string;
  position: string;
  state: string;
  isProAthlete: 'Y' | 'N';
  summarised_stats: SummarisedStats;
  best_team_name: string;
  DOB: string;
  aadhar_num: string;
  cm_height: number;
  kg_weight: number;
  is_featured: string;
  featured_video: Article;
  teams_info: Record<string, AthleteTeamInfo>;
}

export type { Athlete };
