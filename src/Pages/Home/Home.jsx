import React from "react";
import HomeBannerSlider from "./HomeBannerSlider";
import Plan from "./Plan";
import { TopJournalists } from "../../Components/Ui/TopJournalists";
import { WeeklyTopTopics } from "../../Components/Ui/WeeklyTopTopics";
import ArticleCardSlider from "../../Components/Customs/ArticleCardSlider";



const Home = () => {
  return (
    <>
      <HomeBannerSlider />
      <ArticleCardSlider/>
      <Plan />
      <TopJournalists />
     
    
     
    </>
  );
};

export default Home;
