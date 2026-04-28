import { useState } from "react";

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

  const liquidTotalItems = Object.values(quantities).reduce((a, b) => a + b, 0);

  const bundles = Math.floor(liquidTotalItems / 3);
  const singles = liquidTotalItems % 3;

  const liquidTotal = bundles * 20 + singles * 8;
  const pelletTotal = pelletQty * 8.5;

  const subtotal = liquidTotal + pelletTotal;

  const discountActive =
    discountCode.trim().toUpperCase() === "MURKYWATERS20";

  const discountAmount = discountActive ? subtotal * 0.2 : 0;
  const discountedTotal = subtotal - discountAmount;

  const postage =
    liquidTotalItems > 0 || pelletQty > 0
      ? pelletQty > 0
        ? 3.95
        : 3.5
      : 0;

  const finalTotal = discountedTotal + postage;

  const selectedText = [
    ...Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([name, qty]) => `${name} x${qty}`),
    ...(pelletQty > 0 ? [`2kg Pellet Bucket x${pelletQty}`] : []),
  ].join("\n");

  const whatsappMessage = `🔥 Murky Waters Order 🔥

${selectedText}

Products: £${subtotal.toFixed(2)}
Discount: £${discountAmount.toFixed(2)}
Postage: £${postage.toFixed(2)}

TOTAL: £${finalTotal.toFixed(2)}

Name: ${customer.name}
Address: ${customer.address}
Postcode: ${customer.postcode}`;

  const whatsappLink = `https://wa.me/447519223822?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="bg-black text-white min-h-screen px-4 pb-36">

      <section className="text-center py-10">
        <h1 className="text-5xl font-black">Murky Waters</h1>
        <p>3 for £20 • £8 each • + postage</p>
      </section>

      {/* LIQUIDS */}
      <section>
        {Object.keys(quantities).map((product) => (
          <div key={product}>
            {product}
            <button onClick={() => updateQty(product, -1)}>-</button>
            {quantities[product]}
            <button onClick={() => updateQty(product, 1)}>+</button>
          </div>
        ))}
      </section>

      {/* PELLETS */}
      <section className="mt-6">
        <h2>2kg Micro Mini Mix Pellet (£8.50)</h2>
        <button onClick={() => setPelletQty(Math.max(0, pelletQty - 1))}>
          -
        </button>
        {pelletQty}
        <button onClick={() => setPelletQty(pelletQty + 1)}>+</button>
      </section>

      {/* DISCOUNT */}
      <section className="mt-6">
        <input
          placeholder="Discount code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
        />
        {discountActive && <p>20% discount applied</p>}
      </section>

      {/* TOTAL */}
      <section className="mt-6">
        <p>Products: £{subtotal.toFixed(2)}</p>
        <p>Discount: £{discountAmount.toFixed(2)}</p>
        <p>Postage: £{postage.toFixed(2)}</p>

        <h2>Total: £{finalTotal.toFixed(2)}</h2>
      </section>

      {(liquidTotalItems > 0 || pelletQty > 0) && (
        <a href={whatsappLink} target="_blank">
          Order on WhatsApp
        </a>
      )}
    </div>
  );
}
