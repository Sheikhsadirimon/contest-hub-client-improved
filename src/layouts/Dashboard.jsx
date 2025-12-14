// src/pages/Dashboard/Dashboard.jsx
import React, { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Home } from "lucide-react";
import Loading from "../components/Loading/Loading";


const Dashboard = () => {
  const { user, logOut, loading: authLoading } = useAuth(); // ← Only 'user'
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch user role from MongoDB
  const {
    data: userData,
    isLoading: roleLoading,
    error: roleError,
  } = useQuery({
    queryKey: ["userRole", user?.uid],
    queryFn: async () => {
      if (!user?.uid) throw new Error("No user UID");
      const res = await axiosSecure.get(`/user/${user.uid}`);
      return res.data;
    },
    enabled: !!user?.uid,
    staleTime: 5 * 60 * 1000,
  });

  const userRole = userData?.role || "user";

  // Safe navigation in useEffect
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (roleError) {
      navigate("/login");
    }
  }, [roleError, navigate]);

  if (authLoading || roleLoading) {
    return <Loading />;
  }

  // Role-based links
  const getLinks = () => {
    if (userRole === "admin") {
      return [
        { to: "/dashboard/manage-users", label: "Manage Users" },
        { to: "/dashboard/manage-contests", label: "Manage Contests" },
      ];
    }
    if (userRole === "creator") {
      return [
        { to: "/dashboard/add-contest", label: "Add Contest" },
        { to: "/dashboard/my-contests", label: "My Created Contests" },
        { to: "/dashboard/submissions", label: "Submitted Tasks" },
      ];
    }
    return [
      { to: "/dashboard/participated", label: "My Participated Contests" },
      { to: "/dashboard/winnings", label: "My Winning Contests" },
      { to: "/dashboard/profile", label: "My Profile" },
    ];
  };

  const links = getLinks();

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  
  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const photoURL = user?.photoURL || "https://i.ibb.co.com/4p5dQ5X/user.png";

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-200">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        
        <div className="navbar bg-base-100 shadow-md px-6">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <label
                htmlFor="dashboard-drawer"
                className="btn btn-ghost drawer-button lg:hidden"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
              <h1 className="text-2xl font-bold capitalize">{userRole} Dashboard</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/" className="btn btn-ghost btn-circle">
              <Home className="w-5 h-5" />
            </Link>

            <div className="text-right hidden sm:block">
              <p className="font-semibold">{displayName}</p>
              <p className="text-sm text-base-content/70 capitalize">{userRole}</p>
            </div>

            <div className="avatar online">
              <div className="w-10 rounded-full ring ring-primary ring-offset-2">
                <img src={photoURL} alt={displayName} />
              </div>
            </div>

            <button onClick={handleLogout} className="btn btn-error btn-sm">
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-10">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="w-72 bg-base-100 min-h-full shadow-xl">
          <div className="p-6 text-center">
            <h2 className="text-3xl font-bold mb-2">ContestHub</h2>
            <p className="text-base-content/70">Dashboard</p>
          </div>
          <ul className="menu p-4 space-y-2">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-lg font-medium hover:bg-primary hover:text-primary-content rounded-lg transition-all py-3"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;