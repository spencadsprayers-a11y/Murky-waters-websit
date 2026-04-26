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

  return (
    <div className="bg-black text-white min-h-screen text-center p-6">
      
      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-2">Murky Waters</h1>
      <h2 className="text-2xl text-pink-500 mb-4">Fishing Glooze</h2>
      <p className="mb-4">Sticky. Strong. Irresistible.</p>

      <h3 className="text-3xl text-yellow-400 mb-2">
        🔥 3 FOR £20 🔥
      </h3>
      <p className="mb-6">Mix & Match Any Flavours</p>

      <a
        href="https://facebook.com/murkywaters"
        target="_blank"
        className="bg-pink-500 px-6 py-3 rounded-lg inline-block mb-10"
      >
        Message to Order
      </a>

      {/* FULL RANGE IMAGE */}
      <h2 className="text-3xl font-bold mb-4">Full Product Range</h2>

      <img
        src="/images/Product-range.png"
        alt="Murky Waters Fishing Glooze range"
        className="mx-auto mb-10 rounded-xl shadow-lg"
      />

      {/* BUNDLE BUILDER */}
      <h2 className="text-3xl font-bold mb-2">
        Build Your 3 For £20 Bundle
      </h2>
      <p className="mb-6">
        Select up to 3 flavours, then press order.
      </p>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {flavours.map((flavour) => (
          <button
            key={flavour}
            onClick={() => toggleFlavour(flavour)}
            className={`p-4 rounded-lg border ${
              selected.includes(flavour)
                ? "bg-pink-500"
                : "bg-black border-gray-500"
            }`}
          >
            {flavour}
          </button>
        ))}
      </div>

      <p className="mt-6">Selected: {selected.length}/3</p>

      {/* ORDER BUTTON */}
      <a
        href={`https://facebook.com/murkywaters`}
        target="_blank"
        className="bg-pink-500 px-6 py-3 rounded-lg inline-block mt-6"
      >
        Order Now
      </a>
    </div>
  );
}
