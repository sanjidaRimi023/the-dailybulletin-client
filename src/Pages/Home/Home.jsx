import React from "react";
import HomeBannerSlider from "./HomeBannerSlider";
import Plan from "./Plan";
import { TopJournalists } from "../../Components/Ui/TopJournalists";
import ArticleCardSlider from "../../Components/Customs/ArticleCardSlider";
import Headline from "../../Components/Ui/Headline";
import NewsCategoryHub from "../../Components/Ui/NewsCategoryHub";



const Home = () => {
  return (
    <>
      <Headline/>
      <HomeBannerSlider />
      <ArticleCardSlider />
      <NewsCategoryHub/>
      <Plan />
      
      <TopJournalists />
     
    
     
    </>
  );
};

export default Home;
