import { useState } from "react";

export default function App() {
  const [selected, setSelected] = useState([]);

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

  const toggleFlavour = (flavour) => {
    if (selected.includes(flavour)) {
      setSelected(selected.filter((f) => f !== flavour));
    } else if (selected.length < 3) {
      setSelected([...selected, flavour]);
    }
  };

  const orderMessage =
    selected.length > 0
      ? `Hi, I would like to order: ${selected.join(", ")}`
      : "Hi, I would like to order Fishing Glooze";

  const orderLink = `https://m.me/murkywaters?text=${encodeURIComponent(
    orderMessage
  )}`;

  return (
    <div className="bg-black text-white min-h-screen text-center px-4 py-8">

      {/* HEADER */}
      <h1 className="text-5xl font-bold mb-2">Murky Waters</h1>
      <h2 className="text-3xl text-pink-500 mb-4">Fishing Glooze</h2>
      <p className="text-lg mb-4">Sticky. Strong. Irresistible.</p>

      <h3 className="text-4xl text-yellow-400 font-bold mb-2">
        🔥 3 FOR £20 🔥
      </h3>
      <p className="text-lg mb-6">Mix & Match Any Flavours</p>

      <a
        href="https://facebook.com/murkywaters"
        target="_blank"
        className="bg-pink-500 px-8 py-4 rounded-xl inline-block mb-12 font-bold text-lg shadow-lg"
      >
        Message to Order
      </a>

      {/* IMAGE */}
      <h2 className="text-4xl font-bold mb-6">Full Product Range</h2>

      <img
        src="/images/Product-range.png"
        alt="Murky Waters range"
        className="mx-auto mb-16 rounded-xl shadow-lg w-full max-w-5xl"
      />

      {/* BUILDER */}
      <h2 className="text-4xl font-bold mb-2">
        Build Your 3 For £20 Bundle
      </h2>
      <p className="text-lg mb-6">
        Select up to 3 flavours, then press order.
      </p>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {flavours.map((flavour) => (
          <button
            key={flavour}
            onClick={() => toggleFlavour(flavour)}
            className={`p-5 rounded-xl border text-lg font-bold transition ${
              selected.includes(flavour)
                ? "bg-pink-500 border-pink-500 scale-105"
                : "bg-black border-gray-600"
            }`}
          >
            {flavour}
          </button>
        ))}
      </div>

      {/* SELECTED */}
      <p className="mt-6 text-xl font-bold">
        Selected: {selected.length}/3
      </p>

      {selected.length > 0 && (
        <p className="mt-3 text-yellow-400 font-semibold">
          {selected.join(" • ")}
        </p>
      )}

      {/* ORDER BUTTON */}
      <a
        href={orderLink}
        target="_blank"
        className="bg-pink-500 px-10 py-4 rounded-xl inline-block mt-8 font-bold text-lg shadow-lg"
      >
        {selected.length === 3
          ? "🔥 Order My Bundle"
          : "Message to Order"}
      </a>

    </div>
  );
}
