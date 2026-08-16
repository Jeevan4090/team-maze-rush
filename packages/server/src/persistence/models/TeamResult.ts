export interface TeamResultRecord {
  sessionId: string;
  teamId: string;
  teamName: string;
  rank: number;
  score: number;
  levelReached: 1 | 2 | 3;
}
