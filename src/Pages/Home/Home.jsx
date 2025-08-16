import React from "react";
import HomeBannerSlider from "./HomeBannerSlider";
import Plan from "./Plan";
// import { TopJournalists } from "../../Components/Ui/TopJournalists";
import ArticleCardSlider from "../../Components/Customs/ArticleCardSlider";
import Headline from "../../Components/Ui/Headline";
import NewsCategoryHub from "../../Components/Ui/NewsCategoryHub";
import KnowUS from "../../Components/Customs/KnowUS";
import Partner from "../../Components/Customs/Partner";
import Testimotials from "../../Components/Ui/Testimonials";

const Home = () => {
  return (
    <>
      <Headline />
      <HomeBannerSlider />
      <KnowUS />
      <ArticleCardSlider />
      <NewsCategoryHub />
      <Plan />
      <Testimotials />
      <Partner />

     
    </>
  );
};

export default Home;
