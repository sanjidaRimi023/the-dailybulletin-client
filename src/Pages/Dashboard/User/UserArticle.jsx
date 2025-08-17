import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

import LoadSpinner from "../../../Components/Ui/LoadSpinner";
import UserArticleModal from "../../../Components/Ui/UserArticleModal";
import UserArticleCard from "../../../Components/Ui/UserArticleCard";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UserArticle = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editArticle, setEditArticle] = useState(null);

  const {
    data: UserArticle = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["UserArticle", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/article/my-article?email=${user.email}`
      );
      return res.data;
    },
  });
  

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/article/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Your article has been deleted.", "success");
        refetch();
      }
    }
  };

  if (isLoading) {
    return <LoadSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold">
          My Articles
        </h1>
        <span className="px-4 py-2 text-sm font-medium bg-indigo-600 rounded-full">
          {UserArticle.length} Articles
        </span>
      </div>

      {UserArticle.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {UserArticle.map((article) => (
            <UserArticleCard
              key={article._id}
              article={article}
              onEdit={() => setEditArticle(article)}
              onDelete={() => handleDelete(article._id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">
            No Articles Found
          </h2>
          <p className="mt-2">
            You have not created any articles yet.
          </p>
        </div>
      )}

      {editArticle && (
        <UserArticleModal
          article={editArticle}
          onClose={() => setEditArticle(null)}
          onSuccess={() => {
            setEditArticle(null);
            refetch();
          }}
        />
      )}
    </div>
  );
};

export default UserArticle;
