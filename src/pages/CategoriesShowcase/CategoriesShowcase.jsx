import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Design", icon: "🎨", color: "from-blue-500 to-indigo-600" },
  { name: "Writing", icon: "✍️", color: "from-green-500 to-emerald-600" },
  { name: "Photography", icon: "📸", color: "from-purple-500 to-pink-600" },
  { name: "Video Editing", icon: "🎬", color: "from-red-500 to-rose-600" },
  { name: "Gaming", icon: "🎮", color: "from-orange-500 to-amber-600" },
  { name: "Business Ideas", icon: "💡", color: "from-yellow-500 to-amber-600" },
];

const CategoriesShowcase = () => {
  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
          Explore by Category
        </h2>
        <p className="text-xl text-center text-base-content/70 mb-12">
          Find contests that match your passion
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/all-contests?category=${encodeURIComponent(cat.name)}`}
              className={`card bg-gradient-to-br ${cat.color} text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group`}
            >
              <div className="card-body items-center text-center py-10">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-bold">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesShowcase;