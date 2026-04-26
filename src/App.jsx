import React, { useState } from "react";

const FACEBOOK_PAGE = "https://facebook.com/murkywaters";

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
  "Strawberry Cream",
];

export default function App() {
  const [selected, setSelected] = useState([]);

  function toggleFlavour(flavour) {
    if (selected.includes(flavour)) {
      setSelected(selected.filter((f) => f !== flavour));
    } else if (selected.length < 3) {
      setSelected([...selected, flavour]);
    }
  }

  const message =
    selected.length === 3
      ? `Hi, I would like to order 3 for £20: ${selected.join(", ")} please.`
      : "Hi, I would like to order Fishing Glooze please.";

  const orderLink = `https://m.me/murkywaters?text=${encodeURIComponent(message)}`;

  return (
    <div style={{ background: "#050505", color: "white", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>

      {/* HERO */}
      <section style={{
        padding: "65px 20px",
        textAlign: "center",
        background: "radial-gradient(circle at top, #4a0b2f, #050505 60%)"
      }}>
        <h1 style={{ fontSize: "48px", margin: 0, fontWeight: "900" }}>Murky Waters</h1>
        <h2 style={{ color: "#ff3b7a", fontSize: "32px" }}>Fishing Glooze</h2>
        <p style={{ fontSize: "22px" }}>Sticky. Strong. Irresistible.</p>

        <h2 style={{ color: "#ffd400", fontSize: "38px" }}>
          🔥 3 FOR £20 🔥
        </h2>

        <p>Mix & Match Any Flavours</p>

        <a href={FACEBOOK_PAGE} style={buttonStyle}>
          Message to Order
        </a>
      </section>

      {/* PRODUCT IMAGE */}
      <section style={{ padding: "45px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "36px" }}>Full Product Range</h2>

        <img
          src="/images/product-range.png"
          alt="Murky Waters Fishing Glooze range"
          style={{
            width: "100%",
            maxWidth: "1000px",
            borderRadius: "22px",
            boxShadow: "0 0 45px rgba(255, 59, 122, 0.25)",
            border: "1px solid #333"
          }}
        />

        <br />

        <a href={orderLink} style={buttonStyle}>
          Order Now
        </a>
      </section>

      {/* BUNDLE BUILDER */}
      <section style={{ padding: "45px 20px", background: "#111", textAlign: "center" }}>
        <h2 style={{ fontSize: "34px" }}>Build Your 3 For £20 Bundle</h2>
        <p style={{ color: "#ccc" }}>Select up to 3 flavours, then press order.</p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "14px",
          maxWidth: "950px",
          margin: "30px auto"
        }}>
          {flavours.map((flavour) => {
            const active = selected.includes(flavour);
            return (
              <button
                key={flavour}
                onClick={() => toggleFlavour(flavour)}
                style={{
                  padding: "16px",
                  borderRadius: "14px",
                  border: active ? "2px solid #ff3b7a" : "1px solid #333",
                  background: active ? "#ff3b7a" : "#050505",
                  color: "white",
                  fontWeight: "900",
                  cursor: "pointer"
                }}
              >
                {flavour}
              </button>
            );
          })}
        </div>

        <p style={{ fontSize: "18px" }}>
          Selected: <strong>{selected.length}/3</strong>
        </p>

        {selected.length > 0 && (
          <p style={{ color: "#ffd400" }}>
            {selected.join(" • ")}
          </p>
        )}

        <a href={orderLink} style={buttonStyle}>
          {selected.length === 3 ? "Order My 3 For £20" : "Message to Order"}
        </a>
      </section>

      {/* WHY */}
      <section style={{ padding: "45px 20px", textAlign: "center" }}>
        <h2>Why Choose Fishing Glooze?</h2>
        <p style={{ color: "#ccc", lineHeight: "1.8" }}>
          PVA Friendly • Easy to Use • Boosts Any Bait • All Year Round
        </p>
      </section>

      {/* CTA */}
      <section style={{ padding: "55px 20px", background: "#111", textAlign: "center" }}>
        <h2 style={{ fontSize: "34px" }}>Ready To Catch More?</h2>
        <p>Message Murky Waters on Facebook to order today.</p>

        <a href={FACEBOOK_PAGE} style={buttonStyle}>
          Message on Facebook
        </a>
      </section>

    </div>
  );
}

const buttonStyle = {
  display: "inline-block",
  marginTop: "18px",
  background: "#ff3b7a",
  color: "white",
  padding: "16px 26px",
  borderRadius: "14px",
  textDecoration: "none",
  fontWeight: "900",
};
