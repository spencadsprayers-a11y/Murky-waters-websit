import { useState } from "react";

const flavours = [
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
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [delivery, setDelivery] = useState("standard");

  const addFlavour = (f) => setCart([...cart, f]);

  const removeFlavour = (f) => {
    const i = cart.indexOf(f);
    if (i > -1) {
      const newArr = [...cart];
      newArr.splice(i, 1);
      setCart(newArr);
    }
  };

  const countFlavour = (f) => cart.filter((x) => x === f).length;

  const items = cart.length;

  const productPrice =
    items >= 3
      ? Math.floor(items / 3) * 20 + (items % 3) * 8
      : items * 8;

  const deliveryCost =
    delivery === "free" ? 0 : items >= 4 ? 0 : 3;

  const total = productPrice + deliveryCost;

  const orderMessage =
    cart.length > 0
      ? `Hi, I’d like: ${cart.join(", ")} | Total £${total} | Delivery: ${delivery}`
      : "Hi, I’m interested in Fishing Glooze";

  const facebookLink = `https://m.me/YOURPAGE?text=${encodeURIComponent(orderMessage)}`;

  const paypalLink = "PASTE_YOUR_PAYPAL_LINK_HERE";

  return (
    <div className="bg-black text-white min-h-screen px-4 pb-32 text-center">

      <h1 className="text-4xl font-black py-6">Fishing Glooze</h1>

      <p className="text-yellow-400 font-bold">
        🔥 3 FOR £20 or £8 each 🔥
      </p>

      {/* IMAGE */}
      <img
        src="/images/Product-range.png"
        className="mx-auto my-6 max-w-4xl rounded-xl"
      />

      {/* SHOP */}
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        {flavours.map((f) => {
          const count = countFlavour(f);

          return (
            <div key={f} className="border p-3 rounded-xl">
              <p className="font-bold">{f}</p>

              <div className="flex justify-center gap-2 mt-2">
                <button onClick={() => removeFlavour(f)} className="bg-gray-700 px-2">-</button>
                <span>{count}</span>
                <button onClick={() => addFlavour(f)} className="bg-pink-500 px-2">+</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* DELIVERY */}
      <div className="mt-6 bg-zinc-900 p-4 rounded-xl max-w-md mx-auto">
        <p className="font-bold mb-2">Delivery</p>

        <select
          value={delivery}
          onChange={(e) => setDelivery(e.target.value)}
          className="text-black p-2 rounded"
        >
          <option value="standard">Standard £3</option>
          <option value="free">Free (orders £30+)</option>
        </select>
      </div>

      {/* TOTAL */}
      <div className="mt-4 text-xl font-bold">
        Total: £{total}
      </div>

      {/* ACTIONS */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black border-t">

        {/* PAYPAL */}
        <a
          href={paypalLink}
          target="_blank"
          className="block bg-yellow-400 text-black font-bold py-3 rounded-xl mb-2"
        >
          Pay with PayPal (£{total})
        </a>

        {/* FACEBOOK */}
        <a
          href={facebookLink}
          target="_blank"
          className="block bg-pink-500 py-3 rounded-xl font-bold"
        >
          Order via Facebook
        </a>

      </div>
    </div>
  );
}
