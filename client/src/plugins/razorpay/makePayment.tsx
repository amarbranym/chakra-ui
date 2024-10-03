/* eslint-disable @typescript-eslint/no-explicit-any */
// services/razorpay/makePayment.ts
import initializeRazorpay from "./initialize";

const makePayment = async ({ name, email, contact }: any, onSuccess: any) => {
  // debugger  
  const res = await initializeRazorpay();

  if (!res) {
    alert("Razorpay SDK failed to load");
    return;
  }

  try {
    const response = await fetch("/api/razorpay", { method: "POST" });
    const data = await response.json();


    const options = {
      key: "rzp_test_9jlIesdHxBZJx8",
      name: "bemployed",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Payment for bemployed services",
      handler: function (response: any) {
        // console.log("Payment response:", response);
        if (onSuccess) onSuccess(response);
      },
      prefill: {
        name: name,
        email: email,
        contact: contact,
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  } catch (error) {
    console.error("Payment initiation failed:", error);
    alert("Payment initiation failed. Please try again.");
  }
};

export default makePayment;
