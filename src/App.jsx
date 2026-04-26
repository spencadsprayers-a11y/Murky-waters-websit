import { useState } from "react";

export default function App() {
  const [quantities, setQuantities] = useState({
    "Pineapple Dream": 0,
    "Tigernut Extract": 0,
    "Squid & Octopus": 0,
    "Bloodworm Extract": 0,
    "Pure Calanus Extract": 0,
    "Tutti Sweet Amino": 0,
    "Plum Sauce": 0,
    "Robin / Garlic": 0,
    "Maple Cream": 0,
    "Maple / Mulberry": 0,
    "Mulberry Zing": 0,
    "Strawberry Cream": 0,
    "Sweet Mango": 0,
    "Peach & Black Pepper": 0,
  });

  const [delivery, setDelivery] = useState(3);

  const updateQty = (item, change) => {
    setQuantities((prev) => ({
      ...prev,
      [item]: Math.max(0, prev[item] + change),
    }));
  };

  const products = Object.keys(quantities);
  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);

  const bundles = Math.floor(totalItems / 3);
  const remainder = totalItems % 3;

  const productTotal =
    totalItems >= 3 ? bundles * 20 + remainder * 8 : totalItems * 8;

  const total = productTotal + delivery;

  const selectedText = Object.entries(quantities)
    .filter(([_, qty]) => qty > 0)
    .map(([name, qty]) => `${name} x${qty}`)
    .join("\n");

  const message = `🔥 Murky Waters Order 🔥

${selectedText}

Items: ${totalItems}
Delivery: £${delivery}
Total: £${total}

Ready to order 👍`;

  const whatsappLink = `https://wa.me/447519223822?text=${encodeURIComponent(message)}`;

  const facebookPage = "https://www.facebook.com/share/18jdHNeNu4/";

  const messengerLink = `https://m.me/murkywaters?text=${encodeURIComponent(message)}`;

  return (
    <div className="bg-black text-white min-h-screen px-4 pb-40">

      {/* HEADER */}
      <section className="text-center py-10 bg-gradient-to-b from-pink-950/50 to-black rounded-b-3xl">
        <p className="text-pink-400 text-sm font-bold tracking-widest">
          MURKY WATERS
        </p>

        <h1 className="text-5xl font-black mt-2">Fishing Glooze</h1>

        <p className="text-gray-300 mt-3">
          Sticky. Strong. Irresistible.
        </p>

        <div className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-2xl font-black text-2xl mt-5 shadow-lg">
          🔥 3 FOR £20 🔥
        </div>

        <p className="text-gray-400 mt-2">or £8 each</p>

        <p className="text-green-400 text-sm mt-3 font-bold">
          Save £4 when you buy 3
        </p>

        <p className="text-red-400 text-sm mt-2">
          ⚡ Limited stock — popular flavours sell fast
        </p>

        <a
          href={facebookPage}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full max-w-md mx-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-center mt-5"
        >
          👍 Follow us on Facebook
        </a>
      </section>

      {/* SOCIAL PROOF */}
      <section className="mt-6 bg-zinc-950 border border-white/10 rounded-3xl p-5 text-center shadow-2xl">
        <h2 className="text-2xl font-black mb-3">Trusted by Anglers</h2>

        <p className="text-gray-300 mb-4">
          Built for anglers who want strong attraction and real results.
        </p>

        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="bg-black rounded-2xl p-4 border border-white/10">
            <p className="text-yellow-400 text-xl font-black">⭐️⭐️⭐️⭐️⭐️</p>
            <p className="mt-2 text-gray-300">Top feedback</p>
          </div>

          <div className="bg-black rounded-2xl p-4 border border-white/10">
            <p className="text-green-400 text-xl font-black">PVA</p>
            <p className="mt-2 text-gray-300">Friendly</p>
          </div>

          <div className="bg-black rounded-2xl p-4 border border-white/10">
            <p className="text-pink-400 text-xl font-black">UK</p>
            <p className="mt-2 text-gray-300">Angler made</p>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-zinc-950 border border-white/10 rounded-3xl p-4 mt-6">
        <h2 className="text-3xl font-black text-center mb-4">
          Build Your Order
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product} className="border rounded-2xl p-4 text-center">
              <div className="mb-2 font-bold">{product}</div>

              <div className="flex justify-center gap-3">
                <button onClick={() => updateQty(product, -1)}>-</button>
                <span>{quantities[product]}</span>
                <button onClick={() => updateQty(product, 1)}>+</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SUMMARY */}
      <section className="mt-6 text-center">
        <div className="text-2xl font-bold">Total: £{total}</div>
      </section>

      {/* BUTTONS */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-black border-t">

          <a
            href={whatsappLink}
            target="_blank"
            className="block bg-green-500 py-4 rounded-xl text-center font-bold mb-2"
          >
            💬 Order on WhatsApp
          </a>

          <a
            href={messengerLink}
            target="_blank"
            className="block bg-blue-500 py-4 rounded-xl text-center font-bold mb-2"
          >
            💬 Message on Facebook
          </a>

          <a
            href={facebookPage}
            target="_blank"
            className="block bg-gray-700 py-3 rounded-xl text-center"
          >
            👍 View Facebook Page
          </a>

        </div>
      )}
    </div>
  );
}
