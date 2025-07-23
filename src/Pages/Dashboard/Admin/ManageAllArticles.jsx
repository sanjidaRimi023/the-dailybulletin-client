import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaCheckCircle, FaEye, FaTimesCircle } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import LoadSpinner from "../../../Components/Ui/LoadSpinner";

const ManageAllArticles = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: articles = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["all-pending-articles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/article");
      return res.data;
    },
  });
  if (isLoading) {
    return <LoadSpinner />;
  }

  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`/article/status/${id}`, {
        status: "approved",
      });
      if (res.data.modifiedCount > 0) {
        toast.success("Article approved!");
        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error("Approval failed!");
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.patch(`/article/status/${id}`, {
        status: "rejected",
        rejectionReason,
      });
      if (res.data.modifiedCount > 0) {
        toast.success("Article rejected!");
        setRejectionModalOpen(false);
        setRejectionReason("");
        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error("Rejection failed!");
    }
  };

  const filteredArticles = articles
    .filter((article) => article.status === "pending")

    .sort((a, b) => {
      if (sortField === "viewCount") {
        return sortOrder === "asc"
          ? a.viewCount - b.viewCount
          : b.viewCount - a.viewCount;
      }
      if (sortField === "status") {
        return sortOrder === "asc"
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
    });

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4 md:p-6 lg:p-10 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600 dark:text-white">
        Manage All Pending Articles
      </h2>

      <div className="mb-6 flex flex-col md:flex-row justify-between gap-4 items-center">
        <div className="flex gap-4">
          <select
            onChange={(e) => setSortField(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
            value={sortField}
          >
            <option value="createdAt">Date</option>
            <option value="viewCount">Views</option>
          </select>

          <select
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
            value={sortOrder}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg border dark:border-gray-700">
        <table className="min-w-full bg-white dark:bg-gray-800 text-sm">
          <thead className="bg-indigo-200 text-indigo-800 dark:bg-indigo-700 dark:text-white uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Title</th>
              <th className="px-4 py-3 text-left font-semibold">Author</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3 text-left font-semibold">Views</th>
              <th className="px-4 py-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="border-t dark:border-gray-600">
            {paginatedArticles.length > 0 ? (
              paginatedArticles.map((article) => (
                <tr
                  key={article._id}
                  className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-700"
                >
                  <td className="px-4 py-3">{article.title}</td>
                  <td className="px-4 py-3">{article.authorEmail}</td>
                  <td className="px-4 py-3 capitalize text-yellow-500">
                    {article.status}
                  </td>
                  <td className="px-4 py-3">{article.viewCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          title="Preview"
                          onClick={() => setSelectedArticle(article)}
                          className="p-2 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-all duration-200 shadow-sm"
                        >
                          <FaEye size={18} />
                        </button>

                        <button
                          title="Approve"
                          onClick={() => handleApprove(article._id)}
                          className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-all duration-200 shadow-sm"
                        >
                          <FaCheckCircle size={18} />
                        </button>

                        <button
                          title="Reject"
                          onClick={() => {
                            setSelectedArticle(article);
                            setRejectionModalOpen(true);
                          }}
                          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-200 shadow-sm"
                        >
                          <FaTimesCircle size={18} />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  No articles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded border dark:border-gray-700 ${
              currentPage === i + 1
                ? "bg-indigo-500 text-white"
                : "bg-gray-100 hover:bg-indigo-100 dark:bg-gray-700 dark:hover:bg-gray-600"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {selectedArticle && !rejectionModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-hide">
            <h3 className="text-2xl font-bold mb-4 text-center">
              {selectedArticle.title}
            </h3>

            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="rounded-lg w-full h-60 object-cover mb-5"
            />

            <div className="grid gap-2 text-sm sm:text-base">
              <p>
                <strong>Category:</strong> {selectedArticle.category}
              </p>
              <p>
                <strong>Tags:</strong> {selectedArticle.tags.join(", ")}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="capitalize text-yellow-500">
                  {selectedArticle.status}
                </span>
              </p>
              <p>
                <strong>Premium:</strong>{" "}
                {selectedArticle.isPremium ? "Yes" : "No"}
              </p>
              <p>
                <strong>Views:</strong> {selectedArticle.viewCount}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedArticle.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="my-5">
              <p className="font-semibold mb-1">Short Description:</p>
              <p className="text-sm mb-3">{selectedArticle.description}</p>
              <p className="font-semibold mb-1">Full Content:</p>
              <p className="text-sm whitespace-pre-wrap">
                {selectedArticle.content}
              </p>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <img
                src={selectedArticle.publisher_image}
                alt={selectedArticle.publisher}
                className="w-10 h-10 rounded-full"
              />
              <p>
                Published by: <strong>{selectedArticle.publisher}</strong>
              </p>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {rejectionModalOpen && selectedArticle && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-2xl shadow-2xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-red-600">
              Reject Article
            </h3>
            <p className="mb-2">Please provide a reason for rejection:</p>
            <textarea
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm"
              rows="4"
              placeholder="Write your reason here..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setRejectionModalOpen(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReject(selectedArticle._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAllArticles;
