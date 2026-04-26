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

  const whatsappLink = `https://wa.me/447519223822?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="bg-black text-white min-h-screen p-4 pb-8">
      <h1 className="text-3xl font-bold text-center mb-2">
        Fishing Glooze
      </h1>

      <p className="text-center text-yellow-400 mb-6">
        🔥 3 FOR £20 or £8 each 🔥
      </p>

      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product}
            className="border border-gray-700 rounded-xl p-4 text-center"
          >
            <div className="mb-3 font-semibold">{product}</div>

            <div className="flex justify-center items-center gap-3">
              <button
                onClick={() => updateQty(product, -1)}
                className="bg-gray-700 px-3 py-1 rounded"
              >
                -
              </button>

              <span>{quantities[product]}</span>

              <button
                onClick={() => updateQty(product, 1)}
                className="bg-pink-500 px-3 py-1 rounded"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <label className="block mb-2 text-sm">Delivery</label>
        <select
          value={delivery}
          onChange={(e) => setDelivery(Number(e.target.value))}
          className="w-full p-3 rounded bg-black border border-gray-600"
        >
          <option value={3}>Standard £3</option>
          <option value={5}>Tracked £5</option>
        </select>
      </div>

      <div className="text-xl font-bold mt-4 text-center">
        Total: £{total}
      </div>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl text-lg mt-4 text-center"
      >
        Order via WhatsApp
      </a>
    </div>
  );
}
