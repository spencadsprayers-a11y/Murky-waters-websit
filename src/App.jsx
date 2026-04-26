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
      ? `Hi, I would like to order these Fishing Glooze flavours: ${selected.join(
          ", "
        )} please.`
      : "Hi, I would like to order Fishing Glooze please.";

  const orderLink = `https://m.me/murkywaters?text=${encodeURIComponent(
    orderMessage
  )}`;

  return (
    <div className="bg-black text-white min-h-screen text-center p-6">
      <h1 className="text-5xl font-bold mb-2">Murky Waters</h1>
      <h2 className="text-3xl text-pink-500 mb-4">Fishing Glooze</h2>
      <p className="mb-4 text-xl">Sticky. Strong. Irresistible.</p>

      <h3 className="text-4xl text-yellow-400 mb-2 font-bold">
        🔥 3 FOR £20 🔥
      </h3>
      <p className="mb-6 text-lg">Mix & Match Any Flavours</p>

      <a
        href="https://facebook.com/murkywaters"
        target="_blank"
        className="bg-pink-500 px-8 py-4 rounded-xl inline-block mb-12 font-bold text-lg"
      >
        Message to Order
      </a>

      <h2 className="text-4xl font-bold mb-6">Full Product Range</h2>

      <img
        src="/images/Product-range.png"
        alt="Murky Waters Fishing Glooze range"
        className="mx-auto mb-14 rounded-xl shadow-lg w-full max-w-4xl"
      />

      <h2 className="text-4xl font-bold mb-2">
        Build Your 3 For £20 Bundle
      </h2>
      <p className="mb-6 text-lg">
        Select up to 3 flavours, then press order.
      </p>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {flavours.map((flavour) => (
          <button
            key={flavour}
            onClick={() => toggleFlavour(flavour)}
            className={`p-4 rounded-lg border font-bold ${
              selected.includes(flavour)
                ? "bg-pink-500 border-pink-500"
                : "bg-black border-gray-500"
            }`}
          >
            {flavour}
          </button>
        ))}
      </div>

      <p className="mt-6 text-xl">Selected: {selected.length}/3</p>

      {selected.length > 0 && (
        <p className="mt-3 text-yellow-400 font-bold">
          {selected.join(" • ")}
        </p>
      )}

      <a
        href={orderLink}
        target="_blank"
        className="bg-pink-500 px-8 py-4 rounded-xl inline-block mt-6 font-bold text-lg"
      >
        {selected.length === 3
          ? "Order My 3 For £20"
          : "Message to Order"}
      </a>
    </div>
  );
}
