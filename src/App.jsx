import { useState } from "react";

const STRIPE_BUNDLE_20 = "https://buy.stripe.com/dRmcN7fBd8Cd9HV4TM9AA01";
const STRIPE_SINGLE_8 = "https://buy.stripe.com/8x2bJ3ex9g4F7zN0Dw9AA02";

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
  const total = bundles * 20 + singles * 8;

  const selectedText = Object.entries(quantities)
    .filter(([_, qty]) => qty > 0)
    .map(([name, qty]) => `${name} x${qty}`)
    .join("\n");

  const whatsappMessage = `🔥 Murky Waters Order 🔥

${selectedText}

Items: ${totalItems}
Total: £${total}

I have paid / I am ready to pay 👍`;

  const whatsappLink = `https://wa.me/447519223822?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const handleStripeCheckout = () => {
    if (totalItems === 0) return;

    if (totalItems % 3 === 0) {
      window.open(STRIPE_BUNDLE_20, "_blank");
    } else {
      window.open(STRIPE_SINGLE_8, "_blank");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen px-4 pb-40">
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
      </section>

      <section className="py-6">
        <img
          src="/images/Product-range.png"
          alt="Murky Waters Fishing Glooze range"
          className="mx-auto rounded-2xl shadow-2xl border border-white/10 w-full max-w-5xl"
        />
      </section>

      <section className="bg-zinc-950 border border-white/10 rounded-3xl p-4 shadow-2xl">
        <h2 className="text-3xl font-black text-center mb-2">
          Build Your Order
        </h2>

        <p className="text-center text-gray-400 mb-5">
          Mix & match or choose multiple of the same flavour
        </p>

        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product}
              className={`rounded-2xl p-4 text-center border transition ${
                quantities[product] > 0
                  ? "border-pink-500 shadow-lg shadow-pink-500/20"
                  : "border-gray-700"
              }`}
            >
              <div className="mb-4 font-bold text-lg">{product}</div>

              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => updateQty(product, -1)}
                  className="bg-gray-700 px-4 py-2 rounded-xl font-bold"
                >
                  -
                </button>

                <span className="text-xl font-black">
                  {quantities[product]}
                </span>

                <button
                  onClick={() => updateQty(product, 1)}
                  className="bg-pink-500 px-4 py-2 rounded-xl font-bold"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 bg-zinc-950 border border-white/10 rounded-3xl p-5 text-center">
        <p className="text-gray-400">
          {totalItems} item{totalItems !== 1 && "s"} selected
        </p>

        {totalItems > 0 && totalItems < 3 && (
          <p className="text-yellow-400 text-sm mt-2">
            Add {3 - totalItems} more to unlock 3 for £20
          </p>
        )}

        {totalItems >= 3 && (
          <p className="text-green-400 font-bold mt-2">
            🎉 3 for £20 deal applied!
          </p>
        )}

        <div className="text-3xl font-black mt-5">Total: £{total}</div>

        {totalItems > 0 && (
          <p className="text-gray-400 text-sm mt-3">
            After paying, please send your order on WhatsApp so I know your flavour choices.
          </p>
        )}
      </section>

      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-white/10 p-4">
          <button
            onClick={handleStripeCheckout}
            className="block w-full max-w-md mx-auto bg-white text-black font-black py-5 rounded-2xl text-xl text-center shadow-lg mb-2"
          >
            Pay Securely by Card
          </button>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full max-w-md mx-auto bg-green-500 hover:bg-green-
