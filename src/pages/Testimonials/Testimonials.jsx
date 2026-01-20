import React from "react";

const testimonials = [
  {
    name: "Ayesha Rahman",
    role: "UI/UX Designer",
    text: "Won my first $2,000 prize here. The platform is fair and the community is super supportive!",
  },
  {
    name: "Rahim Khan",
    role: "Freelance Writer",
    text: "Best place to showcase writing skills and earn real money. Got featured twice already!",
  },
  {
    name: "Safa Kabir",
    role: "Game Developer",
    text: "Love the gaming contests — easy to participate and the prizes are life-changing!",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
          What Our Winners Say
        </h2>
        <p className="text-xl text-center text-base-content/70 mb-12">
          Real stories from real creators
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="avatar">
                    <div className="w-16 rounded-full">
                      <img
                        src={`https://i.pravatar.cc/150?img=${i + 10}`}
                        alt={t.name}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-sm opacity-70">{t.role}</p>
                  </div>
                </div>
                <p className="italic text-base-content/80">"{t.text}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
