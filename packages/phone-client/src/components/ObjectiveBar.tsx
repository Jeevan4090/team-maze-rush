export default function ObjectiveBar({ level, levelName, progress, target }: { level: number; levelName: string; progress: number; target: number }) {
  const pct = Math.min(100, (progress / target) * 100);
  return (
    <div>
      <div style={{ width: "100%", height: 8, background: "var(--line)", borderRadius: 999, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, var(--purple-light), var(--pink))", borderRadius: 999, transition: "width 0.4s ease" }} />
      </div>
      <div style={{ fontSize: 11, color: "var(--dim)", fontWeight: 700, textAlign: "center", marginTop: 4 }}>
        LEVEL {level} · {levelName} · {progress}/{target} crystals
      </div>
    </div>
  );
}
