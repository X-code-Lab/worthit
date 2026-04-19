const Badge = ({ color, children }) => (
  <span style={{ padding: "3px 10px", borderRadius: 20, background: `${color}18`, color, fontSize: 10, fontWeight: 700 }}>
    {children}
  </span>
);

export default Badge;
