import { useState } from "react";

const FACEBOOK_PAGE = "https://www.facebook.com/share/18jdHNeNu4/";
const WHATSAPP_NUMBER = "447519223822";

export default function App() {
  const [discountCode, setDiscountCode] = useState("");

  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    postcode: "",
    email: "",
    notes: "",
  });

  const [glooze, setGlooze] = useState({
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

  const [pellets, setPellets] = useState({
    "3kg Micro Mini Mix Pellet": 0,
    "2kg Bucket 6mm Halibut Pellets": 0,
    "3kg Bucket 6mm Halibut Pellets": 0,
  });

  const pelletPrices = {
    "3kg Micro Mini Mix Pellet": 13.5,
    "2kg Bucket 6mm Halibut Pellets": 8.5,
    "3kg Bucket 6mm Halibut Pellets": 11.5,
  };

  const updateGlooze = (item, change) => {
    setGlooze((prev) => ({
      ...prev,
      [item]: Math.max(0, prev[item] + change),
    }));
  };

  const updatePellet = (item, change) => {
    setPellets((prev) => ({
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
  const pelletItems = Object.values(pellets).reduce((a, b) => a + b, 0);
  const totalItems = gloozeItems + pelletItems;

  const bundles = Math.floor(gloozeItems / 3);
  const singles = gloozeItems % 3;

  const gloozeTotal = bundles * 20 + singles * 8;

  const pelletTotal = Object.entries(pellets).reduce(
    (sum, [name, qty]) => sum + qty * pelletPrices[name],
    0
  );

  const productTotal = gloozeTotal + pelletTotal;
  const discountActive = discountCode.trim().toUpperCase() === "MURKYWATERS20";
  const discountAmount = discountActive ? productTotal * 0.2 : 0;
  const delivery = totalItems > 0 ? (pelletItems > 0 ? 3.95 : 3.5) : 0;
  const finalTotal = productTotal - discountAmount + delivery;

  const selectedText = [
    ...Object.entries(glooze)
      .filter(([, qty]) => qty > 0)
      .map(([name, qty]) => `${name} x${qty}`),
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

  return (
    <div className="min-h-screen bg-black text-white px-4 pb-40">
      <section className="text-center py-12 rounded-b-[2rem] bg-gradient-to-b from-yellow-900/40 via-black to-black border-b border-yellow-500/30">
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
          £8 each • Liquids delivery £3.50
        </p>

        <p className="text-gray-400 text-sm mt-1">
          Pellet orders delivery £3.95
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

      <section className="mt-6 bg-zinc-950 border border-yellow-500/20 rounded-3xl p-5 text-center shadow-2xl">
        <h2 className="text-3xl font-black mb-3">Why Choose Murky Waters?</h2>
        <p className="text-gray-300">
          After 2 years of proper on-the-bank testing, every bottle is made with
          high-quality ingredients and proven food sources. No gimmicks — just
          bait confidence and serious attraction.
        </p>

        <div className="grid grid-cols-2 gap-3 mt-5 text-sm">
          {["PVA Friendly", "Easy To Use", "Boosts Any Bait", "All Year Round"].map(
            (item) => (
              <div
                key={item}
                className="bg-black rounded-2xl p-4 border border-white/10"
              >
                ✅ {item}
              </div>
            )
          )}
        </div>
      </section>

      <section className="mt-6 bg-zinc-950 border border-white/10 rounded-3xl p-5 text-center">
        <h2 className="text-3xl font-black mb-3">Proven On The Bank</h2>
        <p className="text-gray-300">
          Already helping anglers get results — including helping land a
          Cheshire 40lber.
        </p>
      </section>

      <section className="py-6">
        <img
          src="/images/Product-range.png"
          alt="Murky Waters Fishing Glooze range"
          className="w-full rounded-3xl border border-yellow-500/20 shadow-2xl"
        />
      </section>

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

      <section className="mt-6 bg-zinc-950 border border-yellow-500/20 rounded-3xl p-4">
        <h2 className="text-3xl font-black text-center mb-2">
          Build Your Order
        </h2>

        <p className="text-center text-gray-400 mb-5">
          Mix & match any flavours or choose 3 of the same.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {Object.keys(glooze).map((product) => (
            <div
              key={product}
              className={`rounded-2xl p-4 text-center border ${
                glooze[product] > 0
                  ? "border-pink-500 shadow-lg shadow-pink-500/20"
                  : "border-gray-700"
              }`}
            >
              <div className="mb-4 font-black">{product}</div>

              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => updateGlooze(product, -1)}
                  className="bg-gray-700 px-4 py-2 rounded-xl font-black"
                >
                  -
                </button>

                <span className="text-xl font-black">{glooze[product]}</span>

                <button
                  onClick={() => updateGlooze(product, 1)}
                  className="bg-pink-500 px-4 py-2 rounded-xl font-black"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-black text-center mt-8 mb-4 text-yellow-400">
          Pellet Buckets
        </h3>

        <div className="space-y-4">
          {Object.keys(pellets).map((product) => (
            <div
              key={product}
              className={`border rounded-3xl p-5 bg-black ${
                pellets[product] > 0
                  ? "border-yellow-400 shadow-lg shadow-yellow-500/20"
                  : "border-yellow-500/40"
              }`}
            >
              <p className="text-yellow-400 text-sm font-black">
                PELLET BUCKET
              </p>

              <h3 className="text-2xl font-black mt-1">{product}</h3>

              <p className="text-gray-300 mt-1">
                £{pelletPrices[product].toFixed(2)}
              </p>

              <p className="text-gray-500 text-sm mt-2">
                {product.includes("Micro")
                  ? "Perfect for PVA bags, spod mixes and heavy baiting."
                  : "Strong food signal pellet designed to get fish feeding."}
              </p>

              <div className="flex justify-center items-center gap-4 mt-4">
                <button
                  onClick={() => updatePellet(product, -1)}
                  className="bg-gray-700 px-4 py-2 rounded-xl font-black"
                >
                  -
                </button>

                <span className="text-xl font-black">{pellets[product]}</span>

                <button
                  onClick={() => updatePellet(product, 1)}
                  className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-black"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

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
            ✅ MURKYWATERS20 applied — 20% off products only
          </p>
        )}

        <p className="text-gray-500 text-center text-xs mt-2">
          Discount does not apply to delivery.
        </p>
      </section>

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
            <span>Delivery</span>
            <span>£{delivery.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-5xl font-black text-green-400 mt-5">
          £{finalTotal.toFixed(2)}
        </div>
      </section>

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
            <strong>How much is delivery?</strong>
            <p>
              Standard liquid orders are £3.50. If pellets are selected,
              delivery is £3.95.
            </p>
          </div>

          <div className="bg-black rounded-2xl p-4 border border-white/10">
            <strong>Do discounts apply to delivery?</strong>
            <p>No — team discounts apply to products only, not delivery.</p>
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
