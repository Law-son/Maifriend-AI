import React from "react";

import HeroSection from "../../components/hero-section/HeroSection";
import TextGenSection from "../../components/text-gen-section/TextGenSection";
import ImgGenSection from "../../components/img-gen-section/ImgGenSection";
import PersonalizedModels from "../../components/personalized-models/PersonalizedModels";

const Home = () => {
  return <>
    <HeroSection />
    <TextGenSection />
    <ImgGenSection />
    <PersonalizedModels />
  </>;
};

export default Home;
