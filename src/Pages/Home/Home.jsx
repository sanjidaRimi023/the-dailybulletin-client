import React from "react";
import HomeBannerSlider from "./HomeBannerSlider";
import Plan from "./Plan";
import { TopJournalists } from "../../Components/Ui/TopJournalists";
import { WeeklyTopTopics } from "../../Components/Ui/WeeklyTopTopics";
import ArticleCardSlider from "../../Components/Customs/ArticleCardSlider";
import Headline from "../../Components/Ui/Headline";



const Home = () => {
  return (
    <>
      <Headline/>
      <HomeBannerSlider />
      <ArticleCardSlider/>
      <Plan />
      <TopJournalists />
     
    
     
    </>
  );
};

export default Home;
