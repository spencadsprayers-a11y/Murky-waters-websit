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

  const products = Object.keys(quantities);
  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);

  const bundles = Math.floor(totalItems / 3);
  const singles = totalItems % 3;

  const productTotal = bundles * 20 + singles * 8;
  const discountActive = discountCode.trim().toUpperCase() === "MURKYWATERS20";
  const discountAmount = discountActive ? productTotal * 0.2 : 0;
  const discountedProductTotal = productTotal - discountAmount;

  const postage = totalItems > 0 ? 3.5 : 0;
  const finalTotal = discountedProductTotal + postage;

  const selectedText = Object.entries(quantities)
    .filter(([_, qty]) => qty > 0)
    .map(([name, qty]) => `${name} x${qty}`)
    .join("\n");

  const customerText = `Name: ${customer.name}
Address: ${customer.address}
Postcode: ${customer.postcode}
Email: ${customer.email}
Discount Code: ${discountCode || "None"}
Notes: ${customer.notes || "None"}`;

  const whatsappMessage = `🔥 Murky Waters Order 🔥

${selectedText}

Items: ${totalItems}
Product Total: £${productTotal.toFixed(2)}
Discount: £${discountAmount.toFixed(2)}
Postage: £${postage.toFixed(2)}
Final Total: £${finalTotal.toFixed(2)}

Customer Details:
${customerText}`;

  const whatsappLink = `https://wa.me/447519223822?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const teamLink = `https://wa.me/447519223822?text=${encodeURIComponent(
    "Hi, I’m interested in joining the Murky Waters team."
  )}`;

  return (
    <div className="bg-black text-white min-h-screen px-4 pb-36">
      <section className="text-center py-10 bg-gradient-to-b from-pink-950/50 to-black rounded-b-3xl">
        <p className="text-pink-400 text-sm font-bold tracking-widest">
          MURKYWATERS
        </p>

        <h1 className="text-5xl font-black mt-2">Fishing Glooze</h1>

        <p className="text-gray-300 mt-3">
          2 years field tested. Premium food sources. Built for results.
        </p>

        <div className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-2xl font-black text-2xl mt-5 shadow-lg">
          🔥 3 FOR £20 🔥
        </div>

        <p className="text-gray-400 mt-2">or £8 each</p>
        <p className="text-gray-400">+ £3.50 UK postage</p>

        <a
          href={FACEBOOK_PAGE}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full max-w-md mx-auto bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl mt-5 text-center"
        >
          👍 Visit Our Facebook Page
        </a>
      </section>

      <section className="mt-6 bg-zinc-950 border border-white/10 rounded-3xl p-5 text-center shadow-2xl">
        <h2 className="text-3xl font-black mb-3">Why Murky Waters?</h2>
        <p className="text-gray-300">
          Every bottle is built around high-quality ingredients, proven food sources and real on-the-bank testing. No gimmicks — just serious attraction.
        </p>

        <div className="grid grid-cols-2 gap-3 mt-5 text-sm">
          <div className="bg-black rounded-2xl p-4 border border-white/10">
            ✅ PVA Friendly
          </div>
          <div className="bg-black rounded-2xl p-4 border border-white/10">
            ✅ Premium Ingredients
          </div>
          <div className="bg-black rounded-2xl p-4 border border-white/10">
            ✅ Field Tested
          </div>
          <div className="bg-black rounded-2xl p-4 border border-white/10">
            ✅ Cheshire 40lber Proof
          </div>
        </div>
      </section>

      <section className="mt-6 bg-zinc-950 border border-white/10 rounded-3xl p-5 text-center shadow-2xl">
        <h2 className="text-3xl font-black mb-3">How To Order</h2>

        <div className="grid gap-3 text-left text-sm">
          <div className="bg-black rounded-2xl p-4 border border-white/10">
            1️⃣ Pick your flavours
          </div>
          <div className="bg-black rounded-2xl p-4 border border-white/10">
            2️⃣ Add your delivery details
          </div>
          <div className="bg-black rounded-2xl p-4 border border-white/10">
            3️⃣ Send your order on WhatsApp
          </div>
        </div>
      </section>

      <section className="mt-6 bg-zinc-950 border border-white/10 rounded-3xl p-5 text-center shadow-2xl">
        <h2 className="text-3xl font-black mb-3">Join The Murky Waters Team</h2>

        <p className="text-gray-300 mb-4">
          We’re building a small team of trusted anglers to represent Murky Waters on the bank.
        </p>

        <div className="grid gap-3 text-left text-sm">
          <div className="bg-black rounded-2xl p-4 border border-white/10">
            ✅ 20% off team member orders
          </div>
          <div className="bg-black rounded-2xl p-4 border border-white/10">
            ✅ Team socials throughout the year
          </div>
          <div className="bg-black rounded-2xl p-4 border border-white/10">
            ✅ Post catches to the Murky Waters page
          </div>
          <div className="bg-black rounded-2xl p-4 border border-white/10">
            ✅ Have Murky Waters in your bio
          </div>
        </div>

        <a
          href={teamLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full max-w-md mx-auto bg-pink-500 text-white font-black py-4 rounded-2xl mt-5 text-center"
        >
          Apply To Be A Team Member
        </a>
      </section>

      <section className="mt-6 bg-zinc-950 border border-white/10 rounded-3xl p-4">
        <h2 className="text-3xl font-black text-center mb-2">Build Your Order</h2>
        <p className="text-gray-400 text-center mb-5">
          Mix & match, or choose multiple of the same flavour.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
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

              <div className="mb-3 font-bold">{product}</div>

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
            ✅ MURKYWATERS20 applied — 20% off products
          </p>
        )}
      </section>

      <section className="mt-6 bg-zinc-950 border border-white/10 rounded-3xl p-5">
        <h2 className="text-3xl font-black text-center mb-4">Delivery Details</h2>

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
          placeholder="Email"
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

      <section className="mt-6 bg-zinc-950 border border-white/10 rounded-3xl p-5 text-center">
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

      <section className="mt-6 bg-zinc-950 border border-white/10 rounded-3xl p-5">
        <h2 className="text-3xl font-black text-center mb-4">FAQ</h2>

        <div className="space-y-3 text-sm text-gray-300">
          <div className="bg-black rounded-2xl p-4 border border-white/10">
            <strong>Is it PVA friendly?</strong>
            <p>Yes — Fishing Glooze is designed to be PVA friendly.</p>
          </div>

          <div className="bg-black rounded-2xl p-4 border border-white/10">
            <strong>Can I buy 3 of the same flavour?</strong>
            <p>Yes — mix & match or choose multiples of the same flavour.</p>
          </div>

          <div className="bg-black rounded-2xl p-4 border border-white/10">
            <strong>How much is postage?</strong>
            <p>UK postage is £3.50.</p>
          </div>

          <div className="bg-black rounded-2xl p-4 border border-white/10">
            <strong>How do I use it?</strong>
            <p>Add directly onto boilies, pellets, hookbaits, spod mix or groundbait.</p>
          </div>
        </div>
      </section>

      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/95 border-t border-white/10">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full max-w-md mx-auto bg-green-500 text-white font-black py-5 rounded-2xl text-xl text-center"
          >
            💬 Send Order on WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
