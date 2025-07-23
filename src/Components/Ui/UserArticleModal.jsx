import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const cloud_name = import.meta.env.VITE_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_CLOUD_PRESET;

const UserArticleModal = ({ article, onClose, onSuccess }) => {
  const axiosSecure = useAxiosSecure();
  const [isUpdating, setIsUpdating] = useState(false);

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

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    const form = e.target;
    const imageFile = form.image.files[0];
    let imageURL = article.image;

    if (imageFile) {
      try {
        imageURL = await handleImageUpload(imageFile);
      } catch (err) {
          console.log(err);
        Swal.fire("Error", "Image upload failed!", "error");
        setIsUpdating(false);
        return;
      }
    }

    const updatedArticle = {
      title: form.title.value,
      description: form.description.value,
      content: form.content.value,
      category: form.category.value,
      tags: form.tags.value.split(",").map((tag) => tag.trim()),
      image: imageURL,
    };

    try {
      const res = await axiosSecure.put(`/article/${article._id}`, updatedArticle);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Your article has been updated.", "success");
        onSuccess();
      } else {
        Swal.fire("No Changes", "No changes were made to the article.", "info");
        onClose();
      }
    } catch (err) {
        console.log(err);
      Swal.fire("Error!", "Something went wrong.", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <form
        onSubmit={handleUpdateSubmit}
        className="relative w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 m-4 max-h-[90vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Edit Article
        </h2>
        
        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input type="text" name="title" defaultValue={article.title} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" required />
            </div>
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Article Image</label>
                <input type="file" name="image" accept="image/*" className="w-full border px-4 py-2 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
            </div>
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea name="description" defaultValue={article.description} rows={3} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" required></textarea>
            </div>
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
                <textarea name="content" defaultValue={article.content} rows={6} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" required></textarea>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select name="category" defaultValue={article.category} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" required>
                    <option value="">Select Category</option>
                    <option value="Technology">Technology</option>
                    <option value="Education">Education</option>
                    <option value="Politics">Politics</option>
                    <option value="Health">Health</option>
                    <option value="Sports">Sports</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags (comma-separated)</label>
                <input type="text" name="tags" defaultValue={article.tags?.join(", ")} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button type="button" onClick={onClose} className="px-6 py-2 text-sm font-medium rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={isUpdating} className="px-6 py-2 text-sm font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {isUpdating ? "Updating..." : "Update Article"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserArticleModal;