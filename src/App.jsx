import { useState } from "react";

const products = [
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
  "Strawberry Cream"
];

export default function App() {
  const [cart, setCart] = useState(
    Object.fromEntries(products.map(p => [p, 0]))
  );

  const updateQty = (product, change) => {
    setCart(prev => ({
      ...prev,
      [product]: Math.max(0, prev[product] + change)
    }));
  };

  const items = Object.values(cart).reduce((a, b) => a + b, 0);

  // PRICING
  const bundles = Math.floor(items / 3);
  const remainder = items % 3;
  const productTotal = bundles * 20 + remainder * 8;

  // DELIVERY
  const deliveryCost = items === 0 ? 0 : items >= 4 ? 0 : 3;
  const total = productTotal + deliveryCost;

  // ORDER TEXT
  const orderItems = Object.entries(cart)
    .filter(([_, qty]) => qty > 0)
    .map(([name, qty]) => `${name} x${qty}`)
    .join(", ");

  const facebookLink = `https://m.me/YOURFACEBOOK?text=Hi, I’d like to order: ${encodeURIComponent(orderItems)} (Total £${total})`;

  return (
    <div className="bg-black text-white min-h-screen p-4 max-w-xl mx-auto pb-32">

      {/* HEADER */}
      <h1 className="text-4xl font-black py-4 text-center">
        Fishing Glooze
      </h1>

      <p className="text-center text-gray-300">
        Sticky. Strong. Irresistible.
      </p>

      <p className="text-center text-yellow-400 font-bold text-xl mt-2">
        🔥 3 FOR £20 or £8 each 🔥
      </p>

      <p className="text-center text-sm text-gray-400 mb-6">
        Mix & match any flavours
      </p>

      {/* IMAGE */}
      <img
        src="/images/Product-range.png"
        alt="range"
        className="mx-auto mb-6 rounded-2xl shadow-lg"
      />

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 gap-3">
        {products.map(product => (
          <div
            key={product}
            className="border border-gray-700 rounded-2xl p-3 text-center"
          >
            <p className="mb-2 text-sm font-semibold">{product}</p>

            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => updateQty(product, -1)}
                className="bg-gray-700 px-3 py-1 rounded-lg"
              >
                -
              </button>

              <span className="w-6">{cart[product]}</span>

              <button
                onClick={() => updateQty(product, 1)}
                className="bg-pink-500 px-3 py-1 rounded-lg"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      {items > 0 && (
        <div className="mt-6 text-center">

          <p className="text-sm text-gray-400">
            {items} item{items !== 1 && "s"} selected
          </p>

          {items < 3 && (
            <p className="text-yellow-400 text-sm mt-1">
              Add {3 - items} more to unlock 3 for £20
            </p>
          )}

          <div className="mt-4 p-4 bg-gray-900 rounded-2xl">
            <p className="text-sm text-gray-400">
              {deliveryCost === 0
                ? "🚚 Free Delivery"
                : "🚚 Delivery £3"}
            </p>
          </div>

          <div className="mt-4 text-2xl font-bold">
            Total: £{total}
          </div>

          <p className="text-red-400 text-sm mt-2">
            ⚡ Limited stock – popular flavours sell fast
          </p>
        </div>
      )}

      {/* FACEBOOK BUTTON ONLY */}
      {items > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-black border-t border-gray-800">
          <a
            href={facebookLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-pink-500 py-4 rounded-2xl text-center font-bold shadow-lg"
          >
            Order via Facebook
          </a>
        </div>
      )}

    </div>
  );
}
