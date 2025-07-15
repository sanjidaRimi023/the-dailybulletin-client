import React from "react";
import { useForm, Controller } from "react-hook-form";

import Swal from "sweetalert2";
import useAxios from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { FaCameraRetro } from "react-icons/fa";
import Sharebtn from "../Components/Ui/Sharebtn";

const tagOptions = [
  { value: "Politics", label: "Politics" },
  { value: "Technology", label: "Technology" },
  { value: "Health", label: "Health" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Sports", label: "Sports" },
];

const categoryOptions = [
  { value: "Politics", label: "Politics" },
  { value: "Technology", label: "Technology" },
  { value: "Health", label: "Health" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Sports", label: "Sports" },
];

const AddArticle = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxios();
  const { user } = useAuth();

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

  const onSubmit = async (data) => {
    try {
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", import.meta.env.VITE_CLOUD_PRESET);

      const uploadRes = await axiosSecure.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        formData
      );

      const imageUrl = uploadRes.data.secure_url;

      const articleData = {
        title: data.title,
        image: imageUrl,
        publisher: data.publisher,
        description: data.description,
        content: data.content,
        tags: data.tags.map((tag) => tag.value),
        status: "pending",
        isPremium: false,
        viewCount: 0,
        authorEmail: user.email,
        authorName: user.displayName,
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/article", articleData);
      if (res.data.insertedId) {
        // my article page
        Swal.fire({
          title: "Article submitted successfully!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        reset();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to submit article!", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-8 bg-base-200 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-8">
        Submit a New Article
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Title */}
          <div className="flex-1">
            <label className="block mb-1 font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="Enter article title"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">Title is required</p>
            )}
          </div>
          {/* Category */}
          <div className="flex-1">
            <label className="block mb-1 font-medium text-gray-700">
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

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Image</label>
          <label
            htmlFor="profilePhoto"
            className="flex items-center justify-center px-4 py-3 mb-4 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900"
          >
            <span className="text-gray-400 mr-2">
              <FaCameraRetro />
            </span>
            <span className="text-gray-400">Upload Profile Photo</span>
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

        {/* Publisher and Tags in Flex Layout */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Publisher */}
          <div className="flex-1">
            <label className="block mb-1 font-medium text-gray-700">
              Publisher
            </label>
            <input
              {...register("publisher", { required: true })}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></input>
            {errors.publisher && (
              <p className="text-red-500 text-sm mt-1">Publisher is required</p>
            )}
          </div>

          {/* Tags */}
          <div className="flex-1">
            <label className="block mb-1 font-medium text-gray-700">Tags</label>
            <Controller
              control={control}
              name="tags"
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={tagOptions}
                  isMulti
                  styles={customSelectStyles}
                />
              )}
            />
            {errors.tags && (
              <p className="text-red-500 text-sm mt-1">
                Select at least one tag
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description", { required: true })}
            rows={4}
            placeholder="Write a short description of the article..."
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">Description is required</p>
          )}
        </div>

        {/* Content */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Content
          </label>
          <textarea
            {...register("content", { required: true })}
            rows={10}
            placeholder="Write full article content here..."
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">Content is required</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Sharebtn type="submit" text="submit" />
        </div>
      </form>
    </div>
  );
};

export default AddArticle;
