import React from "react";

const TermsAndConditions = () => {
    return (
        <div className="lg:max-w-4xl mx-auto">
            {/* <h2 className="text-4xl font-semibold text-center font-serif mt-4 mb-2">CoolPoint Resort</h2> */}

            <section className=" ">
                <h3 className="text-xl font-bold mb-2">1. Online Payment Terms</h3>
                <ul className="list-disc pl-6 space-y-1">
                    <li>All online payments must be made through the official CoolPoint Resort website.</li>
                    <li>Payment methods accepted include credit/debit cards, online banking, and other methods listed on our website.</li>
                    <li>Full payment is required at the time of booking to secure your reservation.</li>
                    <li>All transactions are processed in [currency]. Conversion rates or additional fees from your payment provider are your responsibility.</li>
                    <li>CoolPoint Resort is not responsible for delays or failures in payment processing due to third-party systems.</li>
                </ul>
            </section>

            <section className="mt-6">
                <h3 className="text-xl font-bold mb-2">2. Submission of Valid Receipts</h3>
                <ul className="list-disc pl-6 space-y-1">
                    <li>After completing an online payment, submit a valid receipt or transaction proof to confirm your reservation.</li>
                    <li>Receipts must include the payer's name, transaction ID, date of payment, and amount paid.</li>
                    <li>Receipts can be submitted via email to [official email] or uploaded on the reservation confirmation page.</li>
                    <li>Incomplete or unclear receipts may delay booking confirmation.</li>
                </ul>
            </section>

            <section className="mt-6">
                <h3 className="text-xl font-bold mb-2">3. Cancellation and Refund Policy</h3>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Refunds, if applicable, will only be processed after validating the original payment receipt.</li>
                    <li>Refunds may take up to 2-5 business days, depending on the payment method used.</li>
                </ul>
            </section>

            <section className="mt-6">
                <h3 className="text-xl font-bold mb-2">4. Liability</h3>
                <ul className="list-disc pl-6 space-y-1">
                    <li>CoolPoint Resort is not liable for unauthorized use of your payment information.</li>
                    <li>The resort reserves the right to cancel bookings if payment is not received on time or fraudulent activity is detected.</li>
                </ul>
            </section>

            <section className="mt-6">
                <h3 className="text-xl font-bold mb-2">5. Changes to Terms</h3>
                <ul className="list-disc pl-6 space-y-1">
                    <li>CoolPoint Resort reserves the right to modify these terms at any time without prior notice.</li>
                    <li>Customers must review updated terms on the website before making payments.</li>
                </ul>
            </section>

            <p className="mt-6 text-gray-600">
                For inquiries or assistance, please contact us at <span className="font-semibold">coolpointresort@gmail.com</span>.
            </p>

            <p className="mt-4 text-center text-gray-700 font-medium">Thank you for choosing CoolPoint Resort!</p>
        </div>
    );
};

export default TermsAndConditions;
