import { useState } from "react";

const FACEBOOK_PAGE = "https://www.facebook.com/share/18jdHNeNu4/";

const gloozeFlavours = [
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
  "Sweet Mango",
  "Peach & Black Pepper",
];

const sprayFlavours = [
  "Sweet Mango",
  "Tigernut",
  "Strawberry Cream",
  "Bloodworm",
  "Maple Cream",
  "Pineapple Dream",
  "Tutti Fruity",
  "Plum",
  "Mulberry Zing",
  "Squid & Octopus",
  "Dairy Cream",
  "Peach",
];

const wafterFlavours = [
  "Sweet Mango Black Pepper",
  "Maple Cream",
  "Squid + Octopus",
  "Strawberry Cream",
  "Pineapple Dream",
  "Plum",
  "Crayfish",
  "Tigernut",
  "Tutti Fruity",
];

const pelletPrices = {
  "3kg Micro Mini Mix Pellet": 13.5,
  "3kg 6mm Halibut Pellets": 11.5,
};

export default function App() {
  const [discountCode, setDiscountCode] = useState("");

  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    postcode: "",
    email: "",
  });

  const [glooze, setGlooze] = useState(
    Object.fromEntries(gloozeFlavours.map((f) => [f, 0]))
  );

  const [sprays, setSprays] = useState(
    Object.fromEntries(sprayFlavours.map((f) => [f, 0]))
  );

  const [wafters, setWafters] = useState(
    Object.fromEntries(wafterFlavours.map((f) => [f, 0]))
  );

  const [pellets, setPellets] = useState({
    "3kg Micro Mini Mix Pellet": 0,
    "3kg 6mm Halibut Pellets": 0,
  });

  const updateQty = (setter, item, change) => {
    setter((prev) => ({
      ...prev,
      [item]: Math.max(0, prev[item] + change),
    }));
  };

  const updateCustomer = (field, value) => {
    setCustomer((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const gloozeItems = Object.values(glooze).reduce((a, b) => a + b, 0);
  const sprayItems = Object.values(sprays).reduce((a, b) => a + b, 0);
  const wafterItems = Object.values(wafters).reduce((a, b) => a + b, 0);
  const pelletItems = Object.values(pellets).reduce((a, b) => a + b, 0);

  const totalItems =
    gloozeItems + sprayItems + wafterItems + pelletItems;

  const gloozeTotal =
    Math.floor(gloozeItems / 3) * 20 +
    (gloozeItems % 3) * 8;

  const sprayTotal =
    Math.floor(sprayItems / 2) * 6 +
    (sprayItems % 2) * 3.5;

  const wafterTotal =
    Math.floor(wafterItems / 2) * 10 +
    (wafterItems % 2) * 6;

  const pelletTotal = Object.entries(pellets).reduce(
    (sum, [name, qty]) =>
      sum + qty * pelletPrices[name],
    0
  );

  const productTotal =
    gloozeTotal +
    sprayTotal +
    wafterTotal +
    pelletTotal;

  const discountActive =
    discountCode.trim().toUpperCase() ===
    "MURKYWATERS20";

  const discountAmount = discountActive
    ? productTotal * 0.2
    : 0;

  const delivery =
    totalItems > 0
      ? pelletItems > 0
        ? 3.95
        : 3.5
      : 0;

  const finalTotal =
    productTotal - discountAmount + delivery;

  const ProductCard = ({
    name,
    qty,
    price,
    onMinus,
    onPlus,
  }) => (
    <div
      className={`rounded-3xl border p-4 text-center ${
        qty > 0
          ? "border-yellow-400 bg-yellow-400/10"
          : "border-white/10 bg-zinc-950"
      }`}
    >
      <div className="mb-3 mt-5 flex h-20 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-yellow-400/30 via-black to-pink-500/20">
        <span className="text-3xl">🎣</span>
      </div>

      <h3 className="text-lg font-black">
        {name}
      </h3>

      <p className="mt-1 font-bold text-yellow-400">
        {price}
      </p>

      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          onClick={onMinus}
          className="h-10 w-10 rounded-xl bg-zinc-800 text-xl font-black"
        >
          -
        </button>

        <span className="text-2xl font-black">
          {qty}
        </span>

        <button
          onClick={onPlus}
          className="h-10 w-10 rounded-xl bg-yellow-400 text-xl font-black text-black"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black px-4 pb-40 text-white">

      <section className="relative overflow-hidden rounded-b-[2rem] border-b border-yellow-500/30 bg-gradient-to-b from-yellow-900/40 via-black to-black py-12 text-center">

        <p className="text-xs font-black tracking-[0.4em] text-yellow-400">
          MURKY WATERS
        </p>

        <h1 className="mt-3 text-5xl font-black">
          Premium Carp Bait
        </h1>

        <p className="mx-auto mt-4 max-w-md text-lg text-gray-300">
          Fishing Glooze, wafters, sprays and pellets built for proper results.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">

          <div className="rounded-2xl bg-yellow-400 p-4 font-black text-black">
            Glooze 3 for £20
          </div>

          <div className="rounded-2xl bg-pink-500 p-4 font-black text-white">
            Sprays 2 for £6
          </div>

          <div className="rounded-2xl bg-orange-500 p-4 font-black text-white">
            Wafters 2 for £10
          </div>

          <div className="rounded-2xl bg-zinc-900 p-4 font-black text-white">
            Pellets from £11.50
          </div>

        </div>

        <a
          href={FACEBOOK_PAGE}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-6 block max-w-md rounded-2xl bg-blue-600 py-4 font-black text-white"
        >
          👍 Visit Our Facebook Page
        </a>

      </section>

      <section className="mt-6 rounded-3xl border border-yellow-500/20 bg-zinc-950 p-4">

        <h2 className="text-center text-3xl font-black">
          Fishing Glooze
        </h2>

        <div className="mt-5 grid grid-cols-2 gap-4">
          {gloozeFlavours.map((item) => (
            <ProductCard
              key={item}
              name={item}
              qty={glooze[item]}
              price="£8 each"
              onMinus={() =>
                updateQty(setGlooze, item, -1)
              }
              onPlus={() =>
                updateQty(setGlooze, item, 1)
              }
            />
          ))}
        </div>

      </section>

      <section className="mt-6 rounded-3xl border border-pink-500/20 bg-zinc-950 p-4">

        <h2 className="text-center text-3xl font-black">
          25ml Booster Sprays
        </h2>

        <div className="mt-5 grid grid-cols-2 gap-4">
          {sprayFlavours.map((item) => (
            <ProductCard
              key={item}
              name={item}
              qty={sprays[item]}
              price="£3.50 each"
              onMinus={() =>
                updateQty(setSprays, item, -1)
              }
              onPlus={() =>
                updateQty(setSprays, item, 1)
              }
            />
          ))}
        </div>

      </section>

      <section className="mt-6 rounded-3xl border border-orange-500/20 bg-zinc-950 p-4">

        <h2 className="text-center text-3xl font-black">
          15mm Barrel Wafters
        </h2>

        <div className="mt-5 grid grid-cols-2 gap-4">
          {wafterFlavours.map((item) => (
            <ProductCard
              key={item}
              name={item}
              qty={wafters[item]}
              price="£6 per pot"
              onMinus={() =>
                updateQty(setWafters, item, -1)
              }
              onPlus={() =>
                updateQty(setWafters, item, 1)
              }
            />
          ))}
        </div>

      </section>

      <section className="mt-6 rounded-3xl border border-yellow-500/20 bg-zinc-950 p-4">

        <h2 className="text-center text-3xl font-black">
          Pellet Buckets
        </h2>

        <div className="mt-5 grid gap-4">
          {Object.keys(pellets).map((item) => (
            <ProductCard
              key={item}
              name={item}
              qty={pellets[item]}
              price={`£${pelletPrices[item].toFixed(2)}`}
              onMinus={() =>
                updateQty(setPellets, item, -1)
              }
              onPlus={() =>
                updateQty(setPellets, item, 1)
              }
            />
          ))}
        </div>

      </section>

      <section className="mt-6 rounded-3xl border border-white/10 bg-zinc-950 p-5">

        <h2 className="mb-4 text-center text-3xl font-black">
          Discount Code
        </h2>

        <input
          placeholder="Enter discount code"
          value={discountCode}
          onChange={(e) =>
            setDiscountCode(e.target.value)
          }
          className="w-full rounded-2xl border border-gray-600 bg-black p-4 text-center uppercase text-white"
        />

        {discountActive && (
          <p className="mt-3 text-center font-bold text-green-400">
            ✅ MURKYWATERS20 applied
          </p>
        )}

      </section>

      <section className="mt-6 rounded-3xl border border-white/10 bg-zinc-950 p-5">

        <h2 className="mb-4 text-center text-3xl font-black">
          Delivery Details
        </h2>

        <input
          placeholder="Full name"
          value={customer.name}
          onChange={(e) =>
            updateCustomer("name", e.target.value)
          }
          className="mb-3 w-full rounded-2xl border border-gray-600 bg-black p-4 text-white"
        />

        <textarea
          placeholder="Full delivery address"
          value={customer.address}
          onChange={(e) =>
            updateCustomer("address", e.target.value)
          }
          className="mb-3 w-full rounded-2xl border border-gray-600 bg-black p-4 text-white"
        />

        <input
          placeholder="Postcode"
          value={customer.postcode}
          onChange={(e) =>
            updateCustomer("postcode", e.target.value)
          }
          className="mb-3 w-full rounded-2xl border border-gray-600 bg-black p-4 text-white"
        />

        <input
          placeholder="Email address"
          value={customer.email}
          onChange={(e) =>
            updateCustomer("email", e.target.value)
          }
          className="mb-3 w-full rounded-2xl border border-gray-600 bg-black p-4 text-white"
        />

      </section>

      <section className="mt-6 rounded-3xl border border-yellow-500/30 bg-zinc-950 p-5 text-center">

        <div className="space-y-2 text-left text-gray-300">

          <div className="flex justify-between">
            <span>Products</span>
            <span>£{productTotal.toFixed(2)}</span>
          </div>

          {discountActive && (
            <div className="flex justify-between text-green-400">
              <span>Discount</span>
              <span>-£{discountAmount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Delivery</span>
            <span>£{delivery.toFixed(2)}</span>
          </div>

        </div>

        <div className="mt-5 text-5xl font-black text-green-400">
          £{finalTotal.toFixed(2)}
        </div>

      </section>

      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 border-t border-yellow-500/20 bg-black/95 p-4">

          <button
            onClick={async () => {

              const orderSummary = [

                ...Object.entries(glooze)
                  .filter(([, qty]) => qty > 0)
                  .map(([name, qty]) =>
                    `Glooze - ${name} x${qty}`
                  ),

                ...Object.entries(sprays)
                  .filter(([, qty]) => qty > 0)
                  .map(([name, qty]) =>
                    `Booster Spray - ${name} x${qty}`
                  ),

                ...Object.entries(wafters)
                  .filter(([, qty]) => qty > 0)
                  .map(([name, qty]) =>
                    `Wafters - ${name} x${qty}`
                  ),

                ...Object.entries(pellets)
                  .filter(([, qty]) => qty > 0)
                  .map(([name, qty]) =>
                    `${name} x${qty}`
                  ),

              ].join(" | ");

              try {

                const response = await fetch(
                  "/api/create-checkout-session",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                      totals: {
                        productTotal,
                        discountAmount,
                        delivery,
                        finalTotal,
                      },

                      customer,

                      orderSummary,
                    }),
                  }
                );

                const data = await response.json();

                if (data.url) {
                  window.location.href = data.url;
                } else {
                  alert("Payment error.");
                }

              } catch (error) {
                alert("Payment error.");
              }
            }}

            className="mx-auto block w-full max-w-md rounded-2xl bg-yellow-400 py-5 text-center text-xl font-black text-black shadow-lg"
          >
            🔒 Secure Checkout • £
            {finalTotal.toFixed(2)}
          </button>

        </div>
      )}

    </div>
  );
}
