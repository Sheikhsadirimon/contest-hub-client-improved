import React from "react";

const stats = [
  { number: "5,000+", label: "Active Users" },
  { number: "250+", label: "Contests Hosted" },
  { number: "$15000+", label: "Prizes Distributed" },
  { number: "4.9/5", label: "User Rating" },
];

const StatsTrust = () => {
  return (
    <section className="py-16 bg-base-100 ">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
          Trusted by Creators Worldwide
        </h2>
        <p className="text-xl text-center opacity-90 mb-12">
          Join a growing community of talented individuals
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-2">
              <div className="text-5xl md:text-6xl font-black">
                {stat.number}
              </div>
              <p className="text-lg font-medium opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsTrust;
