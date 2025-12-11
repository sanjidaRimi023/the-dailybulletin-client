import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaChevronDown,
  FaClock,
} from "react-icons/fa";

// Data remains the same
const faqData = [
  {
    question: "How can I submit a news story or a tip?",
    answer:
      "You can send your story or tip to our editorial team via the contact form on this page or by emailing tips@thedailybulletin.com. Please provide as much detail as possible.",
  },
  {
    question: "How do I report a correction or an error in an article?",
    answer:
      "We are committed to accuracy. If you find an error, please contact us using the form and provide the article's headline and a description of the error. We will review it promptly.",
  },
  {
    question: "Can I advertise on The Daily Bulletin?",
    answer:
      "Yes, we offer various advertising opportunities. Please reach out to our advertising department at ads@thedailybulletin.com for more information on our rates and packages.",
  },
];

const ContactUs = () => {
  const [openFaq, setOpenFaq] = useState(null);

  // Framer-motion variants (kept clean and smooth)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="border-t border-b border-gray-200 dark:border-gray-800">
      {/* Hero Section - Clean, High Contrast Header */}
      <motion.section
        className="text-center py-16 md:py-24 border-b border-gray-200 dark:border-gray-800"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold ">
          Connect With Our Desk
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-xl dark:text-gray-400">
          Your news tips, feedback, and corrections are crucial to our mission.
          Reach out directly to our editorial and support teams.
        </p>
      </motion.section>

      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Contact Form (2/3rds) */}
          <motion.div
            className="lg:col-span-2 p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-extrabold  mb-8 border-b pb-4 border-gray-100 dark:border-gray-700">
              Submit a News Tip or Inquiry
            </h2>
            <form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  placeholder="Your Name (Required)"
                  required
                  className="w-full p-4 border border-gray-300 dark:border-gray-600  rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200/50 dark:focus:ring-indigo-600/30 transition duration-300 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <input
                  type="email"
                  placeholder="Your Email (Required)"
                  required
                  className="w-full p-4 border border-gray-300 dark:border-gray-600  rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200/50 dark:focus:ring-indigo-600/30 transition duration-300 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Subject (e.g., Correction Request, Advertisement)"
                  className="w-full p-4 border border-gray-300 dark:border-gray-600  rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200/50 dark:focus:ring-indigo-600/30 transition duration-300 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <div className="mb-8">
                <textarea
                  placeholder="Your Detailed Message..."
                  rows="7"
                  required
                  className="w-full p-4 border border-gray-300 dark:border-gray-600  rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200/50 dark:focus:ring-indigo-600/30 transition duration-300 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl text-lg tracking-wider shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message Securely
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="lg:col-span-1 space-y-8"
          >
            <div className="bg-indigo-600 dark:bg-indigo-700 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 font-bold py-1 px-4 rounded-bl-xl text-sm flex items-center gap-2 transform rotate-0">
                <FaClock /> 24/7 Desk
              </div>

              <h3 className="text-2xl font-bold mb-6 border-b pb-3 border-indigo-400 dark:border-indigo-500">
                Official Channels
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt className="text-xl mt-1 flex-shrink-0 text-indigo-200 dark:text-indigo-300" />
                  <span>Boshundhara, Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-start gap-4">
                  <FaEnvelope className="text-xl mt-1 flex-shrink-0 text-indigo-200 dark:text-indigo-300" />
                  <span>sanjidarimi023@gmail.com</span>
                </div>
                <div className="flex items-start gap-4">
                  <FaPhoneAlt className="text-xl mt-1 flex-shrink-0 text-indigo-200 dark:text-indigo-300" />
                  <span>+00819567-890</span>
                </div>
              </div>

              {/* Follow Us - High Contrast */}
              <div className="mt-10 pt-6 border-t border-indigo-400 dark:border-indigo-500">
                <h3 className="text-lg font-bold mb-4">Follow The Story</h3>
                <div className="flex gap-5">
                  <motion.a
                    href="#"
                    className="text-white opacity-80 hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.2 }}
                  >
                    <FaFacebookF size={24} />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="text-white opacity-80 hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.2 }}
                  >
                    <FaTwitter size={24} />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="text-white opacity-80 hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.2 }}
                  >
                    <FaInstagram size={24} />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="text-white opacity-80 hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.2 }}
                  >
                    <FaLinkedinIn size={24} />
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <motion.div
              variants={itemVariants}
              className="rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.08643838247!2d144.9537353159042!3d-37.81720997975179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce7e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sbd!4v1678886Melbourne%2C%20Australia"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition duration-500"
              ></iframe>
            </motion.div>
          </motion.div>
        </div>

        {/* FAQ Section - Clean, Separated, and Bordered */}
        <motion.div
          className="mt-20 p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-extrabold text-center  mb-10 border-b pb-4 border-gray-100 dark:border-gray-700">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto divide-y divide-gray-200 dark:divide-gray-700">
            {faqData.map((faq, index) => (
              <div key={index} className="py-5">
                <button
                  className="w-full flex justify-between items-center text-left text-xl font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <motion.span
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 pr-12 text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
