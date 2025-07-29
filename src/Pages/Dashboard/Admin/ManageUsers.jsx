import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrash, FaEye } from "react-icons/fa";
import LoadSpinner from "../../../Components/Ui/LoadSpinner";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      // Premium users first
      return res.data.sort(
        (a, b) => (b.role === "premium") - (a.role === "premium")
      );
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/user/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "User has been deleted.", "success");
          refetch();
        }
      } catch (err) {
        console.log(err);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  if (isLoading) return <LoadSpinner />;

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-4">
        Failed to load users: {error.message}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-10 bg-indigo-600 rounded-sm"></div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Users List
        </h2>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-sm bg-white">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white uppercase">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-blue-50 transition duration-200"
                >
                  <td className="py-3 px-4">{index + 1}</td>

                  {/* ✅ USER IMAGE */}
                  <td className="py-3 px-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                      <img
                        src={
                          user.photoURL ||
                          "https://i.ibb.co/4pDNDk1/avatar-placeholder.png"
                        }
                        alt={user.name || "User"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://i.ibb.co/4pDNDk1/avatar-placeholder.png";
                        }}
                      />
                    </div>
                  </td>

                  <td className="py-3 px-4">{user.name || "N/A"}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 capitalize">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      {user.role || "user"}
                    </span>
                  </td>

                  <td className="py-3 px-4 flex justify-center items-center gap-2">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1"
                      title="View User"
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                      title="Delete User"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
