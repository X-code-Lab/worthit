const Card = ({ c, children, style = {}, glow }) => (
  <div
    style={{
      background: c.card,
      border: `1px solid ${c.bdr}`,
      borderRadius: 20,
      padding: 20,
      boxShadow: glow ? `0 0 40px ${c.accentBg}` : c.shadow,
      transition: "all .25s",
      ...style,
    }}
  >
    {children}
  </div>
);

export default Card;
