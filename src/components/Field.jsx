const Field = ({ c, label, value, onChange, min, max, step = 1, suffix, prefix, hint }) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: c.t2 }}>{label}</span>
      {hint && <span style={{ fontSize: 10, color: c.t3 }}>{hint}</span>}
    </div>
    <div style={{ position: "relative" }}>
      {prefix && (
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13, fontWeight: 700, color: c.accent, pointerEvents: "none" }}>
          {prefix}
        </span>
      )}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        style={{
          width: "100%", height: 46,
          padding: `0 ${suffix ? 42 : 12}px 0 ${prefix ? 26 : 12}px`,
          background: c.inputBg, border: "1.5px solid transparent", borderRadius: 12,
          color: c.t1, fontFamily: "'Figtree',sans-serif", fontSize: 14, fontWeight: 500,
          outline: "none", WebkitAppearance: "none", MozAppearance: "textfield",
        }}
        onFocus={(e) => { e.target.style.borderColor = c.accent; e.target.style.boxShadow = `0 0 0 3px ${c.accentBg}`; }}
        onBlur={(e) => { e.target.style.borderColor = "transparent"; e.target.style.boxShadow = "none"; }}
      />
      {suffix && (
        <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 11, color: c.t3, pointerEvents: "none" }}>
          {suffix}
        </span>
      )}
    </div>
  </div>
);

export default Field;
