import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import LoadSpinner from "../../../Components/Ui/LoadSpinner";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadSpinner />;
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-4">
        Failed to load users: {error.message}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">User Type</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50 transition duration-300"
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{user.name || "N/A"}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700 capitalize">
                    {user.role || "user"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700 capitalize">
                    {user.userType || "free"}
                  </span>
                </td>
                <td className="px-4 py-3 flex items-center justify-center gap-2">
                  <button className="flex items-center gap-1 px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition">
                    <FaEye className="text-sm" /> View
                 </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
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
