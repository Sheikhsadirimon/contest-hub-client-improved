import React from "react";
import { Link } from "react-router";

const HowItWorksTeaser = () => {
  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-6">
        <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 shadow-2xl border border-primary/20 rounded-3xl overflow-hidden">
          <div className="card-body p-12 lg:p-16 text-center">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Curious How It Works?
            </h3>
            <p className="text-xl md:text-2xl text-base-content/80 mb-10 max-w-3xl mx-auto">
              Discover the simple 6-step journey from joining to winning real
              prizes.
            </p>
            <Link
              to="/how-it-works"
              className="btn btn-primary btn-lg px-16 text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-nowrap"
            >
              Learn How It Works →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksTeaser;
