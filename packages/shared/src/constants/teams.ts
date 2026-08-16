import type { TeamIdentity } from "../types/team.js";

/**
 * Prebuilt tech-themed team identities. TeamManager assigns players into
 * these round-robin as they join, 5 per team, activating pool entries in
 * order — so with 43 players you get 8 full teams and 1 team of 3
 * (still playable, never blocked from starting).
 */
export const TEAM_POOL: TeamIdentity[] = [
  { id: "kernel", name: "Team Kernel", color: "#7dd3fc", darkColor: "#0891b2", icon: "⬢" },
  { id: "compile", name: "Team Compile", color: "#f9a8d4", darkColor: "#db2777", icon: "◆" },
  { id: "byte", name: "Team Byte", color: "#c4b5fd", darkColor: "#7c3aed", icon: "●" },
  { id: "cache", name: "Team Cache", color: "#fde68a", darkColor: "#ca8a04", icon: "▲" },
  { id: "rootnode", name: "Team Rootnode", color: "#86efac", darkColor: "#16a34a", icon: "■" },
  { id: "payload", name: "Team Payload", color: "#fdba74", darkColor: "#ea580c", icon: "◈" },
  { id: "firewall", name: "Team Firewall", color: "#a5b4fc", darkColor: "#4f46e5", icon: "⬡" },
  { id: "bandwidth", name: "Team Bandwidth", color: "#fca5a5", darkColor: "#dc2626", icon: "★" },
  { id: "binary", name: "Team Binary", color: "#5eead4", darkColor: "#0d9488", icon: "◉" },
  { id: "cipher", name: "Team Cipher", color: "#fbcfe8", darkColor: "#be185d", icon: "✦" },
  { id: "overclock", name: "Team Overclock", color: "#fdd8ab", darkColor: "#c2410c", icon: "▶" },
  { id: "syntax", name: "Team Syntax", color: "#bfdbfe", darkColor: "#1d4ed8", icon: "◐" },
  { id: "uplink", name: "Team Uplink", color: "#ddd6fe", darkColor: "#6d28d9", icon: "⬣" },
  { id: "bitrate", name: "Team Bitrate", color: "#bbf7d0", darkColor: "#15803d", icon: "✚" },
  { id: "protocol", name: "Team Protocol", color: "#fecaca", darkColor: "#b91c1c", icon: "◇" },
];

export const PLAYERS_PER_TEAM = 5;
