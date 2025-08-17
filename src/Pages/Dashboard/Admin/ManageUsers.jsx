import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrash, FaEye } from "react-icons/fa";
import LoadSpinner from "../../../Components/Ui/LoadSpinner";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

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
      return res.data.sort((a, b) => {
        if (a.isPremium && !b.isPremium) return -1;
        if (!a.isPremium && b.isPremium) return 1;
        if (a.role === 'admin' && b.role !== 'admin') return -1;
        if (a.role !== 'admin' && b.role === 'admin') return 1;
        return 0;
      });
    },
  });

  const handlePreview = (user) => {
    Swal.fire({
      title: `<strong class="text-2xl">${user.displayName || user.name || "User Details"}</strong>`,
      html: `
        <div class="text-left p-4 space-y-3">
          <img 
            src="${user.photoURL || 'https://i.ibb.co/4pDNDk1/avatar-placeholder.png'}" 
            alt="User photo" 
            class="w-24 h-24 rounded-full mx-auto border-4 border-indigo-200 object-cover"
          />
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Role:</strong> <span class="capitalize font-semibold text-indigo-600">${user.role}</span></p>
          <p><strong>Premium Member:</strong> ${user.isPremium ? '<span class="text-green-600 font-bold">Yes</span>' : 'No'}</p>
          <p><strong>Joined:</strong> ${new Date(user.created_at).toLocaleDateString()}</p>
          <p><strong>Last Login:</strong> ${new Date(user.last_login).toLocaleString()}</p>
        </div>
      `,
      showCloseButton: true,
      showConfirmButton: false,
      focusConfirm: false,
    });
  };

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
      <div className="text-center mt-4">
        Failed to load users: {error.message}
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Admin | Manage user
        </title>
      </Helmet>
    <div className="p-4 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-10 bg-indigo-600 rounded-sm"></div>
        <h2 className="text-2xl md:text-3xl font-bold">
          Users List
        </h2>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gradient-to-r from-indigo-600 to-indigo-700 uppercase">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-indigo-50 transition duration-200"
                >
                  <td className="py-3 px-4 font-medium">{index + 1}</td>
                  <td className="py-3 px-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2">
                      <img
                        src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar-placeholder.png"}
                        alt={user.displayName || "User"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium">{user.displayName || user.name || "N/A"}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 capitalize">
                    {user.isPremium ? (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-500">
                        Premium
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold">
                        {user.role}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 flex justify-center items-center gap-2">
                    <button
                      onClick={() => handlePreview(user)}
                      className="bg-indigo-500 hover:bg-indigo-600 p-2 rounded-full flex items-center transition-transform transform hover:scale-110"
                      title="View User Details"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 hover:bg-red-600 p-2 rounded-full flex items-center transition-transform transform hover:scale-110"
                      title="Delete User"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default ManageUsers;
