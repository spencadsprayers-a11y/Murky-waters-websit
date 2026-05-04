import { useState } from "react";

const FACEBOOK_PAGE = "https://www.facebook.com/share/18jdHNeNu4/";
const WHATSAPP_NUMBER = "447519223822";

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
    notes: "",
  });

  const [glooze, setGlooze] = useState(
    Object.fromEntries(gloozeFlavours.map((flavour) => [flavour, 0]))
  );

  const [sprays, setSprays] = useState(
    Object.fromEntries(sprayFlavours.map((flavour) => [flavour, 0]))
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
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const gloozeItems = Object.values(glooze).reduce((a, b) => a + b, 0);
  const sprayItems = Object.values(sprays).reduce((a, b) => a + b, 0);
  const pelletItems = Object.values(pellets).reduce((a, b) => a + b, 0);
  const totalItems = gloozeItems + sprayItems + pelletItems;

  const gloozeTotal = Math.floor(gloozeItems / 3) * 20 + (gloozeItems % 3) * 8;
  const sprayTotal = Math.floor(sprayItems / 3) * 8 + (sprayItems % 3) * 3.25;

  const pelletTotal = Object.entries(pellets).reduce(
    (sum, [name, qty]) => sum + qty * pelletPrices[name],
    0
  );

  const productTotal = gloozeTotal + sprayTotal + pelletTotal;

  const discountActive = discountCode.trim().toUpperCase() === "MURKYWATERS20";
  const discountAmount = discountActive ? productTotal * 0.2 : 0;

  const delivery = totalItems > 0 ? (pelletItems > 0 ? 3.95 : 3.5) : 0;
  const finalTotal = productTotal - discountAmount + delivery;

  const selectedText = [
    ...Object.entries(glooze)
      .filter(([, qty]) => qty > 0)
      .map(([name, qty]) => `Fishing Glooze - ${name} x${qty}`),
    ...Object.entries(sprays)
      .filter(([, qty]) => qty > 0)
      .map(([name, qty]) => `25ml Booster Spray - ${name} x${qty}`),
    ...Object.entries(pellets)
      .filter(([, qty]) => qty > 0)
      .map(([name, qty]) => `${name} x${qty}`),
  ].join("\n");

  const whatsappMessage = `🔥 Murky Waters Order 🔥

${selectedText}

Products: £${productTotal.toFixed(2)}
Discount: £${discountAmount.toFixed(2)}
Delivery: £${delivery.toFixed(2)}
TOTAL: £${finalTotal.toFixed(2)}

Customer Details:
Name: ${customer.name}
Address: ${customer.address}
Postcode: ${customer.postcode}
Email: ${customer.email}
Notes: ${customer.notes || "None"}`;

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const teamLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi, I’m interested in joining the Murky Waters team."
  )}`;

  const ProductCard = ({ name, qty, price, onMinus, onPlus, tag, desc }) => (
    <div
      className={`relative rounded-3xl border p-4 text-center ${
        qty > 0
          ? "border-yellow-400 bg-yellow-400/10 shadow-lg shadow-yellow-500/20"
          : "border-white/10 bg-zinc-950"
      }`}
    >
      {tag && (
        <div className="absolute right-3 top-3 rounded-full bg-yellow-400 px-3 py-1 text-xs font-black text-black">
          {tag}
        </div>
      )}

      <div className="mb-3 mt-5 flex h-20 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-yellow-400/30 via-black to-pink-500/20">
        <span className="text-3xl">🎣</span>
      </div>

      <h3 className="text-lg font-black leading-tight">{name}</h3>
      <p className="mt-1 font-bold text-yellow-400">{price}</p>

      {desc && <p className="mt-2 text-xs text-gray-400">{desc}</p>}

      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          onClick={onMinus}
          className="h-10 w-10 rounded-xl bg-zinc-800 text-xl font-black"
        >
          -
        </button>

        <span className="min-w-8 text-2xl font-black">{qty}</span>

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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#facc15,_transparent_35%)] opacity-20" />

        <div className="relative">
          <p className="text-xs font-black tracking-[0.4em] text-yellow-400">
            MURKY WATERS
          </p>

          <h1 className="mt-3 text-5xl font-black leading-tight">
            Fishing Glooze
          </h1>

          <p className="mx-auto mt-4 max-w-md text-lg text-gray-300">
            Premium bait boosters, sprays and pellets built for proper results
            on the bank.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-yellow-400 p-4 font-black text-black">
              Glooze 3 for £20
            </div>
            <div className="rounded-2xl bg-pink-500 p-4 font-black text-white">
              Sprays 3 for £8
            </div>
            <div className="rounded-2xl bg-zinc-900 p-4 font-black text-white">
              Pellets from £11.50
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-400">
            Liquids delivery £3.50 • Pellet orders delivery £3.95
          </p>

          <a
            href={FACEBOOK_PAGE}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto mt-6 block max-w-md rounded-2xl bg-blue-600 py-4 font-black text-white"
          >
            👍 Visit Our Facebook Page
          </a>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-yellow-500/20 bg-zinc-950 p-5 text-center shadow-2xl">
        <h2 className="text-3xl font-black">Why Choose Murky Waters?</h2>

        <p className="mt-3 text-gray-300">
          After 2 years of proper on-the-bank testing, every product is built
          around attraction, confidence and results.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          {["PVA Friendly", "Boosts Any Bait", "All Year Round", "Proven Results"].map(
            (item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black p-4"
              >
                ✅ {item}
              </div>
            )
          )}
        </div>
      </section>

      <section className="py-6">
        <img
          src="/images/Product-range.png"
          alt="Murky Waters Fishing Glooze range"
          className="w-full rounded-3xl border border-yellow-500/20 shadow-2xl"
        />
      </section>

      <section className="rounded-3xl border border-pink-500/30 bg-zinc-950 p-5 text-center shadow-2xl">
        <h2 className="text-3xl font-black">Join The Murky Waters Team</h2>

        <p className="mt-3 text-gray-300">
          Approved team members get 20% off products, access to team socials,
          monthly competitions and featured catches.
        </p>

        <a
          href={teamLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-5 block max-w-md rounded-2xl bg-pink-500 py-4 font-black"
        >
          Apply To Be A Team Member
        </a>
      </section>

      <section className="mt-6 rounded-3xl border border-yellow-500/20 bg-zinc-950 p-4">
        <h2 className="text-center text-3xl font-black">Fishing Glooze</h2>
        <p className="mb-5 mt-2 text-center text-gray-400">
          £8 each or 3 for £20 — mix & match any flavours.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {gloozeFlavours.map((item) => (
            <ProductCard
              key={item}
              name={item}
              qty={glooze[item]}
              price="£8 each"
              tag={item === "Pineapple Dream" ? "Best Seller" : item === "Sweet Mango" ? "Team Pick" : ""}
              desc="Premium liquid bait additive."
              onMinus={() => updateQty(setGlooze, item, -1)}
              onPlus={() => updateQty(setGlooze, item, 1)}
            />
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-pink-500/20 bg-zinc-950 p-4">
        <h2 className="text-center text-3xl font-black">25ml Booster Sprays</h2>
        <p className="mb-5 mt-2 text-center text-gray-400">
          £3.25 each or 3 for £8 — perfect for hookbaits, PVA bags, pellets and
          particles.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {sprayFlavours.map((item) => (
            <ProductCard
              key={item}
              name={item}
              qty={sprays[item]}
              price="£3.25 each"
              tag={item === "Sweet Mango" ? "New" : item === "Tigernut" ? "Popular" : ""}
              desc="Instant attraction booster spray."
              onMinus={() => updateQty(setSprays, item, -1)}
              onPlus={() => updateQty(setSprays, item, 1)}
            />
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-yellow-500/20 bg-zinc-950 p-4">
        <h2 className="text-center text-3xl font-black">Pellet Buckets</h2>
        <p className="mb-5 mt-2 text-center text-gray-400">
          Premium feed pellets for PVA bags, spodding and keeping fish feeding.
        </p>

        <div className="grid gap-4">
          {Object.keys(pellets).map((item) => (
            <ProductCard
              key={item}
              name={item}
              qty={pellets[item]}
              price={`£${pelletPrices[item].toFixed(2)}`}
              tag={item.includes("Micro") ? "PVA Bag Hero" : "Food Signal"}
              desc={
                item.includes("Micro")
                  ? "Perfect for PVA bags, spod mixes and heavy baiting."
                  : "Strong food signal pellet designed to get fish feeding."
              }
              onMinus={() => updateQty(setPellets, item, -1)}
              onPlus={() => updateQty(setPellets, item, 1)}
            />
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-white/10 bg-zinc-950 p-5">
        <h2 className="mb-4 text-center text-3xl font-black">Discount Code</h2>

        <input
          placeholder="Enter discount code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className="w-full rounded-2xl border border-gray-600 bg-black p-4 text-center uppercase text-white"
        />

        {discountActive && (
          <p className="mt-3 text-center font-bold text-green-400">
            ✅ MURKYWATERS20 applied — 20% off products only
          </p>
        )}

        <p className="mt-2 text-center text-xs text-gray-500">
          Discount does not apply to delivery.
        </p>
      </section>

      <section className="mt-6 rounded-3xl border border-white/10 bg-zinc-950 p-5">
        <h2 className="mb-4 text-center text-3xl font-black">
          Delivery Details
        </h2>

        <input
          placeholder="Full name"
          value={customer.name}
          onChange={(e) => updateCustomer("name", e.target.value)}
          className="mb-3 w-full rounded-2xl border border-gray-600 bg-black p-4 text-white"
        />

        <textarea
          placeholder="Full delivery address"
          value={customer.address}
          onChange={(e) => updateCustomer("address", e.target.value)}
          className="mb-3 w-full rounded-2xl border border-gray-600 bg-black p-4 text-white"
        />

        <input
          placeholder="Postcode"
          value={customer.postcode}
          onChange={(e) => updateCustomer("postcode", e.target.value)}
          className="mb-3 w-full rounded-2xl border border-gray-600 bg-black p-4 text-white"
        />

        <input
          placeholder="Email address"
          value={customer.email}
          onChange={(e) => updateCustomer("email", e.target.value)}
          className="mb-3 w-full rounded-2xl border border-gray-600 bg-black p-4 text-white"
        />

        <textarea
          placeholder="Notes / special requests"
          value={customer.notes}
          onChange={(e) => updateCustomer("notes", e.target.value)}
          className="w-full rounded-2xl border border-gray-600 bg-black p-4 text-white"
        />
      </section>

      <section className="mt-6 rounded-3xl border border-yellow-500/30 bg-zinc-950 p-5 text-center">
        <p className="text-sm text-gray-400">Order Summary</p>

        <div className="mt-4 space-y-2 text-left text-gray-300">
          <div className="flex justify-between">
            <span>Products</span>
            <span>£{productTotal.toFixed(2)}</span>
          </div>

          {discountActive && (
            <div className="flex justify-between text-green-400">
              <span>Team discount</span>
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

      <section className="mb-6 mt-6 rounded-3xl border border-white/10 bg-zinc-950 p-5">
        <h2 className="mb-4 text-center text-3xl font-black">FAQ</h2>

        <div className="space-y-3 text-sm text-gray-300">
          {[
            [
              "Are the Glooze products PVA friendly?",
              "Yes — they are designed to be PVA friendly.",
            ],
            [
              "Can I mix and match deals?",
              "Yes — Glooze is 3 for £20 and booster sprays are 3 for £8.",
            ],
            [
              "How much is delivery?",
              "Standard liquid orders are £3.50. If pellets are selected, delivery is £3.95.",
            ],
            [
              "Do discounts apply to delivery?",
              "No — team discounts apply to products only, not delivery.",
            ],
          ].map(([q, a]) => (
            <div
              key={q}
              className="rounded-2xl border border-white/10 bg-black p-4"
            >
              <strong>{q}</strong>
              <p>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 border-t border-yellow-500/20 bg-black/95 p-4">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto block max-w-md rounded-2xl bg-green-500 py-5 text-center text-xl font-black text-white shadow-lg"
          >
            💬 Send Order On WhatsApp • £{finalTotal.toFixed(2)}
          </a>
        </div>
      )}
    </div>
  );
}
