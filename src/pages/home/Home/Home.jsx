import React from "react";
import Loading from "../../../components/Loading/Loading";
import Banner from "../Banner/Banner";
import Showcase from "../ShowCase/ShowCase";
import PopularContests from "../PopularContest/PopularContests";
import WinnerAdvertisement from "../WinnerAdvertisement/WinnerAdvertisement";
import CategoriesShowcase from "../../CategoriesShowcase/CategoriesShowcase";
import StatsTrust from "../../shared/StatsTrust";
import Testimonials from "../../Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularContests></PopularContests>
      <WinnerAdvertisement></WinnerAdvertisement>
      <CategoriesShowcase></CategoriesShowcase>
      <StatsTrust></StatsTrust>
      <Testimonials></Testimonials>
      <Showcase></Showcase>
    </div>
  );
};

export default Home;
