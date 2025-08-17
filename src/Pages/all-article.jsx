import React, { useState, useEffect } from "react";
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
  const [searchTitle, setSearchTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: articles = [], isLoading: articlesLoading } = useQuery({
    queryKey: ["approved-articles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/article/approved");
      return res.data;
    },
  });

  const {
    data: userData,
    isLoading: userLoading,
   
  } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const isPremiumValid = new Date(userData?.premiumExpiresAt) > new Date();
  const userType = userData?.isPremium && isPremiumValid ? "premium" : "normal";

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTitle]);

  if (articlesLoading || userLoading || authLoading) return <LoadSpinner />;

  const filteredArticles = articles.filter((article) => {
    const matchCategory = selectedCategory
      ? article.category === selectedCategory
      : true;
    const matchTitle = searchTitle
      ? article.title.toLowerCase().includes(searchTitle.toLowerCase())
      : true;
    return matchCategory && matchTitle;
  });

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
          journalism.
          <br />
          Dive deeper into the issues that matter most.
        </p>
      </div>

      <div className="container mx-auto flex flex-wrap justify-center gap-4 mb-6 items-end">
        <div className="w-full sm:w-1/3">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium"
          >
            Filter by Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full px-5 py-3 text-sm border border-gray-300 rounded-2xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
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

        <div className="w-full sm:w-1/2">
          <label className="block mb-2 text-sm font-medium">
            Search by Title
          </label>
          <input
            type="text"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            placeholder="Type a title to search..."
            className="block w-full px-5 py-3 text-sm border border-gray-300 rounded-2xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 mt-2 sm:mt-0 ml-auto">
          <span className="text-lg font-semibold">View</span>
          <button
            onClick={() => setLayout(layout === "card" ? "table" : "card")}
            className="p-2 border rounded hover:bg-indigo-100 transition"
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
        <div className="container mx-auto grid gap-6 lg:grid-cols-3 md:grid-cols-2">
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
        <div className="w-full overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full table-auto text-sm text-left">
            <thead className="font-medium border-b">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Tags</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {currentArticles.map((article) => (
                <tr
                  key={article._id}
                  className="border-b hover:bg-gray-400 transition"
                >
                  <td className="px-6 py-4">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">{article.title}</td>
                  <td className="px-6 py-4">{article.authorName}</td>
                  <td className="px-6 py-4 font-semibold text-yellow-500">
                    {article.category}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {article.tags?.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Link
                      to={`/article-detail/${article._id}`}
                      className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
                    >
                      View
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
