// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaEye, FaRegNewspaper } from "react-icons/fa";
import { Link } from "react-router";

export const TopJournalists = () => {
  const journalists = [
    {
      name: "Utshob Saha",
      image: "https://i.ibb.co/84jHfHYT/law2.jpg",
      articles: 10,
      totalViews: 2500,
    },
    {
      name: "Samiha Rahman",
      image: "https://i.ibb.co/Kp2Md3ss/happy-businesswoman-holding-folder.jpg",
      articles: 8,
      totalViews: 2100,
    },
    {
      name: "Sharafat Hossain",
      image:
        "https://i.ibb.co/8LT8W7jN/portrait-confident-young-businessman-with-his-arms-crossed.jpg",
      articles: 12,
      totalViews: 3000,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Our Top Journalists
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Meet the talented individuals driving our news coverage, ranked by
            their impact and readership.
          </p>
          <div className="mt-6 w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          className="grid gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {journalists.map((journalist, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform-group  hover:shadow-indigo-600"
            >
              <div className="relative">
                <img
                  className="w-full h-56 object-cover object-center"
                  src={journalist.image}
                  alt={journalist.name}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                <div className="absolute top-4 right-4 bg-indigo-600 text-white font-bold text-sm px-3 py-1 rounded-full shadow-md">
                  #{index + 1}
                </div>

                <div className="absolute bottom-0 left-0 p-5">
                  <h3 className="text-2xl font-bold text-white tracking-wide">
                    {journalist.name}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-around items-center text-center border-b dark:border-gray-700 pb-4 mb-4">
                  <div className="flex flex-col items-center w-1/2">
                    <FaRegNewspaper className="text-2xl text-indigo-500 mb-2" />
                    <span className="text-2xl font-bold text-gray-800 dark:text-white">
                      {journalist.articles}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Articles
                    </span>
                  </div>

                  <div className="h-16 w-px bg-gray-200 dark:bg-gray-600"></div>

                  <div className="flex flex-col items-center w-1/2">
                    <FaEye className="text-2xl text-indigo-500 mb-2" />
                    <span className="text-2xl font-bold text-gray-800 dark:text-white">
                      <CountUp
                        end={journalist.totalViews}
                        duration={3}
                        separator=","
                        enableScrollSpy
                        scrollSpyOnce
                      />
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Total Views
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <Link to="/all-article">
                  <button className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-all duration-300 transform group-hover:scale-105">
                    See Articles
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
