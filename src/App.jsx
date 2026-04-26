import React from "react";

const FACEBOOK_PAGE = "https://facebook.com/murkywaters";

function orderLink() {
  return `https://m.me/murkywaters?text=${encodeURIComponent(
    `Hi, I would like to order Fishing Glooze please.`
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

      {/* HERO */}
      <section style={{
        padding: "60px 20px",
        textAlign: "center",
        background: "radial-gradient(circle at top, #3b0a24, #050505 60%)"
      }}>
        <h1 style={{ fontSize: "42px", margin: 0 }}>Murky Waters</h1>
        <h2 style={{ color: "#ff3b7a", fontSize: "28px" }}>Fishing Glooze</h2>
        <p style={{ fontSize: "20px" }}>Sticky. Strong. Irresistible.</p>

        <h2 style={{ color: "#ffd400", fontSize: "32px" }}>
          🔥 3 FOR £20 🔥
        </h2>

        <p>Mix & Match Any Flavours</p>

        <a href={FACEBOOK_PAGE} style={buttonStyle}>
          Message to Order
        </a>
      </section>

      {/* PRODUCT IMAGE SECTION */}
      <section style={{ padding: "50px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "34px", marginBottom: "25px" }}>
          Our Full Range
        </h2>

        <img
          src="/images/product-range.png"
          alt="Fishing Glooze Range"
          style={{
            width: "100%",
            maxWidth: "900px",
            borderRadius: "20px",
            boxShadow: "0 0 40px rgba(255,255,255,0.1)"
          }}
        />

        <br />

        <a href={orderLink()} style={buttonStyle}>
          Order Now
        </a>
      </section>

      {/* WHY SECTION */}
      <section style={{
        padding: "40px 20px",
        background: "#111",
        textAlign: "center"
      }}>
        <h2>Why Choose Fishing Glooze?</h2>
        <p>
          PVA Friendly • Easy to Use • Boosts Any Bait • All Year Round
        </p>
      </section>

      {/* FINAL CTA */}
      <section style={{
        padding: "55px 20px",
        textAlign: "center"
      }}>
        <h2 style={{ fontSize: "34px" }}>3 For £20</h2>
        <p>Message us on Facebook to order.</p>

        <a href={FACEBOOK_PAGE} style={buttonStyle}>
          Message on Facebook
        </a>
      </section>

    </div>
  );
}
