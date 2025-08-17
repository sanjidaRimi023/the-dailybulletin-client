import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddPublisher = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [imagePreview, setImagePreview] = useState(null);
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const upload_preset = import.meta.env.VITE_CLOUD_PRESET;

  const onSubmit = async (data) => {
    if (!data.image || data.image.length === 0) {
      toast.error("Please select an image!");
      return;
    }

    setLoading(true);

    const imageFormData = new FormData();
    imageFormData.append("file", data.image[0]);
    imageFormData.append("upload_preset", upload_preset);
    imageFormData.append("cloud_name", cloud_name);

    const cloudinaryRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: imageFormData,
      }
    );

    const cloudinaryData = await cloudinaryRes.json();

    if (!cloudinaryData.secure_url) {
      throw new Error("Image upload failed");
    }

    const imageUrl = cloudinaryData.secure_url;

    const publisherInfo = {
      name: data.name,
      image: imageUrl,
    };

    const res = await axiosSecure.post("/publishers", publisherInfo);
    if (res?.data?.insertedId) {
      toast.success("Publisher added successfully!");
      reset();
      setImagePreview(null);
      setLoading(false);
    } else {
      toast.error("Failed to add publisher to DB");
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-xl w-full p-8 shadow-2xl rounded-2xl shadow-indigo-600 transition duration-300">
        <h2 className="text-xl md:text-3xl font-semibold mb-6 text-center text-indigo-700">
          Add New Publisher
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {imagePreview && (
            <div className="mt-4 flex flex-col items-center justify-center">
              <p className="text-sm mb-1">Image Preview:</p>
              <img
                src={
                  imagePreview ||
                  "https://i.ibb.co/xKJF9LBf/image-upload-icon.png"
                }
                alt="Preview"
                className="w-40 h-40 object-cover rounded-full shadow border border-indigo-600"
              />
            </div>
          )}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Publisher Name
            </label>
            <input
              type="text"
              placeholder="Enter publisher name"
              {...register("name", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Upload Logo/Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: true })}
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg cursor-pointer"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full text-white font-semibold transition ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Uploading..." : "Add Publisher"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPublisher;
