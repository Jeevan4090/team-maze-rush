import { useState } from "react";
import type { PlayerJoinAck } from "@tmr/shared";

export default function JoinPage({ onJoin }: { onJoin: (name: string) => Promise<PlayerJoinAck> }) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleJoin() {
    if (!name.trim()) {
      setError("Enter a name first");
      return;
    }
    setSubmitting(true);
    setError(null);
    const ack = await onJoin(name.trim());
    setSubmitting(false);
    if (!ack.ok) setError(ack.error ?? "Something went wrong");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16, padding: 20, textAlign: "center" }}>
      <h1 style={{ fontSize: 26, color: "var(--purple)", fontWeight: 900, margin: 0 }}>🔷 MAZE RUSH</h1>
      <input
        type="text"
        placeholder="Enter your name"
        maxLength={14}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleJoin()}
        style={{ width: "100%", maxWidth: 300, padding: 15, borderRadius: 14, border: "2px solid var(--line)", fontSize: 16, textAlign: "center", fontWeight: 700, background: "#faf8ff" }}
      />
      <button
        onClick={handleJoin}
        disabled={submitting}
        style={{ width: "100%", maxWidth: 300, padding: 16, borderRadius: 14, border: "none", background: "var(--purple)", color: "white", fontSize: 16, fontWeight: 800, boxShadow: "0 6px 0 #5b21b6" }}
      >
        {submitting ? "Joining..." : "JOIN GAME"}
      </button>
      {error && <div style={{ color: "var(--pink)", fontSize: 13 }}>{error}</div>}
      <div style={{ fontSize: 12, color: "var(--dim)" }}>Teams are assigned automatically — just enter your name and go.</div>
    </div>
  );
}
