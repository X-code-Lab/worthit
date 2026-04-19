const Gauge = ({ value, max, label, color, size = 105 }) => {
  const pct = Math.min(value / max, 1);
  const angle = pct * 180;
  const r = size / 2 - 8;
  const cx = size / 2;
  const cy = size / 2 + 4;
  const eX = cx + r * Math.cos(Math.PI - (angle * Math.PI) / 180);
  const eY = cy - r * Math.sin(Math.PI - (angle * Math.PI) / 180);

  return (
    <div style={{ textAlign: "center" }}>
      <svg width={size} height={size / 2 + 16} viewBox={`0 0 ${size} ${size / 2 + 16}`}>
        <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="rgba(128,128,128,.18)" strokeWidth="7" strokeLinecap="round" />
        {pct > 0 && (
          <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 ${angle > 180 ? 1 : 0} 1 ${eX} ${eY}`} fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" />
        )}
        <text x={cx} y={cy - 10} textAnchor="middle" fill={color} fontSize="16" fontWeight="800" fontFamily="'Figtree',sans-serif">
          {Math.round(value)}%
        </text>
        <text x={cx} y={cy + 5} textAnchor="middle" fill="gray" fontSize="8">
          {label}
        </text>
      </svg>
    </div>
  );
};

export default Gauge;
