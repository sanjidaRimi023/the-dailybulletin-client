import React from "react";
import Lottie from "lottie-react";
import AboutUsLottie from "../assets/lottieFile/Contact Us.json";
import { Link } from "react-router";
import Sharebtn from "../Components/Ui/Sharebtn";
export default function AboutUs() {
  return (
    <>
     <section className="py-16 px-4 sm:px-6 lg:px-20">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
  
        <div data-aos="fade-down">
          <Lottie
            animationData={AboutUsLottie}
            loop={true}
            
          />
        </div>

       
        <div data-aos="fade-down">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            Know our Publication <br />
            <span>Media & Vision.</span>
          </h2>

          <p className=" text-base leading-relaxed mb-6">
            At <strong>The Daily Bulletin</strong>, our mission is to deliver timely, trustworthy,
            and thought-provoking journalism that shapes informed citizens. With a legacy rooted
            in truth and transparency, we are more than just a news outlet — we are a voice for
            the people.
          </p>

          <p className=" text-base leading-relaxed mb-8">
            We cover a wide range of topics — from politics and technology to culture, health, and
            global affairs — offering readers accurate reporting, in-depth analysis, and stories
            that matter. We believe in the power of information to challenge the status quo and
            build a better future.
          </p>

          <Link>
            <Sharebtn text="Latest new  →"/>
            </Link>
        
        </div>
      </div>
    </section>
    </>
  );
}
