import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/Loading/Loading";
import { FiSearch } from "react-icons/fi";

const AllContests = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();

  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
    });

    const fetchContests = async () => {
      try {
        const response = await axiosInstance.get("/contests");
        const approvedContests = response.data.filter(
          (contest) => contest.status === "approved",
        );
        setContests(approvedContests);
        setFilteredContests(approvedContests);
      } catch (error) {
        console.error("Error fetching contests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, [axiosInstance]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlCategory = params.get("category");

    if (urlCategory) {
      const normalized = urlCategory.trim();
      const matched = categories.find(
        (cat) => cat.toLowerCase() === normalized.toLowerCase(),
      );

      if (matched) {
        setActiveTab(matched);
        setFilteredContests(contests.filter((c) => c.category === matched));
      } else {
        setActiveTab("All");
        setFilteredContests(contests);
      }
    }
  }, [location.search, contests]);

  useEffect(() => {
    let result = [...contests];

    if (activeTab !== "All") {
      result = result.filter((c) => c.category === activeTab);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((c) => c.name.toLowerCase().includes(query));
    }

    if (sortOption === "price-low-high") {
      result.sort((a, b) => a.prize - b.prize);
    } else if (sortOption === "price-high-low") {
      result.sort((a, b) => b.prize - a.prize);
    }

    setFilteredContests(result);
  }, [contests, activeTab, searchQuery, sortOption]);

  const categories = ["All", ...new Set(contests.map((c) => c.category))];

  const handleTabChange = (category) => {
    setActiveTab(category);

    if (category === "All") {
      setFilteredContests(contests);
      navigate("/all-contests");
    } else {
      setFilteredContests(contests.filter((c) => c.category === category));
      navigate(`/all-contests?category=${encodeURIComponent(category)}`);
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/contest/${id}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="py-32 bg-base-200 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-base-content mb-4">
            All Contests
          </h2>
          <p className="text-lg md:text-xl text-base-content/70">
            Explore every active and approved contest
          </p>
        </div>

        {/* Controls */}
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 mb-12">
          {/* 1. Search bar */}
          <div className="relative w-full max-w-xl mx-auto">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 text-xl pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by contest name..."
              className="input input-bordered input-lg w-full pl-12 bg-base-100 border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all shadow-sm"
            />
          </div>

          {/* 2. Category Tabs (horizontal) */}
          <div className="flex justify-center">
            <div className="tabs tabs-boxed bg-base-300 p-2 rounded-xl shadow-lg whitespace-nowrap overflow-x-auto max-w-full scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleTabChange(category)}
                  className={`tab tab-lg font-semibold transition-all ${
                    activeTab === category
                      ? "tab-active rounded-xl bg-primary text-primary-content"
                      : "text-base-content rounded-xl hover:bg-base-200"
                  }`}
                >
                  {category === "All" ? "All Contests" : category}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Sort by Price */}
          <div className="flex justify-center">
            <div className="w-full max-w-xs">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="select select-bordered select-lg w-full bg-base-100 border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/30 shadow-sm"
              >
                <option value="default">Sort by: Default</option>
                <option value="price-low-high">Prize: Low to High</option>
                <option value="price-high-low">Prize: High to Low</option>
              </select>
            </div>
          </div>
        </div>
        {/* Contests Grid */}
        {filteredContests.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-base-content/60">
              No contests found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredContests.map((contest, index) => (
              <div
                key={contest._id}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-primary overflow-hidden group"
              >
                <figure className="relative overflow-hidden">
                  <img
                    src={contest.image}
                    alt={contest.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 badge badge-primary font-bold text-lg py-3 px-4">
                    ${contest.prize}
                  </div>
                </figure>

                <div className="card-body p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="badge badge-outline badge-lg font-medium">
                      {contest.category}
                    </div>
                    <div className="badge badge-success badge-lg">active</div>
                  </div>

                  <h3 className="card-title text-lg font-bold text-base-content line-clamp-2">
                    {contest.name}
                  </h3>

                  <p className="text-base-content/70 text-sm mt-2 line-clamp-3">
                    {contest.description.length > 100
                      ? `${contest.description.slice(0, 100)}...`
                      : contest.description}
                  </p>

                  <div className="mt-4 flex items-center text-sm text-base-content/60">
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                    {contest.participants?.toLocaleString() || 0} participants
                  </div>

                  <div className="card-actions mt-6">
                    <button
                      onClick={() => handleViewDetails(contest._id)}
                      className="btn btn-primary w-full rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllContests;
