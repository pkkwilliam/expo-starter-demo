import {Team} from '@app/utils/types/Team';
import {GameProgress} from '@app/utils/types/gameProgress';

export interface Game {
  id: string;
  awayTeamScore: number;
  createTime: any;
  countId: any;
  endTime: any;
  homeTeamScore: number;
  gameType: string;
  gameProgress: GameProgress;
  scoreCalculateType: any;
  teamType: string;
  updateTime: any;
  awayTeamDto: any;
  court: any;
  homeTeamDto: Team;
}
