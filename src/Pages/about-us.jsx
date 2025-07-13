import React from "react";
import Lottie from "lottie-react";
import AboutUsLottie from "../assets/lottieFile/Contact Us.json";
export default function AboutUs() {
  return (
    <>
     <section className="bg-white py-16 px-4 sm:px-6 lg:px-20">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
  
        <div data-aos="fade-down">
          <Lottie
            animationData={AboutUsLottie}
            loop={true}
            
          />
        </div>

       
        <div data-aos="fade-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Know our Publication <br />
            <span className="text-black">Media & Vision.</span>
          </h2>

          <p className="text-gray-600 text-base leading-relaxed mb-6">
            At <strong>The Daily Bulletin</strong>, our mission is to deliver timely, trustworthy,
            and thought-provoking journalism that shapes informed citizens. With a legacy rooted
            in truth and transparency, we are more than just a news outlet — we are a voice for
            the people.
          </p>

          <p className="text-gray-600 text-base leading-relaxed mb-8">
            We cover a wide range of topics — from politics and technology to culture, health, and
            global affairs — offering readers accurate reporting, in-depth analysis, and stories
            that matter. We believe in the power of information to challenge the status quo and
            build a better future.
          </p>

          <a
            href="#latest"
            className="inline-flex items-center gap-2 rounded-full border border-indigo-600 text-indigo-600 px-6 py-2 font-medium hover:bg-indigo-600 hover:text-white transition"
          >
            Latest News →
          </a>
        </div>
      </div>
    </section>
    </>
  );
}
