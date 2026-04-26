import { useState } from "react";

const STRIPE_SINGLE = "https://buy.stripe.com/9B65kF3Sv19L07l4TM9AA03";
const STRIPE_BUNDLE = "https://buy.stripe.com/aFa00l60D9Ghf2f71U9AA04";

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

  const updateQty = (item, change) => {
    setQuantities((prev) => ({
      ...prev,
      [item]: Math.max(0, prev[item] + change),
    }));
  };

  const products = Object.keys(quantities);
  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);

  const bundles = Math.floor(totalItems / 3);
  const singles = totalItems % 3;

  const total =
    totalItems === 0
      ? 0
      : bundles * 23.5 + (singles > 0 ? 11.5 : 0);

  const selectedText = Object.entries(quantities)
    .filter(([_, qty]) => qty > 0)
    .map(([name, qty]) => `${name} x${qty}`)
    .join("\n");

  const whatsappMessage = `🔥 Murky Waters Order 🔥

${selectedText}

Items: ${totalItems}
Total Paid: £${total}`;

  const whatsappLink = `https://wa.me/447519223822?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const handleStripeCheckout = () => {
    if (totalItems === 0) return;

    if (totalItems % 3 === 0) {
      window.open(STRIPE_BUNDLE, "_blank");
    } else {
      window.open(STRIPE_SINGLE, "_blank");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen px-4 pb-44">

      {/* HEADER */}
      <section className="text-center py-10 bg-gradient-to-b from-pink-950/50 to-black rounded-b-3xl">
        <p className="text-pink-400 text-sm font-bold tracking-widest">
          MURKYWATERS
        </p>

        <h1 className="text-5xl font-black mt-2">Fishing Glooze</h1>

        <p className="text-gray-300 mt-3">
          Sticky. Strong. Irresistible.
        </p>

        <div className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-2xl font-black text-2xl mt-5 shadow-lg">
          🔥 3 FOR £20 🔥
        </div>

        <p className="text-gray-400 mt-2">
          + £3.50 delivery = £23.50 delivered
        </p>

        <p className="text-gray-400">
          £8 each + delivery = £11.50 delivered
        </p>
      </section>

      {/* IMAGE */}
      <section className="py-6">
        <img
          src="/images/Product-range.png"
          alt="Murky Waters range"
          className="mx-auto rounded-2xl shadow-2xl border border-white/10"
        />
      </section>

      {/* PRODUCTS */}
      <section className="bg-zinc-950 border border-white/10 rounded-3xl p-4">
        <h2 className="text-3xl font-black text-center mb-5">
          Build Your Order
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product}
              className={`rounded-2xl p-4 text-center border ${
                quantities[product] > 0
                  ? "border-pink-500"
                  : "border-gray-700"
              }`}
            >
              <div className="mb-4 font-bold">{product}</div>

              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => updateQty(product, -1)}
                  className="bg-gray-700 px-4 py-2 rounded-xl"
                >
                  -
                </button>

                <span className="text-xl font-black">
                  {quantities[product]}
                </span>

                <button
                  onClick={() => updateQty(product, 1)}
                  className="bg-pink-500 px-4 py-2 rounded-xl"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TOTAL */}
      <section className="mt-6 bg-zinc-950 border border-white/10 rounded-3xl p-5 text-center">
        <div className="text-gray-400 text-sm mb-1">
          Your Order Total (Delivered)
        </div>

        <div className="text-5xl font-black text-green-400">
          £{total.toFixed(2)}
        </div>

        {totalItems > 0 && (
          <div className="text-gray-400 text-sm mt-2">
            {bundles > 0 && `${bundles} bundle (£${(bundles * 23.5).toFixed(2)})`}
            {bundles > 0 && singles > 0 && " + "}
            {singles > 0 && `${singles} single (£11.50)`}
          </div>
        )}
      </section>

      {/* BUTTONS */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-black p-4 border-t border-white/10">

          <button
            onClick={handleStripeCheckout}
            className="w-full bg-white text-black font-black py-5 rounded-2xl text-xl mb-3"
          >
            Pay Securely (Delivery Included)
          </button>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-green-500 text-white font-black py-4 rounded-2xl text-center"
          >
            💬 Send Order on WhatsApp
          </a>

        </div>
      )}
    </div>
  );
}
