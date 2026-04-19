const MBar = ({ c, value, max, color, h = 5 }) => (
  <div style={{ width: "100%", height: h, background: c.fill2, borderRadius: h / 2, overflow: "hidden" }}>
    <div style={{ width: `${Math.min((value / max) * 100, 100)}%`, height: "100%", background: color, borderRadius: h / 2, transition: "width .5s" }} />
  </div>
);

export default MBar;
