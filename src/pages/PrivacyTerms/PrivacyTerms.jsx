import React from "react";

const PrivacyTerms = () => {
  return (
    <section className="py-20 md:py-24 bg-base-200 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="card bg-base-100 shadow-2xl border border-base-200">
          <div className="card-body p-8 md:p-12 lg:p-16 prose prose-lg max-w-none">
            <h1 className="text-4xl md:text-5xl font-black text-center mb-10">
              Privacy Policy & Terms of Service
            </h1>

            <div className="divider my-10"></div>

            <h2 className="text-3xl font-bold mt-12 mb-6">1. Privacy Policy</h2>
            <p className="text-lg leading-relaxed">
              Last updated: January 20, 2026
            </p>

            <p>
              ContestHub ("we," "our," or "us") is committed to protecting your
              personal information and your right to privacy. This Privacy
              Policy explains what information we collect, how we use it, and
              what rights you have in relation to it.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">
              1.1 Information We Collect
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email address and name (from Firebase authentication)</li>
              <li>Profile information (display name, photo URL)</li>
              <li>
                Payment information (processed securely via Stripe – we do not
                store card details)
              </li>
              <li>Contest submissions, entries, and participation data</li>
              <li>Technical data (IP address, browser type, device info)</li>
            </ul>

            <h3 className="text-2xl font-bold mt-8 mb-4">
              1.2 How We Use Your Information
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide, maintain, and improve the platform</li>
              <li>To process contest payments and payouts</li>
              <li>To communicate with you about your account and contests</li>
              <li>To prevent fraud and enforce our terms</li>
              <li>To comply with legal obligations</li>
            </ul>

            <h3 className="text-2xl font-bold mt-8 mb-4">
              1.3 Information Sharing
            </h3>
            <p>
              We do not sell your personal information. We may share it with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Payment processors (Stripe)</li>
              <li>Firebase Authentication</li>
              <li>Legal authorities when required</li>
            </ul>

            <h2 className="text-3xl font-bold mt-16 mb-6">
              2. Terms of Service
            </h2>
            <p className="text-lg leading-relaxed">
              Last updated: January 20, 2026
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">
              2.1 User Responsibilities
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                You must be at least 13 years old (or 16 in some jurisdictions)
                to use the platform
              </li>
              <li>You are responsible for all content you submit</li>
              <li>
                You agree not to create multiple accounts or impersonate others
              </li>
              <li>
                You will not attempt to hack, exploit, or abuse the platform
              </li>
            </ul>

            <h3 className="text-2xl font-bold mt-8 mb-4">
              2.2 Contests & Payments
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>All payments are processed securely via Stripe</li>
              <li>Contest fees are non-refundable once paid</li>
              <li>
                Prize money will be distributed within 7 business days after
                winner declaration
              </li>
              <li>Contest creators have final authority on winner selection</li>
            </ul>

            <h3 className="text-2xl font-bold mt-8 mb-4">2.3 Termination</h3>
            <p>
              We may suspend or terminate your account at any time for violation
              of these terms, fraudulent activity, or any other reason we deem
              necessary.
            </p>

            <div className="alert alert-info mt-12">
              <span>
                By using ContestHub, you agree to these Terms of Service and
                Privacy Policy. If you do not agree, please do not use the
                platform.
              </span>
            </div>

            <div className="text-center mt-12 text-base-content/60 text-sm">
              <p>Contact us at support@contesthub.com for any questions.</p>
              <p>
                © {new Date().getFullYear()} ContestHub. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyTerms;
