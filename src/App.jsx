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
  "Robin Garlic",
  "Maple Cream",
  "Maple Mulberry",
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

const wafters = [
  {
    name: "12mm Pineapple Dream Fluro Yellow Wafters",
    price: 5,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "15mm/12mm Sweet Mango Black Pepper Fluro Orange Wafters",
    price: 5,
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "15mm/12mm Squid & Octopus Pink Wafters",
    price: 5,
    image:
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1200&auto=format&fit=crop",
  },
];

const pellets = [
  {
    name: "3kg Micro Mini Mix Pellets",
    price: 13.5,
  },
  {
    name: "3kg 6mm Halibut Pellets",
    price: 11.5,
  },
];

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const total = cart.reduce((a, b) => a + b.price, 0);

  return (
    <div className="bg-black min-h-screen text-white p-4">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-orange-500 mb-3">
            MURKY WATERS
          </h1>

          <p className="text-xl text-gray-300 mb-6">
            Premium Carp Bait
          </p>

          <div className="bg-zinc-900 border border-orange-500 rounded-3xl p-6 shadow-2xl">
            <div className="space-y-4">

              <div className="bg-yellow-400 text-black font-bold py-4 rounded-xl text-xl">
                Glooze 3 for £20
              </div>

              <div className="bg-pink-500 text-white font-bold py-4 rounded-xl text-xl">
                Sprays 3 for £8
              </div>

              <div className="bg-orange-500 text-white font-bold py-4 rounded-xl text-xl">
                Wafters £5 Per Pot
              </div>

              <div className="bg-zinc-800 text-white font-bold py-4 rounded-xl text-xl">
                Pellets from £11.50
              </div>

              <a
                href={FACEBOOK_PAGE}
                target="_blank"
                rel="noreferrer"
              >
                <button className="w-full bg-blue-600 hover:bg-blue-700 transition-all py-4 rounded-xl font-bold text-lg">
                  Visit Our Facebook Page
                </button>
              </a>

            </div>
          </div>
        </div>

        {/* GLOOZE SECTION */}

        <h2 className="text-4xl font-bold mb-6 text-orange-400">
          Fishing Glooze
        </h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {gloozeFlavours.map((flavour, index) => (
            <div
              key={index}
              className="bg-zinc-900 rounded-3xl overflow-hidden border border-orange-500 shadow-xl"
            >
              <div className="h-52 bg-gradient-to-br from-orange-600 to-black flex items-center justify-center">
                <h3 className="text-3xl font-black text-center px-4">
                  {flavour}
                </h3>
              </div>

              <div className="p-5">
                <p className="text-lg mb-4 text-gray-300">
                  Premium PVA Friendly Fishing Glooze
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-orange-400">
                    £8
                  </span>

                  <button
                    onClick={() =>
                      addToCart({
                        name: flavour,
                        price: 8,
                      })
                    }
                    className="bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-xl font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* WAFTERS */}

        <h2 className="text-4xl font-bold mb-6 text-pink-400">
          Wafters
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {wafters.map((item, index) => (
            <div
              key={index}
              className="bg-zinc-900 rounded-3xl overflow-hidden border border-pink-500 shadow-xl"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-60 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-2xl font-bold mb-3">
                  {item.name}
                </h3>

                <p className="text-gray-300 mb-4">
                  Premium balanced hookbaits with serious attraction.
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-pink-400">
                    £{item.price}
                  </span>

                  <button
                    onClick={() => addToCart(item)}
                    className="bg-pink-500 hover:bg-pink-600 px-5 py-3 rounded-xl font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOOSTER SPRAYS */}

        <h2 className="text-4xl font-bold mb-6 text-yellow-400">
          Booster Sprays
        </h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {sprayFlavours.map((spray, index) => (
            <div
              key={index}
              className="bg-zinc-900 rounded-3xl overflow-hidden border border-yellow-400 shadow-xl"
            >
              <div className="h-52 bg-gradient-to-br from-yellow-500 to-black flex items-center justify-center">
                <h3 className="text-3xl font-black text-center px-4 text-black">
                  {spray}
                </h3>
              </div>

              <div className="p-5">
                <p className="text-lg mb-4 text-gray-300">
                  Hookbait Booster Spray
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-yellow-400">
                    £3
                  </span>

                  <button
                    onClick={() =>
                      addToCart({
                        name: spray,
                        price: 3,
                      })
                    }
                    className="bg-yellow-400 text-black hover:bg-yellow-500 px-5 py-3 rounded-xl font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PELLETS */}

        <h2 className="text-4xl font-bold mb-6 text-green-400">
          Pellets
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {pellets.map((pellet, index) => (
            <div
              key={index}
              className="bg-zinc-900 rounded-3xl overflow-hidden border border-green-500 shadow-xl"
            >
              <div className="h-52 bg-gradient-to-br from-green-600 to-black flex items-center justify-center">
                <h3 className="text-3xl font-black text-center px-4">
                  {pellet.name}
                </h3>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-400">
                    £{pellet.price}
                  </span>

                  <button
                    onClick={() => addToCart(pellet)}
                    className="bg-green-500 hover:bg-green-600 px-5 py-3 rounded-xl font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CART */}

        <div className="fixed bottom-4 right-4 bg-orange-500 text-black p-5 rounded-2xl shadow-2xl w-72">
          <h2 className="font-black text-2xl mb-3">
            Basket
          </h2>

          <div className="max-h-48 overflow-y-auto mb-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-sm mb-2"
              >
                <span>{item.name}</span>
                <span>£{item.price}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-black pt-3">
            <div className="flex justify-between font-black text-xl">
              <span>Total:</span>
              <span>£{total.toFixed(2)}</span>
            </div>

            <button className="w-full mt-4 bg-black text-white py-3 rounded-xl font-bold hover:bg-zinc-800">
              Pay Securely
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
