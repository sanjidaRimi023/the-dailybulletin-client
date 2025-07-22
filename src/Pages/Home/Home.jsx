import React from "react";
import HomeBannerSlider from "./HomeBannerSlider";
import Plan from "./Plan";
import { TopJournalists } from "../../Components/Ui/TopJournalists";
import { WeeklyTopTopics } from "../../Components/Ui/WeeklyTopTopics";



const Home = () => {
  return (
    <>
      <HomeBannerSlider />
      <Plan />
      <TopJournalists />
      {/* <WeeklyTopTopics/> */}
    
     
    </>
  );
};

export default Home;
