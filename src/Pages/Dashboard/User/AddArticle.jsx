import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import {
  FaRegNewspaper,
  FaThLarge,
  FaImage,
  FaBuilding,
  FaTags,
  FaFileAlt,
  FaAlignLeft,
  FaPaperPlane,
} from "react-icons/fa";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import useAuth from "../../../Hooks/useAuth";

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
    watch,
    formState: { errors },
  } = useForm();

  const axiosInstance = useAxios();
  const { user } = useAuth();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [showTagError, setShowTagError] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "42px",
      borderRadius: "0.5rem",
      border: state.isFocused ? "1px solid #4f46e5" : "1px solid #d1d5db",
      boxShadow: state.isFocused ? '0 0 0 1px #4f46e5' : 'none',
      "&:hover": {
        borderColor: "#4f46e5",
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.5rem",
      marginTop: '4px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#4f46e5' : state.isFocused ? '#e0e7ff' : 'white',
      color: state.isSelected ? 'white' : 'black',
    }),
  };

  const imageFile = watch("image");
  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      const newUrl = URL.createObjectURL(file);
      setImagePreview(newUrl);
      return () => URL.revokeObjectURL(newUrl);
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      if (!tags.includes(newTag)) setTags([...tags, newTag]);
      setTagInput("");
      setShowTagError(false);
    }
  };

  const removeTag = (indexToRemove) => setTags(tags.filter((_, i) => i !== indexToRemove));

  const { data: publishers = [] } = useQuery({
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
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
        formData
      );
      const imageUrl = uploadRes.data.secure_url;
      const selectedPublisher = publishers.find((p) => p._id === data.publisherId);
      const articleData = {
        title: data.title,
        image: imageUrl,
        category: data.category.value,
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
          text: "Your article is now pending review.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        reset();
        setTags([]);
        setTagInput("");
        setImagePreview(null);
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to submit article. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 sm:p-12 space-y-12">

            <div className="text-left pb-6 border-b">
              <h1 className="text-3xl sm:text-4xl font-bold">Create a New Article</h1>
              <p className="mt-2">Fill in the details below to submit your article for publication.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-10">
              
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-2">
                    Article Title
                  </label>
                  <div className="relative">
                    <FaRegNewspaper className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5" />
                    <input
                      type="text"
                      id="title"
                      {...register("title", { required: "Title is required." })}
                      placeholder="e.g., The Future of Renewable Energy"
                      className="w-full pl-11 pr-4 py-2.5 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                  </div>
                  {errors.title && <p className="text-red-500 text-xs mt-2">{errors.title.message}</p>}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-2">
                    Short Description (Summary)
                  </label>
                  <div className="relative">
                    <FaAlignLeft className="absolute left-3.5 top-4 h-5 w-5" />
                    <textarea
                      id="description"
                      {...register("description", { required: "Description is required." })}
                      rows={3}
                      placeholder="A brief summary to catch the reader's attention..."
                      className="w-full pl-11 pr-4 py-2.5 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                  </div>
                  {errors.description && <p className="text-red-500 text-xs mt-2">{errors.description.message}</p>}
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium mb-2">
                    Full Article Content
                  </label>
                  <div className="relative">
                    <FaFileAlt className="absolute left-3.5 top-4 h-5 w-5" />
                    <textarea
                      id="content"
                      {...register("content", { required: "Content is required." })}
                      rows={12}
                      placeholder="Write your full article here. You can use markdown for formatting."
                      className="w-full pl-11 pr-4 py-2.5 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                  </div>
                  {errors.content && <p className="text-red-500 text-xs mt-2">{errors.content.message}</p>}
                </div>
              </div>

              <div className="lg:col-span-1 space-y-8">
                <div>
                  <label className="block text-sm font-medium mb-2">Article Thumbnail</label>
                  <label
                    htmlFor="articleImage"
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition"
                  >
                    {imagePreview ? (
                      <img src={imagePreview} alt="Article Preview" className="w-full h-full object-cover rounded-lg"/>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                        <FaImage className="w-8 h-8 mb-4" />
                        <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span></p>
                        <p className="text-xs">PNG, JPG or GIF</p>
                      </div>
                    )}
                  </label>
                  <input id="articleImage" type="file" accept="image/*" {...register("image", { required: "Article image is required." })} className="hidden" />
                  {errors.image && <p className="text-red-500 text-xs mt-2">{errors.image.message}</p>}
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-2">Category</label>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: "Category is required." }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={categoryOptions}
                        placeholder="Select a category..."
                        styles={customSelectStyles}
                        inputId="category"
                      />
                    )}
                  />
                  {errors.category && <p className="text-red-500 text-xs mt-2">{errors.category.message}</p>}
                </div>

                <div>
                  <label htmlFor="publisherId" className="block text-sm font-medium mb-2">Publisher</label>
                  <div className="relative">
                    <FaBuilding className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5" />
                    <select id="publisherId" {...register("publisherId", { required: "Publisher is required."})} className="w-full pl-11 pr-4 py-2.5 border rounded-lg appearance-none">
                      <option value="">Select a publisher</option>
                      {publishers.map((publisher) => (
                        <option key={publisher._id} value={publisher._id}>{publisher.name}</option>
                      ))}
                    </select>
                  </div>
                  {errors.publisherId && <p className="text-red-500 text-xs mt-2">{errors.publisherId.message}</p>}
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm font-medium mb-2">Tags</label>
                  <div className="relative flex flex-wrap items-center gap-2 w-full border focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 rounded-lg min-h-[42px] p-2">
                    <FaTags className="absolute left-3.5 top-3.5 h-5 w-5" />
                    <div className="pl-8 flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <span key={index} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5">
                          {tag}
                          <button type="button" className="text-indigo-400 hover:text-indigo-600" onClick={() => removeTag(index)}>×</button>
                        </span>
                      ))}
                      <input type="text" id="tags" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleTagKeyDown} placeholder="Add a tag..." className="flex-grow bg-transparent border-none focus:outline-none focus:ring-0 text-sm" />
                    </div>
                  </div>
                  {showTagError && <p className="text-red-500 text-xs mt-2">Please add at least one tag.</p>}
                </div>
              </div>
            </div>

            <div className="pt-8 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
              >
                <FaPaperPlane />
                Submit for Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddArticle;
