import { useState } from "react";

const STRIPE_SINGLE = "https://buy.stripe.com/9B65kF3Sv19L07l4TM9AA03";
const STRIPE_BUNDLE = "https://buy.stripe.com/aFa00l60D9Ghf2f71U9AA04";

export default function App() {
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

  const total =
    totalItems === 0 ? 0 : bundles * 23.5 + (singles > 0 ? 11.5 : 0);

  const selectedText = Object.entries(quantities)
    .filter(([_, qty]) => qty > 0)
    .map(([name, qty]) => `${name} x${qty}`)
    .join("\n");

  const customerText = `Name: ${customer.name}
Address: ${customer.address}
Postcode: ${customer.postcode}
Email: ${customer.email}
Notes: ${customer.notes || "None"}`;

  const whatsappMessage = `🔥 Murky Waters Order 🔥

${selectedText}

Items: ${totalItems}
Total Paid: £${total.toFixed(2)}

Customer Details:
${customerText}`;

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

      {/* TEAM SECTION */}
      <section className="mt-6 bg-zinc-950 border border-white/10 rounded-3xl p-5 text-center shadow-2xl">
        <h2 className="text-3xl font-black mb-3">
          Join The Murky Waters Team
        </h2>

        <p className="text-gray-300 mb-4">
          We’re building a small team of trusted anglers to represent Murky Waters on the bank.
        </p>

        <div className="grid gap-3 text-left text-sm">
          <div className="bg-black rounded-2xl p-4 border border-white/10">
            ✅ 20% team discount on orders
          </div>

          <div className="bg-black rounded-2xl p-4 border border-white/10">
            ✅ Team socials throughout the year
          </div>

          <div className="bg-black rounded-2xl p-4 border border-white/10">
            ✅ Featured on our page
          </div>
        </div>

        <a
          href={`https://wa.me/447519223822?text=${encodeURIComponent(
            "Hi, I’m interested in joining the Murky Waters team."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full max-w-md mx-auto bg-pink-500 text-white font-black py-4 rounded-2xl mt-5"
        >
          Apply To Join The Team
        </a>
      </section>

      {/* PRODUCTS */}
      <section className="mt-6 bg-zinc-950 border border-white/10 rounded-3xl p-4">
        <h2 className="text-3xl font-black text-center mb-5">
          Build Your Order
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product} className="rounded-2xl p-4 text-center border">
              <div className="mb-3 font-bold">{product}</div>

              <div className="flex justify-center gap-3">
                <button onClick={() => updateQty(product, -1)}>-</button>
                <span>{quantities[product]}</span>
                <button onClick={() => updateQty(product, 1)}>+</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section className="mt-6 bg-zinc-950 p-5 rounded-3xl">
        <input placeholder="Name" onChange={(e)=>updateCustomer("name",e.target.value)} className="w-full p-3 mb-2"/>
        <textarea placeholder="Address" onChange={(e)=>updateCustomer("address",e.target.value)} className="w-full p-3 mb-2"/>
        <input placeholder="Postcode" onChange={(e)=>updateCustomer("postcode",e.target.value)} className="w-full p-3 mb-2"/>
        <input placeholder="Email" onChange={(e)=>updateCustomer("email",e.target.value)} className="w-full p-3 mb-2"/>
      </section>

      {/* TOTAL */}
      <section className="mt-6 text-center">
        <div className="text-4xl font-black">£{total.toFixed(2)}</div>
      </section>

      {/* BUTTONS */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-black">
          <button onClick={handleStripeCheckout} className="w-full bg-white text-black py-4 mb-2">
            Pay Securely
          </button>

          <a href={whatsappLink} target="_blank" className="w-full block bg-green-500 text-white py-4 text-center">
            Send Order
          </a>
        </div>
      )}
    </div>
  );
}
