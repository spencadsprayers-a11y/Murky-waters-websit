import { useState } from "react";

const FACEBOOK_PAGE = "https://www.facebook.com/share/18jdHNeNu4/";

export default function App() {
  const [discountCode, setDiscountCode] = useState("");

  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    postcode: "",
    email: "",
    notes: "",
  });

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

  const [pelletQty, setPelletQty] = useState(0);

  const badges = {
    "Pineapple Dream": "Best Seller",
    "Sweet Mango": "Fruity Favourite",
    "Squid & Octopus": "Savoury Hit",
    "Peach & Black Pepper": "New Flavour",
  };

  const updateQty = (item, change) => {
    setQuantities((prev) => ({
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

  const liquidItems = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalItems = liquidItems + pelletQty;

  const bundles = Math.floor(liquidItems / 3);
  const singles = liquidItems % 3;

  const liquidTotal = bundles * 20 + singles * 8;
  const pelletTotal = pelletQty * 8.5;
  const productTotal = liquidTotal + pelletTotal;

  const discountActive =
    discountCode.trim().toUpperCase() === "MURKYWATERS20";

  const discountAmount = discountActive ? productTotal * 0.2 : 0;
  const postage = totalItems > 0 ? (pelletQty > 0 ? 3.95 : 3.5) : 0;
  const finalTotal = productTotal - discountAmount + postage;

  const selectedText = [
    ...Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([name, qty]) => `${name} x${qty}`),
    ...(pelletQty > 0 ? [`2kg Micro Mini Mix Pellet x${pelletQty}`] : []),
  ].join("\n");

  const whatsappMessage = `🔥 Murky Waters Order 🔥

${selectedText}

Items: ${totalItems}
Products: £${productTotal.toFixed(2)}
Discount: £${discountAmount.toFixed(2)}
Postage: £${postage.toFixed(2)}
TOTAL: £${finalTotal.toFixed(2)}

Customer Details:
Name: ${customer.name}
Address: ${customer.address}
Postcode: ${customer.postcode}
Email: ${customer.email}
Notes: ${customer.notes || "None"}`;

  const whatsappLink = `https://wa.me/447519223822?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const teamLink = `https://wa.me/447519223822?text=${encodeURIComponent(
    "Hi, I’m interested in joining the Murky Waters team."
  )}`;

  return (
    <div className="min-h-screen bg-black text-white px-4 pb-40">
      {/* HERO */}
      <section className="text-center py-12 rounded-b-[2rem] bg-gradient-to-b from-yellow-900/30 via-black to-black border-b border-yellow-500/30">
        <p className="text-yellow-400 tracking-[0.35em] text-xs font-black">
          MURKY WATERS
        </p>

        <h1 className="text-5xl font-black mt-3 leading-tight">
          Fishing Glooze
        </h1>

        <p className="text-gray-300 mt-4 text-lg">
          Sticky. Strong. Irresistible.
        </p>

        <p className="text-gray-400 mt-3">
          2 years field tested • Premium food sources • Built for results
        </p>

        <div className="mt-6 inline-block bg-yellow-400 text-black px-6 py-4 rounded-2xl font-black text-2xl shadow-lg">
          🔥 3 FOR £20 🔥
        </div>

        <p className="mt-3 text-gray-300">
          £8 each • + £3.50 UK postage
        </p>

        <a
          href={FACEBOOK_PAGE}
          target="_blank"
          rel="noopener noreferrer"
          className="block max-w-md mx-auto mt-6 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl"
        >
          👍 Visit Our Facebook Page
        </a>
      </section>

      {/* WHY */}
      <section className="mt-6 bg-zinc-950 border border-yellow-500/20 rounded-3xl p-5 text-center shadow-2xl">
        <h2 className="text-3xl font-black mb-3">Why Choose Murky Waters?</h2>

        <p className="text-gray-300">
          After 2 years of proper on-the-bank testing, every bottle is made with
          high-quality ingredients and proven food sources. No gimmicks — just
          bait confidence and serious attraction.
        </p>

        <div className="grid grid-cols-2 gap-3 mt-5 text-sm">
          <div className="bg-black rounded-2xl p-4 border border-white/10">
            ✅ PVA Friendly
          </div>
          <div className="bg-black rounded-2xl p-4 border border-white/10">
            ✅ Easy To Use
          </div>
          <div className="bg-black rounded-2xl p-4 border border-white/10">
            ✅ Boosts Any Bait
          </div>
          <div className="bg-black rounded-2xl p-4 border border-white/10">
            ✅ All Year Round
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="mt-6 bg-zinc-950 border border-white/10 rounded-3xl p-5 text-center">
        <h2 className="text-3xl font-black mb-3">Proven On The Bank</h2>

        <p className="text-gray-300">
          Already helping anglers get results — including helping land a
          Cheshire 40lber.
        </p>

        <div className="grid grid-cols-3 gap-3 mt-5 text-sm">
          <div className="bg-black rounded-2xl p-4 border border-white/10">
            <p className="text-yellow-400 font-black">⭐️⭐️⭐️⭐️⭐️</p>
            <p className="mt-2 text-gray-300">Top Feedback</p>
          </div>

          <div className="bg-black rounded-2xl p-4 border border-white/10">
            <p className="text-green-400 text-xl font-black">PVA</p>
            <p className="mt-2 text-gray-300">Friendly</p>
          </div>

          <div className="bg-black rounded-2xl p-4 border border-white/10">
            <p className="text-pink-400 text-xl font-black">UK</p>
            <p className="mt-2 text-gray-300">Angler Made</p>
          </div>
        </div>
      </section>

      {/* IMAGE */}
      <section className="py-6">
        <img
          src="/images/Product-range.png"
          alt="Murky Waters Fishing Glooze range"
          className="w-full rounded-3xl border border-yellow-500/20 shadow-2xl"
        />
      </section>

      {/* TEAM */}
      <section className="bg-zinc-950 border border-pink-500/30 rounded-3xl p-5 text-center shadow-2xl">
        <h2 className="text-3xl font-black mb-3">Join The Murky Waters Team</h2>

        <p className="text-gray-300 mb-4">
          We’re building a trusted team of anglers to represent Murky Waters on
          the bank.
        </p>

        <div className="grid gap-3 text-left text-sm">
          <div className="bg-black rounded-2xl p-4 border border-white/10">
            ✅ 20% off team member orders
          </div>
          <div className="bg-black rounded-2xl p-4 border border-white/10">
            ✅ Access to team socials
          </div>
          <div className="bg-black rounded-2xl p-4 border border-white/10">
            ✅ Monthly competitions
          </div>
          <div className="bg-black rounded-2xl p-4 border border-white/10">
            ✅ Featured catches on our page
          </div>
        </div>

        <p className="text-gray-400 text-sm mt-4">
          Team members post catches, tag Murky Waters and have Murky Waters in
          their bio.
        </p>

        <a
          href={teamLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block max-w-md mx-auto mt-5 bg-pink-500 hover:bg-pink-600 text-white font-black py-4 rounded-2xl"
        >
          Apply To Be A Team Member
        </a>
      </section>

      {/* ORDER */}
      <section className="mt-6 bg-zinc-950 border border-yellow-500/20 rounded-3xl p-4">
        <h2 className="text-3xl font-black text-center mb-2">
          Build Your Order
        </h2>

        <p className="text-center text-gray-400 mb-5">
          Mix & match any flavours or choose 3 of the same.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {Object.keys(quantities).map((product) => (
            <div
              key={product}
              className={`rounded-2xl p-4 text-center border ${
                quantities[product] > 0
                  ? "border-pink-500 shadow-lg shadow-pink-500/20"
                  : "border-gray-700"
              }`}
            >
              {badges[product] && (
                <div className="inline-block bg-yellow-400 text-black text-xs font-black px-3 py-1 rounded-full mb-2">
                  {badges[product]}
                </div>
              )}

              <div className="mb-4 font-black">{product}</div>

              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => updateQty(product, -1)}
                  className="bg-gray-700 px-4 py-2 rounded-xl font-black"
                >
                  -
                </button>

                <span className="text-xl font-black">
                  {quantities[product]}
                </span>

                <button
                  onClick={() => updateQty(product, 1)}
                  className="bg-pink-500 px-4 py-2 rounded-xl font-black"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* PELLET */}
        <div className="mt-5 border border-yellow-500/40 rounded-3xl p-5 bg-black">
          <p className="text-yellow-400 text-sm font-black">NEW PRODUCT</p>

          <h3 className="text-2xl font-black mt-1">
            2kg Micro Mini Mix Pellet
          </h3>

          <p className="text-gray-400 mt-1">£8.50 per bucket</p>

          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={() => setPelletQty(Math.max(0, pelletQty - 1))}
              className="bg-gray-700 px-4 py-2 rounded-xl font-black"
            >
              -
            </button>

            <span className="text-xl font-black">{pelletQty}</span>

            <button
              onClick={() => setPelletQty(pelletQty + 1)}
              className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-black"
            >
              +
            </button>
          </div>
        </div>
      </section>

      {/* DISCOUNT */}
      <section className="mt-6 bg-zinc-950 border border-white/10 rounded-3xl p-5">
        <h2 className="text-3xl font-black text-center mb-4">Discount Code</h2>

        <input
          placeholder="Enter discount code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className="w-full p-4 rounded-2xl bg-black border border-gray-600 text-white text-center uppercase"
        />

        {discountActive && (
          <p className="text-green-400 font-bold text-center mt-3">
            ✅ MURKYWATERS20 applied — 20% off
          </p>
        )}
      </section>

      {/* DETAILS */}
      <section className="mt-6 bg-zinc-950 border border-white/10 rounded-3xl p-5">
        <h2 className="text-3xl font-black text-center mb-4">
          Delivery Details
        </h2>

        <input
          placeholder="Full name"
          value={customer.name}
          onChange={(e) => updateCustomer("name", e.target.value)}
          className="w-full p-4 mb-3 rounded-2xl bg-black border border-gray-600 text-white"
        />

        <textarea
          placeholder="Full delivery address"
          value={customer.address}
          onChange={(e) => updateCustomer("address", e.target.value)}
          className="w-full p-4 mb-3 rounded-2xl bg-black border border-gray-600 text-white"
        />

        <input
          placeholder="Postcode"
          value={customer.postcode}
          onChange={(e) => updateCustomer("postcode", e.target.value)}
          className="w-full p-4 mb-3 rounded-2xl bg-black border border-gray-600 text-white"
        />

        <input
          placeholder="Email address"
          value={customer.email}
          onChange={(e) => updateCustomer("email", e.target.value)}
          className="w-full p-4 mb-3 rounded-2xl bg-black border border-gray-600 text-white"
        />

        <textarea
          placeholder="Notes / special requests"
          value={customer.notes}
          onChange={(e) => updateCustomer("notes", e.target.value)}
          className="w-full p-4 rounded-2xl bg-black border border-gray-600 text-white"
        />
      </section>

      {/* SUMMARY */}
      <section className="mt-6 bg-zinc-950 border border-yellow-500/30 rounded-3xl p-5 text-center">
        <p className="text-gray-400 text-sm">Order Summary</p>

        <div className="mt-4 text-left text-gray-300 space-y-2">
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
            <span>Postage</span>
            <span>£{postage.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-5xl font-black text-green-400 mt-5">
          £{finalTotal.toFixed(2)}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-6 bg-zinc-950 border border-white/10 rounded-3xl p-5 mb-6">
        <h2 className="text-3xl font-black text-center mb-4">FAQ</h2>

        <div className="space-y-3 text-sm text-gray-300">
          <div className="bg-black rounded-2xl p-4 border border-white/10">
            <strong>Is Fishing Glooze PVA friendly?</strong>
            <p>Yes — it is designed to be PVA friendly.</p>
          </div>

          <div className="bg-black rounded-2xl p-4 border border-white/10">
            <strong>Can I buy 3 of the same flavour?</strong>
            <p>Yes — mix and match or choose multiples of the same flavour.</p>
          </div>

          <div className="bg-black rounded-2xl p-4 border border-white/10">
            <strong>How much is postage?</strong>
            <p>
              Standard UK postage is £3.50. If pellets are selected, postage is
              £3.95.
            </p>
          </div>

          <div className="bg-black rounded-2xl p-4 border border-white/10">
            <strong>How do I use it?</strong>
            <p>
              Add directly to boilies, pellets, hookbaits, spod mix or
              groundbait.
            </p>
          </div>
        </div>

        <a
          href={FACEBOOK_PAGE}
          target="_blank"
          rel="noopener noreferrer"
          className="block max-w-md mx-auto mt-5 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl text-center"
        >
          👍 Follow Us On Facebook
        </a>
      </section>

      {/* STICKY BUTTON */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/95 border-t border-yellow-500/20">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block max-w-md mx-auto bg-green-500 text-white font-black py-5 rounded-2xl text-xl text-center shadow-lg"
          >
            💬 Send Order On WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
