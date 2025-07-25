import React, { useState } from "react";
import { IoGrid } from "react-icons/io5";
import { FaTable } from "react-icons/fa6";
import { Link } from "react-router";
import LoadSpinner from "../Components/Ui/LoadSpinner";

import UserArticleCard from "../Components/Customs/UserArticleCard";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../Components/Customs/Pagination";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AllArticle = () => {
  const [layout, setLayout] = useState("card");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: articles = [], isLoading: articlesLoading } = useQuery({
    queryKey: ["all-articles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/article");
      return res.data;
    },
  });

  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const userType =
    userData?.role === "admin"
      ? "admin"
      : userData?.role === "premium"
      ? "premium"
      : "user";

  if (articlesLoading || userLoading || authLoading) return <LoadSpinner />;

  const filteredArticles = articles.filter((article) =>
    selectedCategory ? article.category === selectedCategory : true
  );

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="text-center space-y-3 mb-10">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-indigo-900 bg-clip-text text-transparent">
          Featured Insights
        </h2>
        <p>
          Thought-provoking analysis and commentary from leading voices in
          journalism. <br /> Dive deeper into the issues that matter most.
        </p>
      </div>

      <div className="container mx-auto flex flex-wrap justify-center gap-4 mb-6 items-center">
        <div className="w-full max-w-xs">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Filter by Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full px-5 py-3 text-sm text-gray-900 border-none border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-blue-500 transition duration-200 ease-in-out"
          >
            <option value="">All Categories</option>
            <option value="Politics & Governance">Politics</option>
            <option value="Business & Economy">Business</option>
            <option value="Sports">Sports</option>
            <option value="Science & Research">Science</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>

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

      {layout === "card" ? (
        <div
          className={`container mx-auto grid gap-6 lg:grid-cols-3 md:grid-cols-2`}
        >
          {currentArticles.map((article, index) => (
            <UserArticleCard
              key={article._id}
              article={article}
              index={index}
              userType={userType}
            />
          ))}
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
                    <Link to={`/article-detail/${article._id}`}>
                      <button className="bg-indigo-500 text-white px-2 py-1 rounded text-xs hover:bg-opacity-90">
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default AllArticle;
