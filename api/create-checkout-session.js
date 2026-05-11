import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: "Missing STRIPE_SECRET_KEY" });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { totals, customer, orderSummary } = req.body;

    const fullAddress = `${customer.address || ""}, ${customer.postcode || ""}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: customer.email,

      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "Murky Waters Order",
              description: `Order: ${orderSummary || ""} | Address: ${fullAddress}`,
            },
            unit_amount: Math.round(totals.finalTotal * 100),
          },
          quantity: 1,
        },
      ],

      metadata: {
        customer_name: customer.name || "",
        customer_email: customer.email || "",
        full_address: fullAddress,
        delivery_address: customer.address || "",
        postcode: customer.postcode || "",
        order_summary: orderSummary || "",
        products_total: String(totals.productTotal || ""),
        discount: String(totals.discountAmount || ""),
        delivery: String(totals.delivery || ""),
        final_total: String(totals.finalTotal || ""),
      },

      success_url: `${req.headers.origin}/?success=true`,
      cancel_url: `${req.headers.origin}/?cancelled=true`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
