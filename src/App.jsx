
import React from "react";

const flavours = [
  "Pineapple Dream",
  "Tigernut Extract",
  "Squid & Octopus",
  "Bloodworm Extract",
  "Pure Calanus Extract",
  "Tutti Sweet Amino",
  "Plum Sauce",
  "Robin / Garlic",
  "Maple Cream",
  "Maple / Mulberry",
  "Mulberry Zing",
  "Sweet Mango",
];

export default function App() {
  return (
    <div style={{ background: "#050505", color: "white", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", margin: 0 }}>Murky Waters</h1>
        <h2 style={{ fontSize: "34px", color: "#ff3b7a", marginTop: "10px" }}>Fishing Glooze</h2>
        <p style={{ fontSize: "22px", marginTop: "20px" }}>Sticky. Strong. Irresistible.</p>
        <p style={{ fontSize: "30px", color: "#ffd400", fontWeight: "bold" }}>🔥 3 FOR £20 🔥</p>
        <p>Mix & Match Any Flavours</p>
        <a
          href="https://www.facebook.com/"
          style={{
            display: "inline-block",
            marginTop: "25px",
            background: "#ff3b7a",
            color: "white",
            padding: "15px 25px",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Message on Facebook to Order
        </a>
      </section>

      <section style={{ padding: "30px 20px", background: "#111" }}>
        <h2 style={{ textAlign: "center", fontSize: "32px" }}>Why Choose Fishing Glooze?</h2>
        <div style={{ display: "grid", gap: "15px", maxWidth: "900px", margin: "30px auto" }}>
          {["PVA Friendly", "Easy to Use", "Boosts Any Bait", "All Year Round"].map((item) => (
            <div key={item} style={{ background: "#000", padding: "20px", borderRadius: "14px", border: "1px solid #333" }}>
              <h3 style={{ color: "#ff3b7a" }}>{item}</h3>
              <p>Designed to help trigger more takes and give your bait extra pulling power.</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "40px 20px" }}>
        <h2 style={{ textAlign: "center", fontSize: "32px" }}>Available Flavours</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "15px", maxWidth: "1000px", margin: "30px auto" }}>
          {flavours.map((flavour) => (
            <div key={flavour} style={{ background: "#111", padding: "20px", borderRadius: "14px", border: "1px solid #333", textAlign: "center" }}>
              <strong>{flavour}</strong>
              <p style={{ color: "#aaa" }}>120ml Bottle</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "50px 20px", textAlign: "center", background: "#111" }}>
        <h2>Order Now</h2>
        <p>Choose any 3 flavours for £20.</p>
        <p>Message Murky Waters on Facebook to order.</p>
      </section>
    </div>
  );
}
