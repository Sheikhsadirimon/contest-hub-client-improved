import React from "react";
import { Link } from "react-router-dom";

const FaqTeaser = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-6">
          Still Have Questions?
        </h2>
        <p className="text-xl text-base-content/70 mb-10 max-w-3xl mx-auto">
          We’ve answered the most common ones in our FAQ section.
        </p>

        <Link to="/faq" className="btn btn-outline btn-lg">
          Read FAQ →
        </Link>
      </div>
    </section>
  );
};

export default FaqTeaser;