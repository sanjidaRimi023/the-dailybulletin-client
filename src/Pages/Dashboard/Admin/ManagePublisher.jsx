import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import LoadSpinner from "../../../Components/Ui/LoadSpinner";

const ManagePublisher = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [editingPublisher, setEditingPublisher] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const upload_preset = import.meta.env.VITE_CLOUD_PRESET;

  const { register, handleSubmit, watch, reset, getValues } = useForm({
    defaultValues: {
      name: editingPublisher?.name || "",
      image: editingPublisher?.image || "",
    },
  });

  const imageURL = watch("image");

  const {
    data: publishers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publishers");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadSpinner />;
  }

  const filteredPublishers = publishers.filter((pub) =>
    pub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      await axiosSecure.delete(`/publishers/${id}`);
      Swal.fire("Deleted!", "Publisher has been deleted.", "success");
      refetch();
    }
  };

  const handleEditSubmit = async (data) => {
    const updated = {
      name: data.name,
      image: data.image,
    };

    try {
      const res = await axiosSecure.put(
        `/publishers/${editingPublisher._id}`,
        updated
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire(
          "Updated!",
          "Publisher info updated successfully.",
          "success"
        );
        refetch();
        setEditingPublisher(null);
        reset();
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
      
        <div className="w-1 h-10 bg-indigo-600 rounded-sm"></div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Publisher list
        </h2>
      </div>

      <div className="mb-4">
        <label
          for="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <CiSearch />
          </div>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            class="block p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
            required
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead className="bg-indigo-100 text-indigo-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPublishers.map((publisher, index) => (
              <tr
                key={publisher._id}
                className="hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">
                  <img
                    src={publisher.image}
                    alt={publisher.name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-gray-800">
                  {publisher.name}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {new Date(publisher.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 flex items-center justify-center gap-2">
                  <button
                    className="flex items-center gap-1 px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                    onClick={() => setSelectedPublisher(publisher)}
                  >
                    <FaEye className="text-sm" /> View
                  </button>
                  <button
                    className="flex items-center gap-1 px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                    onClick={() => {
                      setEditingPublisher(publisher);
                      reset({ name: publisher.name, image: publisher.image });
                    }}
                  >
                    <FaEdit className="text-sm" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(publisher._id)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    <FaTrash className="text-sm" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {selectedPublisher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md mx-4 rounded-2xl bg-white shadow-2xl p-6 sm:p-8 transition-all duration-300 animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
              onClick={() => setSelectedPublisher(null)}
              aria-label="Close modal"
            >
              <RxCross1 />
            </button>
            <div className="flex flex-col items-center">
              <img
                src={selectedPublisher.image}
                alt={selectedPublisher.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-gray-200 shadow-md mb-4"
              />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                {selectedPublisher.name}
              </h2>
              <p className="text-sm text-gray-600 bg-gray-100 px-4 py-1 rounded-full">
                Created on:{" "}
                {new Date(selectedPublisher.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {editingPublisher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit(handleEditSubmit)}
            className="relative w-full max-w-md mx-4 rounded-2xl bg-white shadow-2xl p-6 sm:p-8 transition-all duration-300 animate-fade-in"
          >
            <button
              type="button"
              onClick={() => {
                setEditingPublisher(null);
                reset();
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
              aria-label="Close modal"
            >
              <RxCross1 />
            </button>
            <h3 className="text-center text-2xl font-semibold text-gray-800 mb-4">
              Edit Publisher
            </h3>
            <div className="flex justify-center mb-4">
              <img
                src={imageURL || editingPublisher.image}
                alt="Preview"
                className="w-24 h-24 object-cover border rounded-full shadow"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("upload_preset", upload_preset);

                  try {
                    const res = await fetch(
                      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
                      {
                        method: "POST",
                        body: formData,
                      }
                    );
                    const data = await res.json();
                    if (data.secure_url) {
                      reset({ ...getValues(), image: data.secure_url });
                    }
                  } catch (err) {
                    console.error("Cloudinary Upload Error:", err);
                    Swal.fire(
                      "Upload Failed",
                      "Image upload failed. Try again.",
                      "error"
                    );
                  }
                }}
                className="file-input file-input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Update Publisher
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManagePublisher;
