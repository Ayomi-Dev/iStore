import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import type { FC, ReactNode } from "react";

const stripeSecretKey = import.meta.env.VITE_STRIPE_KEY;

if (!stripeSecretKey) {
  throw new Error("Stripe secret key is not defined in environment variables.");
}
const stripePromise = loadStripe(stripeSecretKey);

export const StripeProvider: FC<{children : ReactNode}> = ({ children }) => {
    return (
        <Elements stripe={stripePromise}>
            { children }
        </Elements>
    );
};

