/**
 * A player's live position and facing direction inside their team's maze.
 * Grid coordinates are integer cell indices, not pixels — rendering scales
 * these to whatever canvas size each client draws at.
 */
export interface GridPosition {
  x: number;
  y: number;
}

export type Direction = "U" | "D" | "L" | "R";

export type PlayerConnectionStatus = "connected" | "disconnected" | "reconnecting";

/**
 * Full server-side record of a player. The server is authoritative for all
 * of this — clients never set score, position, or level directly.
 */
export interface Player {
  id: string; // socket id or persistent session id
  name: string;
  teamId: string;
  position: GridPosition;
  facing: Direction;
  score: number;
  status: PlayerConnectionStatus;
  /** Timestamp (ms) player was last caught by a monster — used to gate respawn invulnerability. */
  lastCaughtAt: number | null;
  joinedAt: number;
}

/**
 * Slimmed-down player view sent to the big-screen dashboard, where full
 * per-player detail (like socket internals) isn't needed.
 */
export interface PlayerPublicView {
  id: string;
  name: string;
  position: GridPosition;
  facing: Direction;
  score: number;
  status: PlayerConnectionStatus;
}

/** What a phone client receives about itself each tick. */
export interface PlayerSelfView extends PlayerPublicView {
  teamId: string;
}
