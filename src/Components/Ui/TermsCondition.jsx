import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

const termsData = [
  {
    title: "Introduction",
    content: `Welcome to The Daily Bulletin. By accessing or using our website, 
    you agree to be bound by these Terms & Conditions. Please read them carefully 
    before using our services.`,
  },
  {
    title: "Use of Website",
    content: `You must be at least 13 years old to use this website. You agree 
    not to use the website for any illegal or unauthorized purposes and comply 
    with all applicable laws.`,
  },
  {
    title: "Intellectual Property Rights",
    content: `All news articles, images, videos, and other content are the 
    property of The Daily Bulletin unless otherwise stated. Reproduction or 
    distribution without written permission is strictly prohibited.`,
  },
  {
    title: "User-Generated Content",
    content: `If you submit comments, articles, or any content, you grant us 
    a non-exclusive, royalty-free license to use, reproduce, and publish it. 
    You are solely responsible for ensuring your content does not violate 
    copyright or other laws.`,
  },
  {
    title: "Accuracy of Information",
    content: `We strive to ensure that the information we publish is accurate 
    and up-to-date, but we make no guarantees of complete accuracy or reliability.`,
  },
  {
    title: "External Links",
    content: `Our website may contain links to external sites. We are not 
    responsible for the content, accuracy, or reliability of these third-party 
    websites.`,
  },
  {
    title: "Changes to Terms",
    content: `We may update these Terms & Conditions from time to time without 
    prior notice. The updated version will be effective immediately upon posting.`,
  },
  {
    title: "Contact Us",
    content: `If you have any questions regarding these Terms & Conditions, 
    please contact us at: contact@thedailybulletin.com`,
  },
];

export default function TermsCondition() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        Terms & Conditions
      </h1>
      <p className="mb-6 text-gray-600">
        Last updated: {new Date().toLocaleDateString()}  
        <br />
        Please read these Terms & Conditions carefully before using The Daily Bulletin website.
      </p>

      {termsData.map((term, index) => (
        <div
          key={index}
          className="mb-4 border border-gray-200 rounded-lg shadow-sm"
        >
          <button
            className="flex justify-between items-center w-full p-5 text-left font-medium text-gray-900 hover:bg-gray-50 transition"
            onClick={() => toggle(index)}
          >
            {term.title}
            {openIndex === index ? (
              <ChevronUpIcon className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {openIndex === index && (
            <div className="p-5 border-t bg-gray-50">
              <p className="text-gray-700 leading-relaxed">{term.content}</p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
