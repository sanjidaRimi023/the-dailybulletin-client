// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaEye, FaRegNewspaper } from "react-icons/fa";

export const TopJournalists = () => {
  const journalists = [
    {
      name: "John Smith",
      image: "https://i.ibb.co/84jHfHYT/law2.jpg",
      articles: 10,
      totalViews: 2500,
    },
    {
      name: "Emily Johnson",
      image:
        "https://i.ibb.co/TBkn2ky9/indian-businessman-with-his-white-car.jpg",
      articles: 8,
      totalViews: 2100,
    },
    {
      name: "David Lee",
      image: "https://i.ibb.co/84jHfHYT/law2.jpg",
      articles: 12,
      totalViews: 3000,
    },
  ];

  return (
    <section className="py-10 bg-gradient-to-br from-indigo-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="relative max-w-7xl mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 dark:text-white mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-10 bg-indigo-600 rounded-sm"></div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Top Journalists
            </h2>
          </div>
        </motion.div>

        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {journalists.map((j, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-xl rounded-3xl p-8 text-center hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              {/* Badge */}
              <div className="absolute top-4 right-4 bg-indigo-100 dark:bg-indigo-600 text-indigo-600 dark:text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                #{i + 1}
              </div>

              <img
                src={j.image}
                alt={j.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto mb-4 object-cover border-4 border-white dark:border-gray-300 shadow-md"
              />

              <h3 className="text-3xl font-semibold text-gray-800 dark:text-white">
                {j.name}
              </h3>

              <div className="mt-2 text-xl text-gray-500 dark:text-gray-300 flex items-center justify-center gap-1">
                <FaRegNewspaper className="text-indigo-600 dark:text-indigo-300" />
                Articles: <span className="font-medium ml-1">{j.articles}</span>
              </div>

              <div className="mt-1 text-xl text-gray-500 dark:text-gray-300 flex items-center justify-center gap-1">
                <CountUp end={j.totalViews} duration={2} /> views
              </div>

              <button className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-all shadow-md">
                View Articles
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
