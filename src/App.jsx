import React from "react";

const FACEBOOK_PAGE = "https://facebook.com/murkywaters";

const flavours = [
  ["Pineapple Dream", "#ffd400", "🍍"],
  ["Tigernut Extract", "#d8842f", "🥜"],
  ["Squid & Octopus", "#a855f7", "🦑"],
  ["Bloodworm Extract", "#ef233c", "🪱"],
  ["Pure Calanus Extract", "#2f8cff", "🦐"],
  ["Tutti Sweet Amino", "#ff4fa3", "🍬"],
  ["Plum Sauce", "#8b3fd1", "🍇"],
  ["Robin / Garlic", "#c43b8d", "🧄"],
  ["Maple Cream", "#d8ad70", "🍁"],
  ["Maple / Mulberry", "#7c3aed", "🍇"],
  ["Mulberry Zing", "#d12aa0", "🫐"],
  ["Strawberry Cream", "#ff4b5c", "🍓"],
];

function orderLink(flavour) {
  return `https://m.me/murkywaters?text=${encodeURIComponent(
    `Hi, I would like to order ${flavour} Fishing Glooze please.`
  )}`;
}

const buttonStyle = {
  display: "inline-block",
  marginTop: "18px",
  background: "#ff3b7a",
  color: "white",
  padding: "15px 24px",
  borderRadius: "14px",
  textDecoration: "none",
  fontWeight: "900",
};

export default function App() {
  return (
    <div style={{ background: "#050505", color: "white", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>

      <section style={{ padding: "55px 20px", textAlign: "center", background: "radial-gradient(circle at top, #3b0a24, #050505 60%)" }}>
        <h1 style={{ fontSize: "42px", margin: 0 }}>Murky Waters</h1>
        <h2 style={{ color: "#ff3b7a", fontSize: "28px" }}>Fishing Glooze</h2>
        <p style={{ fontSize: "20px" }}>Sticky. Strong. Irresistible.</p>
        <h2 style={{ color: "#ffd400", fontSize: "32px" }}>🔥 3 FOR £20 🔥</h2>
        <p>Mix & Match Any Flavours</p>
        <a href={FACEBOOK_PAGE} style={buttonStyle}>Message to Order</a>
      </section>

      <section style={{ padding: "35px 20px", background: "#111", textAlign: "center" }}>
        <h2>Why Choose Fishing Glooze?</h2>
        <p>PVA Friendly • Easy to Use • Boosts Any Bait • All Year Round</p>
      </section>

      <section style={{ padding: "40px 20px" }}>
        <h2 style={{ textAlign: "center", fontSize: "34px" }}>Available Flavours</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "25px",
          maxWidth: "1200px",
          margin: "35px auto"
        }}>
          {flavours.map(([name, color, emoji]) => (
            <div key={name} style={{
              background: "#111",
              borderRadius: "24px",
              padding: "24px",
              textAlign: "center",
              boxShadow: `0 0 25px ${color}55`,
              border: `1px solid ${color}55`
            }}>

              <div style={{
                margin: "0 auto 22px auto",
                width: "90px",
                height: "190px",
                borderRadius: "30px",
                background: "linear-gradient(#161616,#000)",
                border: "3px solid #333",
                position: "relative",
                boxShadow: "inset 0 0 20px #555"
              }}>
                <div style={{
                  position: "absolute",
                  top: "-22px",
                  left: "26px",
                  width: "36px",
                  height: "36px",
                  background: "#111",
                  borderRadius: "9px",
                  border: "2px solid #444"
                }} />

                <div style={{
                  position: "absolute",
                  top: "30px",
                  left: "8px",
                  right: "8px",
                  bottom: "12px",
                  borderRadius: "13px",
                  border: `2px solid ${color}`,
                  padding: "7px 4px",
                  background: "#050505"
                }}>
                  <div style={{ fontSize: "9px", fontWeight: "900" }}>Murky Waters</div>
                  <div style={{ fontSize: "16px", fontWeight: "900", marginTop: "6px", lineHeight: "1" }}>
                    FISHING<br />GLOOZE
                  </div>
                  <div style={{ fontSize: "30px", marginTop: "10px" }}>{emoji}</div>
                  <div style={{ color, fontWeight: "900", fontSize: "11px", lineHeight: "1.2", marginTop: "6px" }}>
                    {name}
                  </div>
                </div>
              </div>

              <h3 style={{ color, fontSize: "25px", margin: "8px 0 5px" }}>{name}</h3>
              <p style={{ color: "#ccc", marginTop: 0 }}>120ml screw cap spout</p>
              <p style={{ color: "#aaa" }}>PVA Friendly bait liquid</p>

              <a href={orderLink(name)} style={{ ...buttonStyle, background: color, color: "#000" }}>
                Order This Flavour
              </a>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "55px 20px", textAlign: "center", background: "#111" }}>
        <h2 style={{ fontSize: "36px" }}>3 For £20</h2>
        <p>Mix & match any flavours.</p>
        <p>Message Murky Waters on Facebook to order.</p>
        <a href={FACEBOOK_PAGE} style={buttonStyle}>Message on Facebook</a>
      </section>

    </div>
  );
}
