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
  const [cart, setCart] = useState([]);

  const addFlavour = (flavour) => {
    setCart([...cart, flavour]);
  };

  const removeFlavour = (flavour) => {
    const index = cart.indexOf(flavour);
    if (index > -1) {
      const newArr = [...cart];
      newArr.splice(index, 1);
      setCart(newArr);
    }
  };

  const countFlavour = (flavour) =>
    cart.filter((f) => f === flavour).length;

  const total = cart.length;

  const price =
    total >= 3
      ? Math.floor(total / 3) * 20 + (total % 3) * 8
      : total * 8;

  const orderMessage =
    cart.length > 0
      ? `Hi, I’d like to order: ${cart.join(", ")} (Total £${price})`
      : "Hi, I’m interested in Fishing Glooze";

  const orderLink = `https://m.me/YOURPAGE?text=${encodeURIComponent(orderMessage)}`;

  return (
    <div className="bg-black text-white min-h-screen text-center px-4 pb-28">

      {/* HEADER */}
      <section className="py-12 bg-gradient-to-b from-pink-950/40 to-black rounded-b-3xl">
        <h1 className="text-5xl font-black mb-2">Fishing Glooze</h1>
        <p className="text-gray-300 mb-4">Sticky. Strong. Irresistible.</p>

        <div className="bg-yellow-400 text-black px-6 py-3 rounded-2xl font-black text-2xl mb-2 inline-block">
          🔥 3 FOR £20 🔥
        </div>

        <p className="text-gray-400">or £8 each</p>

        <p className="text-red-400 font-bold mt-3">
          ⚠️ Limited stock – selling fast
        </p>
      </section>

      {/* IMAGE */}
      <section className="py-10">
        <img
          src="/images/Product-range.png"
          alt="range"
          className="mx-auto w-full max-w-5xl rounded-xl"
        />
      </section>

      {/* SHOP */}
      <section className="bg-zinc-950 p-5 rounded-2xl max-w-2xl mx-auto">
        <h2 className="text-3xl font-black mb-2">Shop Now</h2>
        <p className="mb-6 text-gray-400">
          Add any flavours. Discount applies automatically.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {flavours.map((flavour) => {
            const count = countFlavour(flavour);

            return (
              <div key={flavour} className="border border-gray-600 rounded-xl p-3">
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

        <div className="mt-6 bg-black rounded-xl p-4 border border-white/10">
          <p className="font-bold">Items: {total}</p>

          <p className="text-yellow-400 text-xl font-bold mt-2">
            Total: £{price}
          </p>

          {total >= 3 && (
            <p className="text-green-400 text-sm mt-1">
              ✔ Bundle discount applied
            </p>
          )}
        </div>
      </section>

      {/* ORDER */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black border-t border-gray-700">
        <a
          href={orderLink}
          className={`block text-center py-4 rounded-xl font-bold ${
            total > 0 ? "bg-pink-500" : "bg-gray-600"
          }`}
        >
          {total > 0
            ? `🔥 Order Now (£${price})`
            : "Add items to order"}
        </a>
      </div>
    </div>
  );
}
