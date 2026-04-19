import { useState } from "react";
import HELP from "../constants/help";

const InfoModal = ({ c, show, onClose, tab }) => {
  const [oi, setOi] = useState(null);
  if (!show) return null;
  const sec = HELP.find((s) => s.tab === tab) || HELP[0];

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 600, background: "rgba(0,0,0,.55)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)", padding: 16 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: c.card, borderRadius: 24, padding: "24px 20px", width: "100%", maxWidth: 440, maxHeight: "82vh", overflowY: "auto", boxShadow: c.shadow2, position: "relative" }}
      >
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, width: 30, height: 30, border: "none", background: c.fill2, borderRadius: "50%", cursor: "pointer", fontSize: 14, color: c.t3, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        <div style={{ fontSize: 22, marginBottom: 4 }}>{tab === "invest" ? "📈" : "🏦"}</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: c.t1, marginBottom: 4 }}>{sec.title}</div>
        <div style={{ fontSize: 11, color: c.t3, marginBottom: 18 }}>Tap any question to expand.</div>

        {sec.items.map((item, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <button
              onClick={() => setOi(oi === i ? null : i)}
              style={{ width: "100%", textAlign: "left", background: oi === i ? c.pillBg : c.fill, border: `1px solid ${oi === i ? `${c.pill}40` : c.bdr}`, borderRadius: oi === i ? "14px 14px 0 0" : 14, padding: "12px 14px", cursor: "pointer", fontFamily: "'Figtree',sans-serif", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: c.t1, lineHeight: 1.4 }}>{item.q}</span>
              <span style={{ fontSize: 16, color: c.t3, flexShrink: 0, transform: oi === i ? "rotate(45deg)" : "none", transition: "transform .2s" }}>+</span>
            </button>
            {oi === i && (
              <div style={{ padding: "12px 14px", background: c.card2, borderRadius: "0 0 14px 14px", border: `1px solid ${c.bdr}`, borderTop: "none" }}>
                <div style={{ fontSize: 12, color: c.t2, lineHeight: 1.7 }}>{item.a}</div>
              </div>
            )}
          </div>
        ))}

        <div style={{ marginTop: 16, padding: 14, background: c.pillBg, borderRadius: 14, border: `1px solid ${c.pill}30` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: c.pill, marginBottom: 4 }}>💡 Pro Tip</div>
          <div style={{ fontSize: 11, color: c.t2, lineHeight: 1.6 }}>
            {tab === "invest"
              ? "Experiment: change rate from 8% to 15% to see how 1% difference compounds over 10+ years!"
              : "Check ALL result tabs. Impact shows cost of impulse buying. Action Plan gives exact steps."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
