import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadSpinner from "../../../Components/Ui/LoadSpinner";

const cloud_name = import.meta.env.VITE_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_CLOUD_PRESET;
const MyArticles = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editArticle, setEditArticle] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    data: myArticles = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myArticles", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/article/my-article?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadSpinner />;
  }
  const handleImageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", upload_preset);
    formData.append("cloud_name", cloud_name);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this article?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/article/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "", "success");
        refetch();
      }
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    const form = e.target;
    const imageFile = form.image.files[0];
    let imageURL = editArticle.image;

    if (imageFile) {
      try {
        imageURL = await handleImageUpload(imageFile);
      } catch (err) {
        console.error("Image upload failed", err);
        Swal.fire("Error", "Image upload failed!", "error");
        setIsUpdating(false);
        return;
      }
    }

    const updated = {
      title: form.title.value,
      description: form.description.value,
      content: form.content.value,
      category: form.category.value,
      tags: form.tags.value.split(",").map((tag) => tag.trim()),
      image: imageURL,
     
    };

    try {
      const res = await axiosSecure.put(`/article/${editArticle._id}`, updated);
      if (res.data.modifiedCount > 0) {
        await refetch();
        setEditArticle(null);
        Swal.fire("Updated!", "Your article has been updated.", "success");
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error!", "Something went wrong.", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status) => {
    const base = "px-2 py-0.5 text-xs rounded-full font-medium";
    if (status === "approved")
      return (
        <span className={`${base} bg-green-200 text-green-800`}>Approved</span>
      );
    if (status === "pending")
      return (
        <span className={`${base} bg-yellow-200 text-yellow-800`}>Pending</span>
      );
    if (status === "rejected")
      return (
        <span className={`${base} bg-red-200 text-red-800`}>Rejected</span>
      );
    if (status === "draft")
      return <span className={`${base} bg-gray-300 text-gray-700`}>Draft</span>;
    if (status === "published")
      return (
        <span className={`${base} bg-blue-200 text-blue-800`}>Published</span>
      );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        My Articles
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myArticles.map((article) => (
          <div
            key={article._id}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
          >
            <img
              src={article.image}
              alt={article.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-white bg-blue-500 px-2 py-0.5 rounded-full capitalize">
                    {article.category}
                  </span>
                  {getStatusBadge(article.status)}
                </div>

                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                  {article.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {article.description?.slice(0, 90)}...
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {article.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <img
                    src={article.publisher_image}
                    alt={article.publisher}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{article.publisher}</span>
                </div>
                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-sm dark:text-gray-400 p-2 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition-all duration-200 shadow-sm">
                  view- {article.viewCount}
                </span>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-200 shadow-sm flex items-center gap-2"
                    title="Delete"
                  >
                    <FaTrashAlt />
                  </button>
                  <button
                    onClick={() => setEditArticle(article)}
                    className="p-2 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-all duration-200 shadow-sm flex gap-2 items-center"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <form
            onSubmit={handleUpdateSubmit}
            className="relative w-[90%] max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 md:p-8 overflow-y-auto max-h-[90vh]"
          >
            <button
              type="button"
              onClick={() => setEditArticle(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              title="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Edit Article
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                defaultValue={editArticle.title}
                className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Article Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="w-full border px-4 py-2 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                defaultValue={editArticle.description}
                rows={3}
                className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Content
              </label>
              <textarea
                name="content"
                defaultValue={editArticle.content}
                rows={6}
                className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                name="category"
                defaultValue={editArticle.category}
                className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
                required
              >
                <option value="">Select Category</option>
                <option value="Technology">Technology</option>
                <option value="Education">Education</option>
                <option value="Politics">Politics</option>
                <option value="Health">Health</option>
                <option value="Sports">Sports</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                name="tags"
                defaultValue={editArticle.tags?.join(", ")}
                className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditArticle(null)}
                className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className="px-5 py-2 text-sm rounded-md bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-60"
              >
                {isUpdating ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyArticles;
