import { useState } from "react";

const FACEBOOK_PAGE = "https://www.facebook.com/share/18jdHNeNu4/";
const TEAM_CODE = "MURKYWATERS20";

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

const pelletProducts = [
  { name: "3kg Micro Mini Mix Pellets", price: 13.5, tag: "Perfect for PVA Bags" },
  { name: "3kg 6mm Halibut Pellets", price: 11.5, tag: "Strong Food Signal" },
];

const powderProducts = [
  { name: "Insect Meal 250g", price: 4.5 },
  { name: "Fructose 250g", price: 4.5 },
  { name: "Nut Blitz 250g", price: 4.5 },
  { name: "Bloodworm Granules 250g", price: 4.5 },
];

const wafterProducts = [
  { name: "12mm Pineapple Dream Fluro Yellow Wafters", price: 6, tag: "Fluro Yellow" },
  { name: "15mm/12mm Sweet Mango Black Pepper Fluro Orange Wafters", price: 6, tag: "Fluro Orange" },
  { name: "15mm/12mm Squid & Octopus Pink Wafters", price: 6, tag: "Pink Pot" },
];

const boilieProducts = [
  { name: "1kg Sweet Mango Black Pepper Boilies 15mm", price: 10, tag: "HNV Food Source" },
];

export default function App() {
  const [cart, setCart] = useState({});
  const [discountCode, setDiscountCode] = useState("");
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    postcode: "",
    email: "",
    notes: "",
  });

  const qty = (name) => cart[name] || 0;

  const add = (name) => {
    setCart((prev) => ({ ...prev, [name]: (prev[name] || 0) + 1 }));
  };

  const remove = (name) => {
    setCart((prev) => ({
      ...prev,
      [name]: Math.max((prev[name] || 0) - 1, 0),
    }));
  };

  const gloozeQty = gloozeFlavours.reduce(
    (sum, f) => sum + qty(`Glooze - ${f}`),
    0
  );

  const sprayQty = sprayFlavours.reduce(
    (sum, f) => sum + qty(`Booster Spray - ${f}`),
    0
  );

  const pelletQty = pelletProducts.reduce(
    (sum, p) => sum + qty(p.name),
    0
  );

  const powderQty = powderProducts.reduce(
    (sum, p) => sum + qty(p.name),
    0
  );

  const wafterQty = wafterProducts.reduce(
    (sum, p) => sum + qty(p.name),
    0
  );

  const boilieQty = boilieProducts.reduce(
    (sum, p) => sum + qty(p.name),
    0
  );

  const gloozeTotal =
    Math.floor(gloozeQty / 3) * 20 + (gloozeQty % 3) * 8;

  const sprayTotal =
    Math.floor(sprayQty / 3) * 8 + (sprayQty % 3) * 3.25;

  const pelletTotal = pelletProducts.reduce(
    (sum, p) => sum + qty(p.name) * p.price,
    0
  );

  const powderTotal = powderProducts.reduce(
    (sum, p) => sum + qty(p.name) * p.price,
    0
  );

  const wafterTotal = wafterProducts.reduce(
    (sum, p) => sum + qty(p.name) * p.price,
    0
  );

  const boilieTotal = boilieProducts.reduce(
    (sum, p) => sum + qty(p.name) * p.price,
    0
  );

  const productTotal =
    gloozeTotal +
    sprayTotal +
    pelletTotal +
    powderTotal +
    wafterTotal +
    boilieTotal;

  const totalItems =
    gloozeQty +
    sprayQty +
    pelletQty +
    powderQty +
    wafterQty +
    boilieQty;

  const discountActive =
    discountCode.trim().toUpperCase() === TEAM_CODE;

  const discountAmount = discountActive
    ? productTotal * 0.2
    : 0;

  const delivery =
    totalItems === 0
      ? 0
      : pelletQty > 0
      ? 3.95
      : 3.5;

  const finalTotal =
    productTotal - discountAmount + delivery;

  const orderSummary = Object.entries(cart)
    .filter(([, amount]) => amount > 0)
    .map(([name, amount]) => `${name} x${amount}`)
    .join("\n");

  const handleCheckout = async () => {
    if (totalItems === 0) {
      alert("Please add products before checkout.");
      return;
    }

    if (
      !customer.name ||
      !customer.phone ||
      !customer.address ||
      !customer.postcode ||
      !customer.email
    ) {
      alert("Please complete all customer details.");
      return;
    }

    try {
      const res = await fetch("/api/create-checkout-session", {
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
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Payment error.");
      }
    } catch (error) {
      alert("Payment error.");
    }
  };

  const ProductCard = ({ name, price, tag }) => (
    <div className="rounded-3xl border border-white/10 bg-zinc-950 p-4 text-center shadow-xl">
      <div className="mb-4 flex h-28 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500/30 via-black to-pink-500/20">
        <span className="text-4xl">🎣</span>
      </div>

      {tag && (
        <div className="mb-3 rounded-full bg-yellow-400 px-3 py-1 text-xs font-black text-black">
          {tag}
        </div>
      )}

      <h3 className="text-lg font-black leading-tight">
        {name}
      </h3>

      <p className="mt-2 text-xl font-black text-yellow-400">
        {price}
      </p>

      <div className="mt-5 flex items-center justify-center gap-5">
        <button
          onClick={() => remove(name)}
          className="h-12 w-12 rounded-xl bg-zinc-800 text-2xl font-black"
        >
          -
        </button>

        <span className="min-w-8 text-3xl font-black">
          {qty(name)}
        </span>

        <button
          onClick={() => add(name)}
          className="h-12 w-12 rounded-xl bg-yellow-400 text-2xl font-black text-black"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black px-4 pb-40 text-white">

      <section className="rounded-b-[2rem] border border-yellow-500/20 bg-gradient-to-b from-yellow-900/40 to-black p-8 text-center">

        <p className="text-xs font-black tracking-[0.5em] text-yellow-400">
          MURKY WATERS
        </p>

        <h1 className="mt-4 text-5xl font-black leading-tight">
          Premium Carp Bait
        </h1>

        <p className="mt-4 text-lg text-gray-300">
          Fishing Glooze, booster sprays, pellets and bait ingredients built for proper results.
        </p>

        <div className="mt-8 grid gap-4">

          <div className="rounded-2xl bg-yellow-400 p-5 text-xl font-black text-black">
            Glooze 3 for £20
          </div>

          <div className="rounded-2xl bg-pink-500 p-5 text-xl font-black">
            Sprays 3 for £8
          </div>

          <div className="rounded-2xl bg-orange-500 p-5 text-xl font-black">
            Wafters £6 Per Pot
          </div>

          <div className="rounded-2xl bg-zinc-900 p-5 text-xl font-black">
            Pellets from £11.50
          </div>

        </div>

        <a
          href={FACEBOOK_PAGE}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 block rounded-2xl bg-blue-600 p-5 text-xl font-black"
        >
          👍 Visit Our Facebook Page
        </a>

      </section>

      <Section title="Fishing Glooze">
        {gloozeFlavours.map((item) => (
          <ProductCard
            key={item}
            name={`Glooze - ${item}`}
            price="£8 each"
          />
        ))}
      </Section>

      <Section title="25ml Booster Sprays">
        {sprayFlavours.map((item) => (
          <ProductCard
            key={item}
            name={`Booster Spray - ${item}`}
            price="£3.25 each"
          />
        ))}
      </Section>

      <Section title="Pellet Buckets">
        {pelletProducts.map((item) => (
          <ProductCard
            key={item.name}
            name={item.name}
            price={`£${item.price.toFixed(2)} each`}
            tag={item.tag}
          />
        ))}
      </Section>

      <Section title="Bait Powders">
        {powderProducts.map((item) => (
          <ProductCard
            key={item.name}
            name={item.name}
            price={`£${item.price.toFixed(2)} each`}
          />
        ))}
      </Section>

      <Section title="Wafters">
        {wafterProducts.map((item) => (
          <ProductCard
            key={item.name}
            name={item.name}
            price={`£${item.price.toFixed(2)} each`}
            tag={item.tag}
          />
        ))}
      </Section>

      <Section title="Boilies">
        {boilieProducts.map((item) => (
          <ProductCard
            key={item.name}
            name={item.name}
            price={`£${item.price.toFixed(2)} each`}
            tag={item.tag}
          />
        ))}
      </Section>

      <section className="mt-6 rounded-3xl border border-white/10 bg-zinc-950 p-5">

        <h2 className="text-center text-3xl font-black">
          Discount Code
        </h2>

        <input
          value={discountCode}
          onChange={(e) =>
            setDiscountCode(e.target.value)
          }
          placeholder="Enter discount code"
          className="mt-4 w-full rounded-2xl border border-white/10 bg-black p-4 text-center uppercase text-white"
        />

        {discountActive && (
          <p className="mt-3 text-center font-bold text-green-400">
            ✅ Discount Applied
          </p>
        )}

      </section>

      <section className="mt-6 rounded-3xl border border-white/10 bg-zinc-950 p-5">

        <h2 className="text-center text-3xl font-black">
          Delivery Details
        </h2>

        <input
          placeholder="Full name"
          value={customer.name}
          onChange={(e) =>
            setCustomer({
              ...customer,
              name: e.target.value,
            })
          }
          className="mt-4 w-full rounded-2xl border border-white/10 bg-black p-4 text-white"
        />

        <input
          placeholder="Phone number"
          value={customer.phone}
          onChange={(e) =>
            setCustomer({
              ...customer,
              phone: e.target.value,
            })
          }
          className="mt-3 w-full rounded-2xl border border-white/10 bg-black p-4 text-white"
        />

        <textarea
          placeholder="Full delivery address"
          value={customer.address}
          onChange={(e) =>
            setCustomer({
              ...customer,
              address: e.target.value,
            })
          }
          className="mt-3 w-full rounded-2xl border border-white/10 bg-black p-4 text-white"
        />

        <input
          placeholder="Postcode"
          value={customer.postcode}
          onChange={(e) =>
            setCustomer({
              ...customer,
              postcode: e.target.value,
            })
          }
          className="mt-3 w-full rounded-2xl border border-white/10 bg-black p-4 text-white"
        />

        <input
          placeholder="Email address"
          value={customer.email}
          onChange={(e) =>
            setCustomer({
              ...customer,
              email: e.target.value,
            })
          }
          className="mt-3 w-full rounded-2xl border border-white/10 bg-black p-4 text-white"
        />

        <textarea
          placeholder="Notes / special requests"
          value={customer.notes}
          onChange={(e) =>
            setCustomer({
              ...customer,
              notes: e.target.value,
            })
          }
          className="mt-3 w-full rounded-2xl border border-white/10 bg-black p-4 text-white"
        />

      </section>

      <section className="mt-6 rounded-3xl border border-yellow-500/20 bg-zinc-950 p-5">

        <h2 className="text-center text-3xl font-black">
          Order Summary
        </h2>

        <div className="mt-5 space-y-3 text-lg">
          <Row
            label="Products"
            value={`£${productTotal.toFixed(2)}`}
          />

          <Row
            label="Discount"
            value={`-£${discountAmount.toFixed(2)}`}
          />

          <Row
            label="Delivery"
            value={`£${delivery.toFixed(2)}`}
          />
        </div>

        <p className="mt-5 text-center text-5xl font-black text-green-400">
          £{finalTotal.toFixed(2)}
        </p>

      </section>

      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 border-t border-yellow-500/30 bg-black p-4">

          <button
            onClick={handleCheckout}
            className="mx-auto block w-full max-w-md rounded-2xl bg-yellow-400 p-5 text-center text-xl font-black text-black"
          >
            🔒 Secure Checkout • £{finalTotal.toFixed(2)}
          </button>

        </div>
      )}

    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-zinc-950 p-4">
      <h2 className="mb-5 text-center text-3xl font-black">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {children}
      </div>
    </section>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b border-white/10 pb-2">
      <span>{label}</span>
      <span className="font-black">{value}</span>
    </div>
  );
}
