import { useState } from "react";

const FACEBOOK_PAGE = "https://www.facebook.com/share/18jdHNeNu4/";
const WHATSAPP_NUMBER = "447519223822";
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

const pellets = [
  { name: "3kg Micro Mini Mix Pellets", price: 13.5 },
  { name: "3kg 6mm Halibut Pellets", price: 11.5 },
];

const baitIngredients = [
  { name: "Insect Meal 250g", price: 4.5 },
  { name: "Fructose 250g", price: 4.5 },
  { name: "Nut Blitz 250g", price: 4.5 },
  { name: "Bloodworm Granules 250g", price: 4.5 },
];

export default function App() {
  const [discountCode, setDiscountCode] = useState("");
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    postcode: "",
    email: "",
    notes: "",
  });

  const [cart, setCart] = useState({});

  const add = (name) => setCart((p) => ({ ...p, [name]: (p[name] || 0) + 1 }));
  const remove = (name) =>
    setCart((p) => ({ ...p, [name]: Math.max((p[name] || 0) - 1, 0) }));

  const qty = (name) => cart[name] || 0;

  const gloozeQty = gloozeFlavours.reduce((s, n) => s + qty(`Glooze - ${n}`), 0);
  const sprayQty = sprayFlavours.reduce((s, n) => s + qty(`Booster Spray - ${n}`), 0);
  const pelletQty = pellets.reduce((s, p) => s + qty(p.name), 0);
  const ingredientQty = baitIngredients.reduce((s, p) => s + qty(p.name), 0);

  const gloozeTotal = Math.floor(gloozeQty / 3) * 20 + (gloozeQty % 3) * 8;
  const sprayTotal = Math.floor(sprayQty / 3) * 8 + (sprayQty % 3) * 3.25;
  const pelletTotal = pellets.reduce((s, p) => s + qty(p.name) * p.price, 0);
  const ingredientTotal = baitIngredients.reduce((s, p) => s + qty(p.name) * p.price, 0);

  const productTotal = gloozeTotal + sprayTotal + pelletTotal + ingredientTotal;
  const totalItems = gloozeQty + sprayQty + pelletQty + ingredientQty;

  const discountActive = discountCode.trim().toUpperCase() === TEAM_CODE;
  const discount = discountActive ? productTotal * 0.2 : 0;

  const delivery = totalItems === 0 ? 0 : pelletQty > 0 ? 3.95 : 3.5;
  const finalTotal = productTotal - discount + delivery;

  const orderLines = Object.entries(cart)
    .filter(([, q]) => q > 0)
    .map(([n, q]) => `${n} x${q}`)
    .join("%0A");

  const whatsappText = `Murky Waters Order%0A%0A${orderLines}%0A%0AProducts: £${productTotal.toFixed(
    2
  )}%0ADiscount: £${discount.toFixed(2)}%0ADelivery: £${delivery.toFixed(
    2
  )}%0ATotal: £${finalTotal.toFixed(2)}%0A%0AName: ${customer.name}%0AAddress: ${
    customer.address
  }%0APostcode: ${customer.postcode}%0AEmail: ${customer.email}%0ANotes: ${
    customer.notes
  }`;

  const ProductCard = ({ name, price, tag }) => (
    <div className="rounded-3xl border border-white/10 bg-zinc-950 p-4 text-center shadow-xl">
      <div className="mb-4 flex h-28 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500/30 via-black to-pink-500/20">
        <span className="text-4xl">🎣</span>
      </div>
      {tag && (
        <p className="mb-2 rounded-full bg-yellow-400 px-3 py-1 text-xs font-black text-black">
          {tag}
        </p>
      )}
      <h3 className="text-lg font-black">{name}</h3>
      <p className="mt-2 text-xl font-black text-yellow-400">{price}</p>
      <div className="mt-4 flex items-center justify-center gap-5">
        <button onClick={() => remove(name)} className="h-12 w-12 rounded-xl bg-zinc-800 text-2xl font-black">
          -
        </button>
        <span className="text-3xl font-black">{qty(name)}</span>
        <button onClick={() => add(name)} className="h-12 w-12 rounded-xl bg-yellow-400 text-2xl font-black text-black">
          +
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black px-4 pb-36 text-white">
      <section className="rounded-b-[2rem] border border-yellow-500/20 bg-gradient-to-b from-yellow-900/40 to-black p-8 text-center">
        <p className="tracking-[0.5em] text-yellow-400">MURKY WATERS</p>
        <h1 className="mt-4 text-5xl font-black">Premium Carp Bait</h1>
        <p className="mt-4 text-lg text-gray-300">
          Fishing Glooze, booster sprays, pellets and bait ingredients built for proper results.
        </p>

        <div className="mt-8 grid gap-4">
          <div className="rounded-2xl bg-yellow-400 p-5 text-xl font-black text-black">Glooze 3 for £20</div>
          <div className="rounded-2xl bg-pink-500 p-5 text-xl font-black">Sprays 3 for £8</div>
          <div className="rounded-2xl bg-orange-500 p-5 text-xl font-black">Wafters Coming Soon</div>
          <div className="rounded-2xl bg-zinc-900 p-5 text-xl font-black">Pellets from £11.50</div>
        </div>

        <a href={FACEBOOK_PAGE} className="mt-8 block rounded-2xl bg-blue-600 p-5 text-xl font-black">
          👍 Visit Our Facebook Page
        </a>
      </section>

      <section className="mt-6 rounded-3xl border border-yellow-500/20 bg-zinc-950 p-5 text-center">
        <h2 className="text-3xl font-black">Why Murky Waters?</h2>
        <p className="mt-3 text-gray-300">
          Premium bait products designed to create attraction, confidence and results on the bank.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {["PVA Friendly", "Boosts Attraction", "All Year Round", "Proven Results"].map((x) => (
            <div key={x} className="rounded-2xl bg-black p-4 font-bold">✅ {x}</div>
          ))}
        </div>
      </section>

      <Section title="Fishing Glooze" subtitle="£8 each or 3 for £20 — mix & match">
        {gloozeFlavours.map((f) => (
          <ProductCard key={f} name={`Glooze - ${f}`} price="£8 each" />
        ))}
      </Section>

      <Section title="25ml Booster Sprays" subtitle="£3.25 each or 3 for £8 — for hookbaits only">
        {sprayFlavours.map((f) => (
          <ProductCard key={f} name={`Booster Spray - ${f}`} price="£3.25 each" />
        ))}
      </Section>

      <Section title="Pellet Buckets" subtitle="3kg buckets — delivery £3.95">
        {pellets.map((p) => (
          <ProductCard key={p.name} name={p.name} price={`£${p.price.toFixed(2)} each`} />
        ))}
      </Section>

      <Section title="Bait Ingredients" subtitle="Premium bait-making ingredients">
        {baitIngredients.map((p) => (
          <ProductCard key={p.name} name={p.name} price={`£${p.price.toFixed(2)} each`} />
        ))}
      </Section>

      <section className="mt-6 rounded-3xl border border-white/10 bg-zinc-950 p-5">
        <h2 className="text-center text-3xl font-black">Discount Code</h2>
        <input
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          placeholder="Discount code"
          className="mt-4 w-full rounded-2xl bg-black p-4 text-center uppercase text-white"
        />
        {discountActive && (
          <p className="mt-3 text-center font-bold text-green-400">
            ✅ 20% team discount applied to products only
          </p>
        )}
      </section>

      <section className="mt-6 rounded-3xl border border-white/10 bg-zinc-950 p-5">
        <h2 className="text-center text-3xl font-black">Delivery Details</h2>
        {["name", "postcode", "email"].map((field) => (
          <input
            key={field}
            placeholder={field.toUpperCase()}
            value={customer[field]}
            onChange={(e) => setCustomer({ ...customer, [field]: e.target.value })}
            className="mt-3 w-full rounded-2xl bg-black p-4 text-white"
          />
        ))}
        <textarea
          placeholder="FULL DELIVERY ADDRESS"
          value={customer.address}
          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
          className="mt-3 w-full rounded-2xl bg-black p-4 text-white"
        />
        <textarea
          placeholder="NOTES"
          value={customer.notes}
          onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
          className="mt-3 w-full rounded-2xl bg-black p-4 text-white"
        />
      </section>

      <section className="mt-6 rounded-3xl border border-yellow-500/20 bg-zinc-950 p-5">
        <h2 className="text-center text-3xl font-black">Order Summary</h2>
        <div className="mt-4 space-y-2 text-lg">
          <Row label="Products" value={`£${productTotal.toFixed(2)}`} />
          <Row label="Discount" value={`-£${discount.toFixed(2)}`} />
          <Row label="Delivery" value={`£${delivery.toFixed(2)}`} />
        </div>
        <p className="mt-5 text-center text-5xl font-black text-green-400">
          £{finalTotal.toFixed(2)}
        </p>
      </section>

      <section className="mt-6 rounded-3xl border border-white/10 bg-zinc-950 p-5">
        <h2 className="text-center text-3xl font-black">FAQ</h2>
        <FAQ q="Are your products PVA friendly?" a="Yes, the Glooze and bait products are designed to be PVA friendly." />
        <FAQ q="Do team members get discount?" a="Yes, team members get 20% off products using MURKYWATERS20. Delivery is excluded." />
        <FAQ q="How much is delivery?" a="Liquid orders are £3.50 delivery. Pellet orders are £3.95 delivery." />
        <FAQ q="How do I order?" a="Add your products, fill in your details, then send the order through WhatsApp." />
      </section>

      <footer className="mt-8 pb-10 text-center text-sm text-gray-400">
        <p className="font-black text-white">Murky Waters</p>
        <p>Quality bait • Proven results</p>
        <p className="mt-2">Instagram: @murkywaters.glooze</p>
        <p className="mt-2">Privacy Policy • Delivery Info • Returns • Terms</p>
      </footer>

      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 border-t border-yellow-500/30 bg-black p-4">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}
            className="mx-auto block max-w-md rounded-2xl bg-green-500 p-5 text-center text-xl font-black"
          >
            💬 Send Order • £{finalTotal.toFixed(2)}
          </a>
        </div>
      )}
    </div>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-zinc-950 p-4">
      <h2 className="text-center text-3xl font-black">{title}</h2>
      <p className="mb-5 mt-2 text-center text-gray-400">{subtitle}</p>
      <div className="grid grid-cols-2 gap-4">{children}</div>
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

function FAQ({ q, a }) {
  return (
    <div className="mt-4 rounded-2xl bg-black p-4">
      <p className="font-black">{q}</p>
      <p className="mt-1 text-gray-400">{a}</p>
    </div>
  );
}
