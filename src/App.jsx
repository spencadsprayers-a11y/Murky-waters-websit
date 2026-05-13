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

const powderPrices = {
  "Insect Meal 250g": 4.5,
  "Fructose 250g": 4.5,
  "Nut Blitz 250g": 4.5,
  "Bloodworm Granules 250g": 4.5,
};

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

  const [powders, setPowders] = useState({
    "Insect Meal 250g": 0,
    "Fructose 250g": 0,
    "Nut Blitz 250g": 0,
    "Bloodworm Granules 250g": 0,
  });

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
  const powderItems = Object.values(powders).reduce((a, b) => a + b, 0);
  const pelletItems = Object.values(pellets).reduce((a, b) => a + b, 0);

  const totalItems =
    gloozeItems + sprayItems + powderItems + pelletItems;

  const gloozeTotal =
    Math.floor(gloozeItems / 3) * 20 +
    (gloozeItems % 3) * 8;

  const sprayTotal =
    Math.floor(sprayItems / 2) * 6 +
    (sprayItems % 2) * 3.5;

  const powderTotal = Object.entries(powders).reduce(
    (sum, [name, qty]) =>
      sum + qty * powderPrices[name],
    0
  );

  const pelletTotal = Object.entries(pellets).reduce(
    (sum, [name, qty]) =>
      sum + qty * pelletPrices[name],
    0
  );

  const productTotal =
    gloozeTotal +
    sprayTotal +
    powderTotal +
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
          Fishing Glooze, sprays, powders and pellets built for proper results.
        </p>

      </section>

      {/* GLOOZE */}

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

      {/* SPRAYS */}

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

      {/* BOOSTER POWDERS */}

      <section className="mt-6 rounded-3xl border border-green-500/20 bg-zinc-950 p-4">

        <h2 className="text-center text-3xl font-black">
          250g Booster Powders
        </h2>

        <div className="mt-5 grid grid-cols-2 gap-4">
          {Object.keys(powders).map((item) => (
            <ProductCard
              key={item}
              name={item}
              qty={powders[item]}
              price="£4.50 each"
              onMinus={() =>
                updateQty(setPowders, item, -1)
              }
              onPlus={() =>
                updateQty(setPowders, item, 1)
              }
            />
          ))}
        </div>

      </section>
    </div>
  );
}
