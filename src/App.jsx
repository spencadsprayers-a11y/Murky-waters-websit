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
    <div className="bg-black text-white min-h-screen text-center px-4 pb-28">
      <section className="py-12 bg-gradient-to-b from-pink-950/40 to-black rounded-b-3xl">
        <p className="text-pink-400 font-bold tracking-widest text-sm mb-3">
          MURKY WATERS
        </p>
        <h1 className="text-5xl font-black mb-2">Fishing Glooze</h1>
        <p className="text-xl text-gray-300 mb-6">
          Sticky. Strong. Irresistible.
        </p>

        <div className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-2xl font-black text-3xl shadow-lg mb-5">
          🔥 3 FOR £20 🔥
        </div>

        <p className="text-gray-300 mb-6">Mix & Match Any Flavours</p>

        <a
          href="https://facebook.com/murkywaters"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-pink-500 px-8 py-4 rounded-2xl inline-block font-black text-lg shadow-lg shadow-pink-500/30"
        >
          Message to Order
        </a>
      </section>

      <section className="py-12">
        <h2 className="text-4xl font-black mb-6">Full Product Range</h2>

        <img
          src="/images/Product-range.png"
          alt="Murky Waters Fishing Glooze range"
          className="mx-auto rounded-2xl shadow-2xl w-full max-w-5xl border border-white/10"
        />
      </section>

      <section className="bg-zinc-950 border border-white/10 rounded-3xl p-5 max-w-2xl mx-auto shadow-2xl">
        <h2 className="text-4xl font-black mb-3">
          Build Your Bundle
        </h2>
        <p className="text-gray-300 mb-8">
          Select exactly 3 flavours for your £20 mix & match deal.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {flavours.map((flavour) => {
            const active = selected.includes(flavour);

            return (
              <button
                key={flavour}
                onClick={() => toggleFlavour(flavour)}
                className={`p-5 rounded-2xl border text-lg font-black transition ${
                  active
                    ? "bg-pink-500 border-pink-400 scale-105 shadow-lg shadow-pink-500/30"
                    : "bg-black border-white/20 hover:border-pink-500"
                }`}
              >
                {flavour}
              </button>
            );
          })}
        </div>

        <div className="mt-8 bg-black rounded-2xl p-5 border border-white/10">
          <p className="text-xl font-black">
            Selected: {selected.length}/3
          </p>

          {selected.length > 0 ? (
            <p className="mt-3 text-yellow-400 font-bold">
              {selected.join(" • ")}
            </p>
          ) : (
            <p className="mt-3 text-gray-500">
              Choose your flavours above.
            </p>
          )}
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-black mb-4">Why Anglers Choose It</h2>

        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {["PVA Friendly", "Easy To Use", "Boosts Any Bait", "All Year Round"].map((item) => (
            <div
              key={item}
              className="bg-zinc-950 border border-white/10 rounded-2xl p-5 font-bold"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-white/10 p-4">
        <a
          href={orderLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`block w-full max-w-md mx-auto px-8 py-4 rounded-2xl font-black text-lg shadow-lg ${
            selected.length === 3
              ? "bg-pink-500 shadow-pink-500/30"
              : "bg-gray-700"
          }`}
        >
          {selected.length === 3
            ? "🔥 Order My 3 For £20"
            : `Select ${3 - selected.length} More`}
        </a>
      </div>
    </div>
  );
}
