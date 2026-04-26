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

export default function App() {
  return (
    <div style={{ background: "#050505", color: "white", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>

      <section style={{ padding: "70px 20px", textAlign: "center", background: "radial-gradient(circle at top, #3b0a24, #050505 60%)" }}>
        <h1 style={{ fontSize: "52px", margin: 0 }}>Murky Waters</h1>
        <h2 style={{ color: "#ff3b7a", fontSize: "30px" }}>Fishing Glooze</h2>
        <p style={{ fontSize: "22px" }}>Sticky. Strong. Irresistible.</p>
        <h2 style={{ color: "#ffd400", fontSize: "36px" }}>🔥 3 FOR £20 🔥</h2>
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
                margin: "0 auto",
                width: "120px",
                height: "245px",
                borderRadius: "38px",
                background: "linear-gradient(#161616,#000)",
                border: "3px solid #333",
                position: "relative",
                boxShadow: "inset 0 0 25px #555"
              }}>
                <div style={{
                  position: "absolute",
                  top: "-32px",
                  left: "39px",
                  width: "42px",
                  height: "42px",
                  background: "#111",
                  borderRadius: "10px",
                  border: "2px solid #444"
                }} />

                <div style={{
                  position: "absolute",
                  top: "38px",
                  left: "10px",
                  right: "10px",
                  bottom: "15px",
                  borderRadius: "15px",
                  border: `2px solid ${color}`,
                  padding: "8px 5px",
                  background: "#050505"
                }}>
                  <div style={{ fontSize: "11px", fontWeight: "900" }}>Murky Waters</div>
                  <div style={{ fontSize: "21px", fontWeight: "900", marginTop: "8px", lineHeight: "1" }}>
                    FISHING<br />GLOOZE
                  </div>
                  <div style={{ fontSize: "38px", marginTop: "12px" }}>{emoji}</div>
                  <div style={{ color, fontWeight: "900", fontSize: "13px", lineHeight: "1.2", marginTop: "8px" }}>
                    {name}
                  </div>
                  <div style={{ marginTop: "12px", fontSize: "10px", border: "1px solid white", borderRadius: "20px", padding: "4px" }}>
                    PVA FRIENDLY
                  </div>
                </div>
              </div>

              <h3 style={{ color, fontSize: "25px", marginBottom: "5px" }}>{name}</h3>
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
