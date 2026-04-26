            
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
      <section style={{ padding: "70px 20px", textAlign: "center", background: "radial-gradient(circle at top, #3b0a24, #050505 55%)" }}>
        <h1 style={{ fontSize: 54, margin: 0, textTransform: "uppercase" }}>Murky Waters</h1>
        <h2 style={{ fontSize: 42, margin: "10px 0", color: "#ff3b7a" }}>Fishing Glooze</h2>
        <p style={{ fontSize: 24, fontWeight: "bold" }}>Sticky. Strong. Irresistible.</p>
        <div style={{ fontSize: 44, color: "#ffd400", fontWeight: "900", marginTop: 25 }}>3 FOR £20</div>
        <p style={{ fontSize: 20 }}>Mix & Match Any Flavours</p>
        <a href="https://www.facebook.com/" style={{ display: "inline-block", marginTop: 25, background: "#ff3b7a", color: "white", padding: "16px 28px", borderRadius: 14, textDecoration: "none", fontWeight: "900" }}>
          Message on Facebook to Order
        </a>
      </section>

      <section style={{ padding: "45px 20px", background: "#111" }}>
        <h2 style={{ textAlign: "center", fontSize: 34 }}>Built for More Takes</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, maxWidth: 1000, margin: "30px auto" }}>
          {["PVA Friendly", "Easy to Use", "Boosts Any Bait", "All Year Round"].map((b) => (
            <div key={b} style={{ background: "#050505", border: "1px solid #333", padding: 22, borderRadius: 18, textAlign: "center" }}>
              <h3 style={{ color: "#ff3b7a", marginTop: 0 }}>{b}</h3>
              <p style={{ color: "#bbb" }}>Designed to give your bait extra pulling power.</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "55px 20px" }}>
        <h2 style={{ textAlign: "center", fontSize: 36 }}>12 Powerful Flavours</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 24, maxWidth: 1200, margin: "35px auto" }}>
          {flavours.map(([name, color, emoji]) => (
            <div key={name} style={{ background: "#0b0b0b", border: "1px solid #333", borderRadius: 24, padding: 18, textAlign: "center", boxShadow: `0 0 22px ${color}44` }}>
              <div style={{ margin: "0 auto", width: 105, height: 210, borderRadius: "35px 35px 28px 28px", background: "linear-gradient(#111,#000)", border: "3px solid #222", position: "relative", boxShadow: "inset 0 0 18px #555" }}>
                <div style={{ position: "absolute", top: -35, left: 33, width: 40, height: 42, background: "#111", borderRadius: "12px 12px 4px 4px", border: "2px solid #444" }} />
                <div style={{ position: "absolute", top: 35, left: 10, right: 10, bottom: 18, borderRadius: 16, background: "#050505", border: `2px solid ${color}` }}>
                  <div style={{ color: "white", fontWeight: "900", fontSize: 12, marginTop: 12 }}>Murky Waters</div>
                  <div style={{ color: "white", fontWeight: "900", fontSize: 20, marginTop: 12, lineHeight: 1 }}>FISHING<br />GLOOZE</div>
                  <div style={{ fontSize: 34, marginTop: 10 }}>{emoji}</div>
                  <div style={{ color, fontWeight: "900", fontSize: 13, padding: "0 5px" }}>{name}</div>
                </div>
              </div>
              <h3 style={{ color, marginBottom: 5 }}>{name}</h3>
              <p style={{ color: "#aaa", marginTop: 0 }}>120ml screw cap spout</p>
              <p style={{ fontSize: 13, color: "#ddd", border: "1px solid #555", display: "inline-block", padding: "6px 10px", borderRadius: 999 }}>PVA Friendly</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "60px 20px", background: "#111", textAlign: "center" }}>
        <h2 style={{ fontSize: 38 }}>Ready to Order?</h2>
        <p style={{ fontSize: 20 }}>Pick any 3 flavours for £20.</p>
        <p style={{ color: "#bbb" }}>Message Murky Waters on Facebook to order.</p>
        <a href="https://www.facebook.com/" style={{ display: "inline-block", marginTop: 20, background: "#ff3b7a", color: "white", padding: "16px 28px", borderRadius: 14, textDecoration: "none", fontWeight: "900" }}>
          Message to Order
        </a>
      </section>
    </div>
  );
}

