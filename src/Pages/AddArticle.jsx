import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";

import { FaCameraRetro } from "react-icons/fa";
import Sharebtn from "../Components/Ui/Sharebtn";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import LoadSpinner from "../Components/Ui/LoadSpinner";
import useAxios from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";

const categoryOptions = [
  { value: "Politics", label: "Politics" },
  { value: "Technology", label: "Technology" },
  { value: "Health", label: "Health" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Sports", label: "Sports" },
  { value: "Lifestyle", label: "Lifestyle" },
  { value: "Education", label: "Education" },
  { value: "Business", label: "Business" },
  { value: "Environment", label: "Environment" },
  { value: "Science", label: "Science" },
  { value: "Travel", label: "Travel" },
  { value: "Crime", label: "Crime" },
  { value: "Religion", label: "Religion" },
  { value: "Culture", label: "Culture" },
];

const AddArticle = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [showTagError, setShowTagError] = useState(false);

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "0.5rem",
      borderColor: "#d1d5db",
      padding: "2px 4px",
      minHeight: "42px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#3b82f6",
      },
    }),
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
      setShowTagError(false);
    }
  };

  const removeTag = (indexToRemove) => {
    const updatedTags = tags.filter((_, i) => i !== indexToRemove);
    setTags(updatedTags);
  };
  const { data: publishers = [], isPending } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/publishers");
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    if (tags.length === 0) {
      setShowTagError(true);
      return;
    }

    try {
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", import.meta.env.VITE_CLOUD_PRESET);

      const uploadRes = await axiosInstance.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        formData
      );

      const imageUrl = uploadRes.data.secure_url;
      const selectedPublisher = publishers.find(
        (p) => p._id === data.publisherId
      );
      const articleData = {
        title: data.title,
        image: imageUrl,
        publisher: selectedPublisher?.name || "Unknown",
        publisherImage: selectedPublisher?.image || "",
        description: data.description,
        content: data.content,
        tags: tags,
        status: "pending",
        isPremium: false,
        viewCount: 0,
        authorEmail: user.email,
        authorName: user.displayName,
        createdAt: new Date(),
      };

      const res = await axiosInstance.post("/article", articleData);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Article submitted successfully!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        reset();
        setTags([]);
        setTagInput("");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to submit article!", "error");
    }
  };
  if (isPending) {
    return <LoadSpinner />;
  }

  return (
    <div className="max-w-4xl mx-auto my-12 p-10 bg-white dark:bg-base-200 rounded-2xl shadow-2xl border border-gray-200">
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-2">
        Create a New Article
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Please fill in the form below to submit your article for review.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-1 text-gray-800">
              Title
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="Enter article title"
              className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">Title is required</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1 text-gray-800">
              Category
            </label>
            <Controller
              control={control}
              name="category"
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={categoryOptions}
                  placeholder="Select Category"
                  styles={customSelectStyles}
                />
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">Category is required</p>
            )}
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-800">
            Article Thumbnail
          </label>
          <label
            htmlFor="profilePhoto"
            className="flex items-center justify-center px-4 py-3 text-center bg-gray-100 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-200 transition"
          >
            <FaCameraRetro className="text-gray-500 mr-2" />
            <span className="text-gray-500">Upload an Image</span>
          </label>
          <input
            id="profilePhoto"
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
            className="hidden"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">Image is required</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-semibold">Publisher</label>
            <select
              {...register("publisherId")}
              className="w-full border rounded p-2"
            >
              <option value="">Select a publisher</option>
              {publishers.map((publisher) => (
                <option key={publisher._id} value={publisher._id}>
                  {publisher.name}
                </option>
              ))}
            </select>
          </div>

          {/* Custom Tag Input */}
          <div>
            <label className="block font-semibold mb-1 text-gray-800">
              Tags
            </label>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 flex-wrap min-h-[44px] items-center border rounded-lg px-3 py-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeTag(index)}
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Type and press Enter"
                  className="flex-grow border-none focus:outline-none text-sm"
                />
              </div>
              {tags.length === 0 && showTagError && (
                <p className="text-red-500 text-sm">Enter at least one tag</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-800">
            Short Description
          </label>
          <textarea
            {...register("description", { required: true })}
            rows={3}
            placeholder="Brief summary of the article..."
            className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">Description is required</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-800">
            Full Content
          </label>
          <textarea
            {...register("content", { required: true })}
            rows={10}
            placeholder="Write your full article content here..."
            className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">Content is required</p>
          )}
        </div>

        <div className="text-center mt-6">
          <Sharebtn type="submit" text="Submit Article" />
        </div>
      </form>
    </div>
  );
};

export default AddArticle;
