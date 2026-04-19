import { useState } from "react";

const SldInput = ({ c, label, value, onChange, min, max, step = 1, format, prefix = "₹" }) => {
  const [editing, setEditing] = useState(false);
  const [tmpVal, setTmpVal] = useState("");

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: c.t2 }}>{label}</span>
        {editing ? (
          <input
            type="number"
            autoFocus
            value={tmpVal}
            onChange={(e) => setTmpVal(e.target.value)}
            onBlur={() => { const v = Number(tmpVal); if (!isNaN(v) && v >= min && v <= max) onChange(v); setEditing(false); }}
            onKeyDown={(e) => { if (e.key === "Enter") { const v = Number(tmpVal); if (!isNaN(v) && v >= min && v <= max) onChange(v); setEditing(false); } }}
            style={{ width: 120, height: 28, padding: "0 8px", background: c.inputBg, border: `1.5px solid ${c.accent}`, borderRadius: 8, color: c.t1, fontFamily: "monospace", fontSize: 13, fontWeight: 700, outline: "none", textAlign: "right" }}
          />
        ) : (
          <button
            onClick={() => { setTmpVal(String(value)); setEditing(true); }}
            style={{ background: c.fill, border: `1px solid ${c.bdr}`, borderRadius: 8, padding: "2px 10px", cursor: "pointer", fontSize: 12, fontWeight: 700, color: c.t1, fontFamily: "monospace" }}
          >
            {format ? format(value) : `${prefix}${value.toLocaleString("en-IN")}`}
          </button>
        )}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: "100%", height: 4, appearance: "none", WebkitAppearance: "none",
          borderRadius: 2, outline: "none", cursor: "pointer",
          background: `linear-gradient(90deg,${c.accent} 0%,${c.accent} ${((value - min) / (max - min)) * 100}%,${c.fill2} ${((value - min) / (max - min)) * 100}%,${c.fill2} 100%)`,
        }}
      />
    </div>
  );
};

export default SldInput;
