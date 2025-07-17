import React, { useState, useEffect } from "react";
import { IoGrid } from "react-icons/io5";
import { FaTable } from "react-icons/fa6";
import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import LoadSpinner from "../Components/Ui/LoadSpinner";
import useAxios from "../Hooks/useAxios";
import UserArticleCard from "../Components/Customs/UserArticleCard"; 
const AllArticle = () => {
  const [articles, setArticles] = useState([]);
  const [layout, setLayout] = useState("card");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  const userType = "premium";
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance("/article")
      .then((res) => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading articles:", err);
        setLoading(false);
      });
  }, [axiosInstance]);

  // Category filter
  const filteredArticles = articles.filter((article) =>
    selectedCategory ? article.category === selectedCategory : true
  );

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  if (loading) return <LoadSpinner />;

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="text-center space-y-3 mb-10">
        <h1 className="text-3xl font-bold text-primary">
          Read Our Latest Articles
        </h1>
        <p className="text-base max-w-2xl mx-auto text-gray-600">
          Dive into the latest news and insightful articles. Stay informed with
          categorized news coverage, from politics to pop culture.
        </p>
      </div>

      {/* Filter + View Toggle */}
      <div className="flex flex-wrap justify-center gap-4 mb-6 items-center">
        {/* Category filter */}
        <select
          className="border px-10 py-3 rounded-2xl"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Politics & Governance">Politics</option>
          <option value="Business & Economy">Bussiness</option>
          <option value="Sports">Sports</option>
          <option value="Science & Research">Science</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Entertainment">Entertainment</option>
        </select>

        {/* Layout Toggle */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-lg font-semibold">View</span>
          <button
            onClick={() => setLayout(layout === "card" ? "table" : "card")}
            className="p-2 border rounded hover:bg-gray-100 transition duration-200"
          >
            {layout === "card" ? (
              <FaTable className="w-5 h-5" />
            ) : (
              <IoGrid className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Layout Rendering */}
      {layout === "card" ? (
        <div
          className={
            userType === "premium"
              ? "container mx-auto my-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "container mx-auto my-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          }
        >
          <AnimatePresence>
            {currentArticles.map((article, index) => (
              <UserArticleCard
                key={article._id}
                article={article}
                index={index}
                userType={article.isPremium ? "premium" : "normal"}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border rounded-lg shadow-sm">
            <thead className="bg-gray-100 text-left text-sm">
              <tr>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Author</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Tags</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y">
              {currentArticles.map((article) => (
                <tr key={article._id}>
                  <td className="px-4 py-2">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-14 h-14 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2">{article.title}</td>
                  <td className="px-4 py-2">{article.authorName}</td>
                  <td className="px-4 py-2">{article.category}</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-1">
                      {article.tags?.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <Link to={`/articles/${article._id}`}>
                      <button className="bg-primary text-white px-2 py-1 rounded text-xs hover:bg-opacity-90">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-10 flex-wrap gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`px-3 py-1 text-sm rounded border ${
              currentPage === index + 1
                ? "bg-primary text-white"
                : "bg-white text-primary border-primary"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllArticle;
