// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

const UserArticleCard = ({ article, index, userType }) => {
  if (userType === "premium") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
      >
        <Link
          to={`/articles/${article._id}`}
          className="flex flex-col sm:flex-row gap-4 rounded-md border border-gray-300 p-4 shadow-sm sm:p-6 hover:shadow-md transition"
        >
          {/* Image Left */}
          <div className="sm:w-48 shrink-0">
            <img
              src={article.image}
              alt={article.title}
              className="h-56 w-full rounded-tr-3xl rounded-bl-3xl object-cover sm:h-64 lg:h-72"
            />
          </div>

          {/* Content Right */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {article.title}
              </h3>

              <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                By {article.authorName}
              </p>

              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                {article.description?.slice(0, 150) + "..."}
              </p>
            </div>
            <Link
              to={`/articles/${article._id}`}
              className="inline-flex transition hover:scale-110 hover:shadow-xl items-center gap-2 mt-4 px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-fit"
            >
              Read more
              <FaArrowRight />
            </Link>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Normal user layout
  return (
    <motion.div
      key={article._id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden flex flex-col justify-between"
    >
      <div className="relative">
        {/* Article Image */}
        <img
          className="w-full h-48 object-cover rounded-t-lg"
          src={article.image}
          alt={article.title}
        />
        {/* Category Badge */}
        <span className="absolute top-2 left-2 bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300 uppercase">
          {article.category || "News"}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-2">
        <Link
          to={`/articles/${article._id}`}
          className="text-xl font-bold tracking-tight hover:underline text-gray-900 dark:text-white hover:text-blue-600 transition"
        >
          {article.title}
        </Link>

        <p className="text-sm text-gray-700 dark:text-gray-400">
          {article.description?.slice(0, 150) + "..."}
        </p>

        {/* Author & Date */}
        <div className="flex items-center gap-2 mt-2">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={
              article.authorImage ||
              "https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=48&q=60"
            }
            alt={article.authorName}
          />
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {article.authorName}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
            {new Date(article.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Read More Button */}

        <Link
          to={`/articles/${article._id}`}
          className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[2px] hover:text-white focus:ring-3 focus:outline-none w-fit"
        >
          <span className="rounded-full bg-white px-6 py-2 text-sm font-medium transition group-hover:bg-transparent">
            Read More
          </span>
        </Link>
      </div>
    </motion.div>
  );
};

export default UserArticleCard;
