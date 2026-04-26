import React from "react";

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
  ["Sweet Mango", "#ff9f1c", "🥭"],
];

export default function App() {
  return (
    <div style={{ background: "#050505", color: "white", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>

      {/* HERO */}
      <section style={{ padding: "70px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: 50 }}>Murky Waters</h1>
        <h2 style={{ color: "#ff3b7a" }}>Fishing Glooze</h2>
        <p>Sticky. Strong. Irresistible.</p>
        <h2 style={{ color: "#ffd400" }}>🔥 3 FOR £20 🔥</h2>
        <p>Mix & Match Any Flavours</p>
        <a href="https://www.facebook.com/" style={{ background: "#ff3b7a", padding: 15, borderRadius: 10, color: "white", textDecoration: "none", fontWeight: "bold" }}>
          Message to Order
        </a>
      </section>

      {/* FLAVOURS */}
      <section style={{ padding: 20 }}>
        <h2 style={{ textAlign: "center" }}>Flavours</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 20
        }}>

          {flavours.map(([name, color, emoji]) => (
            <div key={name} style={{
              background: "#111",
              borderRadius: 20,
              padding: 20,
              textAlign: "center",
              boxShadow: `0 0 20px ${color}55`
            }}>

              <div style={{
                margin: "0 auto",
                width: 100,
                height: 200,
                borderRadius: 30,
                background: "#000",
                border: "2px solid #333",
                position: "relative"
              }}>

                <div style={{
                  position: "absolute",
                  top: -25,
                  left: 30,
                  width: 40,
                  height: 35,
                  background: "#111",
                  borderRadius: 8
                }} />

                <div style={{
                  position: "absolute",
                  top: 30,
                  left: 10,
                  right: 10,
                  bottom: 10,
                  borderRadius: 10,
                  border: `2px solid ${color}`,
                  textAlign: "center",
                  padding: 5
                }}>
                  <div style={{ fontSize: 10 }}>Murky Waters</div>
                  <div style={{ fontWeight: "bold", fontSize: 16 }}>FISHING GLOOZE</div>
                  <div style={{ fontSize: 30 }}>{emoji}</div>
                  <div style={{ fontSize: 11, color, lineHeight: "1.2" }}>{name}</div>
                </div>

              </div>

              <h3 style={{ color }}>{name}</h3>
              <p>120ml screw cap spout</p>
              <p style={{ fontSize: 12 }}>PVA Friendly</p>

            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: "center", padding: 40 }}>
        <h2>Order Now</h2>
        <p>3 for £20 — message on Facebook</p>
      </section>

    </div>
  );
}
