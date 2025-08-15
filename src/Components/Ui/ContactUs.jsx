import React, { useState } from "react";
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
  FaChevronUp,
} from "react-icons/fa";

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

  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen">
      <motion.section
        className="text-center py-16 shadow-sm dark:text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold">
          Contact Us
        </h1>
        <p className="mt-4 text-lg">
          We’d love to hear from you! Whether you have a question, feedback, or a news tip, get in touch with us.
        </p>
      </motion.section>

      <motion.div
        className="container mx-auto px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <motion.div
            className="dark:bg-gray-800 p-8 rounded-xl shadow-lg"
            variants={itemVariants}
          >
            <h2 className="text-2xl dark:text-white font-bold mb-6">Send us a Message</h2>
            <form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <input type="text" placeholder="Your Name" className="w-full p-3 border border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition dark:text-white" />
                <input type="email" placeholder="Your Email" className="w-full p-3 border border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition dark:text-white" />
              </div>
              <div className="mb-6">
                <input type="text" placeholder="Subject" className="w-full p-3 border border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition dark:text-white" />
              </div>
              <div className="mb-6">
                <textarea placeholder="Your Message" rows="5" className="w-full p-3 border border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition dark:text-white"></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="dark:bg-gray-800  p-8 rounded-xl shadow-lg mb-8">
              <h2 className="text-2xl font-bold dark:text-white mb-6">Contact Information</h2>
              <div className="space-y-4 text-gray-600 dark:text-white">
                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-indigo-600 text-xl" />
                  <span>Boshundhara, Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-center gap-4">
                  <FaEnvelope className="text-indigo-600 text-xl" />
                  <span>sanjidarimi023@gmail.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <FaPhoneAlt className="text-indigo-600 text-xl" />
                  <span>+00819567-890</span>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200">
                 <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">Follow Us</h3>
                 <div className="flex gap-4">
                    <motion.a href="#" className="text-gray-500 dark:text-white hover:text-indigo-700" whileHover={{ y: -3 }}><FaFacebookF size={22} /></motion.a>
                    <motion.a href="#" className="text-gray-500 dark:text-white hover:text-sky-500" whileHover={{ y: -3 }}><FaTwitter size={22} /></motion.a>
                    <motion.a href="#" className="text-gray-500 dark:text-white hover:text-pink-600" whileHover={{ y: -3 }}><FaInstagram size={22} /></motion.a>
                    <motion.a href="#" className="text-gray-500 dark:text-white hover:text-indigo-800" whileHover={{ y: -3 }}><FaLinkedinIn size={22} /></motion.a>
                 </div>
              </div>
            </div>
            <div className="rounded-xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.08643838247!2d144.9537353159042!3d-37.81720997975179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce7e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sbd!4v1678886Melbourne%2C%20Australia"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          className="mt-16 p-8 rounded-xl shadow-lg"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-center dark:text-white text-gray-800 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 py-4">
                <button
                  className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-700 dark:text-white"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  {openFaq === index ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-gray-600 dark:text-gray-300">{faq.answer}</p>
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