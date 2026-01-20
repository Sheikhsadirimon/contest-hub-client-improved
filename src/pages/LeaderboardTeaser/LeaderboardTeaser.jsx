import React from "react";
import { Link } from "react-router-dom";

const LeaderboardTeaser = () => {
  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-6">
          See Who’s Winning Big
        </h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto">
          Our leaderboard showcases top creators with the most wins and prizes.
          Will you be next?
        </p>

        <Link
          to="/leaderboard"
          className="btn btn-lg btn-neutral text-xl px-12 shadow-2xl"
        >
          View Leaderboard →
        </Link>
      </div>
    </section>
  );
};

export default LeaderboardTeaser;