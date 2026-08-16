import type { PlayerPublicView } from "./player.js";

export interface TeamIdentity {
  id: string;
  name: string;
  color: string; // primary pastel hex
  darkColor: string; // accent/text-safe darker hex of the same hue
  icon: string; // single glyph used as the team's token shape on screen
}

/**
 * A team's progress through the three levels. `objectiveProgress` resets
 * to 0 each time the team advances a level; `target` comes from the level
 * config so it can be tuned without touching game logic.
 */
export interface TeamProgress {
  level: 1 | 2 | 3;
  objectiveProgress: number;
  objectiveTarget: number;
  levelReachedAt: Record<1 | 2 | 3, number | null>; // ms timestamps, for tie-breaking
}

export interface Team extends TeamIdentity {
  mazeId: string; // which pre-generated maze layout this team is currently playing
  players: PlayerPublicView[];
  score: number; // sum of all players' scores
  progress: TeamProgress;
}

/** Row shape the leaderboard renders — one per team, already sorted/grouped by the server. */
export interface LeaderboardRow {
  rank: number;
  team: TeamIdentity;
  level: 1 | 2 | 3;
  score: number;
  playersActive: number;
  playersTotal: number;
}
