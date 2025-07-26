/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

const UserArticleCard = ({ article, index, userType }) => {
  if (userType === "premium") {
    return (
      <motion.div
        key={article._id}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between hover:shadow-indigo-400"
      >
        <div className="relative group">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase shadow-md">
            {article.category || "News"}
          </span>
        </div>

        <div className="p-5 flex flex-col gap-3">
          <Link
            to={`/articles/${article._id}`}
            className="text-2xl font-semibold leading-tight text-gray-900 dark:text-white hover:text-indigo-600 transition-colors duration-200"
          >
            {article.title}
          </Link>

          <p className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed">
            {article.description?.slice(0, 150)}...
          </p>

          <div className="flex items-center gap-3 mt-2">
            <img
              className="w-9 h-9 rounded-full object-cover border-2 border-indigo-500"
              src={
                article.publisher_image ||
                "https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=48&q=60"
              }
              alt={article.authorName}
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {article.authorName}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(article.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          <Link
            to={`/article-detail/${article._id}`}
            className="group inline-flex items-center gap-2 mt-4 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400 w-fit transition-transform duration-300 hover:scale-105"
          >
            Read more
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
 
      <article
        data-aos="fade-up"
        className="group relative block w-full h-96 overflow-hidden rounded-xl shadow-lg transition-all duration-500"
      >
        <Link
          to={`/article-detail/${article._id}`}
          className="absolute inset-0 z-10"
          aria-label={`Read more about ${article.title}`}
        >
          <span className="sr-only">Read more about {article.title}</span>
        </Link>

        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="relative flex h-full flex-col items-start justify-end p-6 z-20">
          <div className="mb-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-white">
            <span className="bg-blue-500/80 px-2 py-0.5 rounded-full">
              {article.category || "Technology"}
            </span>
            {/* You can add more meta data here */}
            <span>
              {new Date(article.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }) || "July 26, 2025"}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white leading-tight transition duration-300 group-hover:text-blue-300">
            {article.title}
          </h3>

          <p className="mt-2 text-sm font-medium text-gray-300">
            By {article.authorName}
          </p>

          <div className="mt-4 flex items-center gap-2 text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span>Read More</span>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </article>
 
  );
};

export default UserArticleCard;
