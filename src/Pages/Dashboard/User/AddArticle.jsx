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
      background: "rgb(249 250 251 / 0.5)",
      minHeight: "50px",
      paddingLeft: "2.2rem",
      borderRadius: "0.75rem",
      border: state.isFocused ? "2px solid #6366f1" : "2px solid #d1d5db", 
      boxShadow: "none",
      "&:hover": {
        borderColor: state.isFocused ? "#6366f1" : "#d1d5db", 
      },
    }),
    menu: (provided) => ({
      ...provided,
      background: "#ffffff",
      borderRadius: "0.75rem",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#6366f1' : state.isFocused ? '#e0e7ff' : 'white',
      color: state.isSelected ? 'white' : 'black',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: document.documentElement.classList.contains('dark') ? 'white' : 'inherit'
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
      const newTag = tagInput.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
      setShowTagError(false);
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, i) => i !== indexToRemove));
  };

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
      const selectedPublisher = publishers.find(
        (p) => p._id === data.publisherId
      );
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
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        reset();
        setTags([]);
        setTagInput("");
        setImagePreview(null);
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to submit article!", "error");
    }
  };


  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-4xl w-full mx-auto">
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl shadow-2xl shadow-indigo-500/10 dark:shadow-indigo-500/5">
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 sm:p-12 space-y-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
                Create a New Article
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Fill in the form to submit your article for review.
              </p>
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative">
                <FaRegNewspaper className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  {...register("title", { required: "Title is required." })}
                  placeholder="Article Title"
                  className="w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-300 dark:border-gray-700 focus:border-indigo-500 rounded-xl py-3 pl-12 pr-4 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-0 transition-all duration-300"
                />
                {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title.message}</p>}
              </div>
              <div className="relative">
                <FaThLarge className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Category is required." }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={categoryOptions}
                      placeholder="Select Category"
                      styles={customSelectStyles}
                      className="text-gray-800 dark:text-white placeholder-gray-400"
                    />
                  )}
                />
                {errors.category && <p className="text-red-500 text-sm mt-2">{errors.category.message}</p>}
              </div>
            </div>

         
            <div>
              <label
                htmlFor="articleImage"
                className={`flex flex-col items-center justify-center w-full p-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-2xl cursor-pointer bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${imagePreview ? 'h-48' : ''}`}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Article Preview" className="w-full h-full object-cover rounded-xl"/>
                ) : (
                  <>
                    <FaImage className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload thumbnail</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF</p>
                  </>
                )}
              </label>
              <input id="articleImage" type="file" accept="image/*" {...register("image", { required: "Article image is required." })} className="hidden" />
              {errors.image && <p className="text-red-500 text-sm mt-2">{errors.image.message}</p>}
            </div>

        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative">
                <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select {...register("publisherId", { required: "Publisher is required."})} className="w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-300 dark:border-gray-700 focus:border-indigo-500 rounded-xl py-3 pl-12 pr-4 text-gray-800 dark:text-white focus:outline-none focus:ring-0 appearance-none transition-all duration-300">
                  <option value="">Select a publisher</option>
                  {publishers.map((publisher) => (
                    <option key={publisher._id} value={publisher._id}>{publisher.name}</option>
                  ))}
                </select>
                {errors.publisherId && <p className="text-red-500 text-sm mt-2">{errors.publisherId.message}</p>}
              </div>
              <div className="relative">
                <FaTags className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <div className="flex flex-wrap items-center gap-2 w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-300 dark:border-gray-700 focus-within:border-indigo-500 rounded-xl min-h-[50px] p-2 pl-12">
                  {tags.map((tag, index) => (
                    <span key={index} className="bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {tag}
                      <button type="button" className="text-red-500 hover:text-red-700" onClick={() => removeTag(index)}>×</button>
                    </span>
                  ))}
                  <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleTagKeyDown} placeholder="Type and press Enter" className="flex-grow bg-transparent border-none focus:outline-none text-sm text-gray-800 dark:text-white placeholder-gray-400" />
                </div>
                {showTagError && <p className="text-red-500 text-sm mt-2">Enter at least one tag</p>}
              </div>
            </div>

          
            <div className="relative">
              <FaAlignLeft className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <textarea
                {...register("description", { required: "Description is required." })}
                rows={3}
                placeholder="Brief summary of the article..."
                className="w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-300 dark:border-gray-700 focus:border-indigo-500 rounded-xl py-3 pl-12 pr-4 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-0 transition-all duration-300"
              />
              {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description.message}</p>}
            </div>

            
            <div className="relative">
              <FaFileAlt className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <textarea
                {...register("content", { required: "Content is required." })}
                rows={10}
                placeholder="Write your full article content here..."
                className="w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-300 dark:border-gray-700 focus:border-indigo-500 rounded-xl py-3 pl-12 pr-4 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-0 transition-all duration-300"
              />
              {errors.content && <p className="text-red-500 text-sm mt-2">{errors.content.message}</p>}
            </div>

          
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex items-center justify-center bg-indigo-600 text-white font-bold py-4 px-4 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Submit Article
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddArticle;