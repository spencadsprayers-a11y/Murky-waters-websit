import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { totals, customer } = req.body;

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
            },
            unit_amount: Math.round(totals.finalTotal * 100),
          },
          quantity: 1,
        },
      ],

      success_url: `${req.headers.origin}?success=true`,
      cancel_url: `${req.headers.origin}?cancelled=true`,
    });

    res.status(200).json({
      url: session.url,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}
