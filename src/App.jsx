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

  const addFlavour = (flavour) => {
    if (selected.length < 3) {
      setSelected([...selected, flavour]);
    }
  };

  const removeFlavour = (flavour) => {
    const index = selected.indexOf(flavour);
    if (index > -1) {
      const newArr = [...selected];
      newArr.splice(index, 1);
      setSelected(newArr);
    }
  };

  const countFlavour = (flavour) =>
    selected.filter((f) => f === flavour).length;

  const orderMessage =
    selected.length === 3
      ? `Hi, I want the 3 for £20 bundle: ${selected.join(", ")}`
      : `Hi, I’m interested in Fishing Glooze`;

  const orderLink = `https://m.me/YOURPAGE?text=${encodeURIComponent(orderMessage)}`;

  return (
    <div className="bg-black text-white min-h-screen text-center px-4 pb-28">

      <section className="py-12 bg-gradient-to-b from-pink-950/40 to-black rounded-b-3xl">
        <h1 className="text-5xl font-black mb-2">Fishing Glooze</h1>
        <p className="text-gray-300 mb-4">Sticky. Strong. Irresistible.</p>

        <div className="bg-yellow-400 text-black px-6 py-3 rounded-2xl font-black text-3xl mb-3 inline-block">
          🔥 3 FOR £20 🔥
        </div>

        <p className="text-red-400 font-bold mb-4">
          ⚠️ Limited stock – selling fast
        </p>
      </section>

      <section className="py-10">
        <img
          src="/images/Product-range.png"
          alt="range"
          className="mx-auto w-full max-w-5xl rounded-xl"
        />
      </section>

      <section className="bg-zinc-950 p-5 rounded-2xl max-w-2xl mx-auto">
        <h2 className="text-3xl font-black mb-2">Build Your Bundle</h2>
        <p className="mb-6 text-gray-400">Tap to add, tap - to remove</p>

        <div className="grid grid-cols-2 gap-4">
          {flavours.map((flavour) => {
            const count = countFlavour(flavour);

            return (
              <div
                key={flavour}
                className="border border-gray-600 rounded-xl p-3"
              >
                <p className="font-bold mb-2">{flavour}</p>

                <div className="flex justify-center items-center gap-3">
                  <button
                    onClick={() => removeFlavour(flavour)}
                    className="bg-gray-700 px-3 py-1 rounded"
                  >
                    -
                  </button>

                  <span className="text-lg font-bold">{count}</span>

                  <button
                    onClick={() => addFlavour(flavour)}
                    className="bg-pink-500 px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 font-bold">
          Total selected: {selected.length}/3
        </p>

        {selected.length > 0 && (
          <p className="text-yellow-400 mt-2">
            {selected.join(" • ")}
          </p>
        )}
      </section>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black border-t border-gray-700">
        <a
          href={orderLink}
          className={`block text-center py-4 rounded-xl font-bold ${
            selected.length === 3
              ? "bg-pink-500"
              : "bg-gray-600"
          }`}
        >
          {selected.length === 3
            ? "🔥 Order Now"
            : `Select ${3 - selected.length} more`}
        </a>
      </div>
    </div>
  );
}
