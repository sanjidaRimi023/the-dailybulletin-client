import React from "react";
import { useState, useEffect, useRef } from "react";

const termsData = [
  {
    id: "introduction",
    title: "Introduction",
    content: `Welcome to The Daily Bulletin. By accessing or using our website, you agree to be bound by these Terms & Conditions. Please read them carefully before using our services.`,
  },
  {
    id: "use-of-website",
    title: "Use of Website",
    content: `You must be at least 13 years old to use this website. You agree not to use the website for any illegal or unauthorized purposes and comply with all applicable laws.`,
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property Rights",
    content: `All news articles, images, videos, and other content are the property of The Daily Bulletin unless otherwise stated. Reproduction or distribution without written permission is strictly prohibited.`,
  },
  {
    id: "user-content",
    title: "User-Generated Content",
    content: `If you submit comments, articles, or any content, you grant us a non-exclusive, royalty-free license to use, reproduce, and publish it. You are solely responsible for ensuring your content does not violate copyright or other laws.`,
  },
  {
    id: "accuracy-of-information",
    title: "Accuracy of Information",
    content: `We strive to ensure that the information we publish is accurate and up-to-date, but we make no guarantees of complete accuracy or reliability.`,
  },
  {
    id: "external-links",
    title: "External Links",
    content: `Our website may contain links to external sites. We are not responsible for the content, accuracy, or reliability of these third-party websites.`,
  },
  {
    id: "changes-to-terms",
    title: "Changes to Terms",
    content: `We may update these Terms & Conditions from time to time without prior notice. The updated version will be effective immediately upon posting.`,
  }
];

export default function TermsCondition() {
  const [activeSection, setActiveSection] = useState("introduction");
  const sectionRefs = useRef({});


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; 
      let currentSection = "";

      termsData.forEach((term) => {
        const section = sectionRefs.current[term.id];
        if (section && section.offsetTop <= scrollPosition) {
          currentSection = term.id;
        }
      });

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection]);

  return (
    <section className="min-h-screen dark:bg-gray-900">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold dark:text-white text-gray-900 leading-tight">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-white">
            Last updated: August 15, 2025
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
      
          <aside className="w-full md:w-1/4 lg:w-1/5">
            <nav className="sticky top-24">
              <ul className="space-y-2">
                {termsData.map((term) => (
                  <li key={term.id}>
                    <a
                      href={`#${term.id}`}
                      className={`block px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                        activeSection === term.id
                          ? "bg-indigo-600 text-white shadow-md"
                          : "text-gray-600 dark:text-white hover:bg-gray-200 hover:text-gray-900"
                      }`}
                    >
                      {term.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

        
          <main className="w-full md:w-3/4 lg:w-4/5">
            <div className="space-y-10">
              {termsData.map((term) => (
                <div
                  key={term.id}
                  id={term.id}
                  ref={(el) => (sectionRefs.current[term.id] = el)}
                  className="scroll-mt-24" 
                >
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 border-l-4 border-blue-600 pl-4">
                    {term.title}
                  </h2>
                  <p className="text-gray-700 dark:text-white leading-relaxed text-justify">
                    {term.content}
                  </p>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}