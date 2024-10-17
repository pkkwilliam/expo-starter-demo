import {Team} from '@app/utils/types/Team';

export interface Game {
  id: string;
  awayTeamScore: number;
  createTime: any;
  countId: any;
  endTime: any;
  homeTeamScore: number;
  gameType: string;
  gameProgress: string;
  scoreCalculateType: any;
  teamType: string;
  updateTime: any;
  awayTeamDto: any;
  court: any;
  homeTeamDto: Team;
}
