export interface Team {
  id: string;
  captainId: string;
  name: any;
  rating: number;
  season: number;
  teamStatus: string;
  teamType: string;
  teamMemberIds: string[];
  teamMembers: UserProfile[];
}
