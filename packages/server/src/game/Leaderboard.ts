import type { LeaderboardRow, TeamIdentity } from "@tmr/shared";

export interface TeamForRanking {
  id: string;
  identity: TeamIdentity;
  level: 1 | 2 | 3;
  score: number;
  playersActive: number;
  playersTotal: number;
}

/**
 * Builds the level-grouped leaderboard: Level 3 teams always appear above
 * Level 2, which always appear above Level 1 — regardless of score. Within
 * a level, teams are ranked by score. Rank numbers continue across groups
 * (so a lone Level 3 team is always #1 overall).
 */
export class Leaderboard {
  static buildRows(teams: TeamForRanking[]): LeaderboardRow[] {
    const rows: LeaderboardRow[] = [];
    let rank = 0;
    for (const level of [3, 2, 1] as const) {
      const group = teams
        .filter((t) => t.level === level)
        .sort((a, b) => b.score - a.score);
      for (const t of group) {
        rank++;
        rows.push({
          rank,
          team: t.identity,
          level: t.level,
          score: t.score,
          playersActive: t.playersActive,
          playersTotal: t.playersTotal,
        });
      }
    }
    return rows;
  }

  /** The team currently in the #1 overall slot (level takes priority over score). */
  static topTeamId(rows: LeaderboardRow[]): string | null {
    return rows[0]?.team.id ?? null;
  }
}
