import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";

const getStatusBadge = (status) => {
  const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full capitalize";
  switch (status) {
    case "approved":
      return <span className={`${baseClasses} bg-green-100 text-green-800`}>Approved</span>;
    case "pending":
      return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Pending</span>;
    case "rejected":
      return <span className={`${baseClasses} bg-red-100 text-red-800`}>Rejected</span>;
    case "draft":
      return <span className={`${baseClasses} bg-gray-200 text-gray-800`}>Draft</span>;
    case "published":
      return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>Published</span>;
    default:
      return null;
  }
};

const UserArticleCard = ({ article, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <img
        src={article.image}
        alt={article.title}
        className="h-52 w-full object-cover"
      />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 uppercase">
            {article.category}
          </span>
          {getStatusBadge(article.status)}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow line-clamp-3">
          {article.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-auto border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                    <FaEye />
                    <span>{article.viewCount || 0} views</span>
                </div>
                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="mt-4 flex gap-3">
                <button
                    onClick={onEdit}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                >
                    <FaEdit className="mr-2"/> Edit
                </button>
                <button
                    onClick={onDelete}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
                >
                    <FaTrashAlt className="mr-2"/> Delete
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserArticleCard;