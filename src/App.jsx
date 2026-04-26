import { useState } from "react";

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

  const toggleFlavour = (flavour) => {
    if (selected.includes(flavour)) {
      setSelected(selected.filter((f) => f !== flavour));
    } else if (selected.length < 3) {
      setSelected([...selected, flavour]);
    }
  };

  const orderMessage =
    selected.length === 3
      ? `Hi, I would like to order the 3 for £20 bundle: ${selected.join(", ")} please.`
      : "Hi, I would like to order Fishing Glooze please.";

  const orderLink = `https://m.me/murkywaters?text=${encodeURIComponent(orderMessage)}`;

  return (
    <div className="bg-black text-white min-h-screen text-center px-4 py-8">
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
        rel="noopener noreferrer"
        className="bg-pink-500 px-8 py-4 rounded-xl inline-block mb-12 font-bold text-lg shadow-lg"
      >
        Message to Order
      </a>

      <h2 className="text-4xl font-bold mb-6">Full Product Range</h2>

      <img
        src="/images/Product-range.png"
        alt="Murky Waters Fishing Glooze range"
        className="mx-auto mb-16 rounded-xl shadow-lg w-full max-w-5xl"
      />

      <h2 className="text-4xl font-bold mb-3">
        Build Your 3 For £20 Bundle
      </h2>
      <p className="text-lg mb-8 text-gray-300">
        Select exactly 3 flavours, then press order.
      </p>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {flavours.map((flavour) => {
          const active = selected.includes(flavour);

          return (
            <button
              key={flavour}
              onClick={() => toggleFlavour(flavour)}
              className={`p-5 rounded-xl border text-lg font-bold transition ${
                active
                  ? "bg-pink-500 border-pink-500 scale-105"
                  : "bg-black border-gray-600 hover:border-pink-500"
              }`}
            >
              {flavour}
            </button>
          );
        })}
      </div>

      <p className="mt-8 text-xl font-bold">
        Selected: {selected.length}/3
      </p>

      {selected.length > 0 && (
        <p className="mt-3 text-yellow-400 font-semibold">
          {selected.join(" • ")}
        </p>
      )}

      <a
        href={orderLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`px-10 py-4 rounded-xl inline-block mt-8 font-bold text-lg shadow-lg transition ${
          selected.length === 3
            ? "bg-pink-500 hover:bg-pink-600"
            : "bg-gray-600 cursor-not-allowed"
        }`}
      >
        {selected.length === 3
          ? "🔥 Order My Bundle"
          : "Select 3 Flavours"}
      </a>
    </div>
  );
}
