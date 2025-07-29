// ============================
// 🔥 FRONTEND: ArticleDetail.jsx with Right Sidebar + Like System
// ============================

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import LoadSpinner from "../Components/Ui/LoadSpinner";

const ArticleDetail = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLike = async () => {
    try {
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
      await axiosSecure.patch(`/singlearticle/like/${id}`, {
        email: user?.email,
        like: !isLiked,
      });
    } catch (err) {
      console.error("Failed to update like:", err);
    }
  };

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!user?.email || !id) return;
      try {
        const res = await axiosSecure.get(`/singlearticle/like-status/${id}?email=${user.email}`);
        setIsLiked(res.data?.liked);
      } catch (err) {
        console.error("Error checking like status:", err);
      }
    };
    fetchLikeStatus();
  }, [user, id, axiosSecure]);

  const {
    data: article,
    isLoading: loadingArticle,
    error: errorArticle,
  } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/singlearticle/${id}`);
      setLikeCount(res.data.likeCount || 0);
      return res.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (article) {
      axiosSecure.patch(`/article/viewcount/${id}`).catch(console.error);
    }
  }, [article, id, axiosSecure]);

  const {
    data: related = [],
    isLoading: loadingRelated,
    error: errorRelated,
  } = useQuery({
    queryKey: ["relatedArticles", article?.category],
    queryFn: async () => {
      if (!article?.category) return [];
      const res = await axiosSecure.get(`/article/approved?category=${article.category}`);
      return res.data.filter((item) => item._id !== id).slice(0, 5);
    },
    enabled: !!article?.category,
  });

  if (loadingArticle) return <LoadSpinner />;
  if (errorArticle)
    return <div className="p-5 text-center text-red-500 font-semibold">Error loading article</div>;

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto py-8 lg:py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* 🔵 Main Article Section */}
          <main className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl shadow-sm">
            <article className="space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-indigo-800">{article.title}</h1>

              <div className="flex items-center gap-4 text-sm text-gray-500 border-b border-t border-gray-100 py-4">
                <img
                  src={article.publisher_image}
                  className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
                  alt={article.publisher}
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">{article.publisher}</span>
                  <span>
                    Published on {new Date(article.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <img src={article.image} alt={article.title} className="w-full h-auto max-h-[500px] object-cover rounded-xl" />

              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="text-lg text-gray-700 leading-relaxed">{article.content}</p>
              </div>

              <div className="pt-6 space-y-5">
                <div className="flex items-center justify-between border-t pt-5">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleLike}
                      className="flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors duration-200"
                    >
                      {isLiked ? <FaHeart className="text-rose-500 text-xl" /> : <FaRegHeart className="text-xl" />}
                      <span className="font-semibold">{likeCount.toLocaleString()} Likes</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors duration-200">
                      <FaShareAlt />
                      <span>Share</span>
                    </button>
                  </div>
                  <span className="text-sm text-yellow-400 font-bold">
                    {article.viewCount?.toLocaleString() || 0} Views
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {article.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium cursor-pointer hover:bg-rose-100 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </main>

          {/* 🟣 Sidebar - Related Articles */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl shadow-sm sticky top-8">
              <h2 className="text-xl font-bold text-slate-800 border-b pb-3 mb-4">Related Articles</h2>
              <div className="space-y-4">
                {loadingRelated && <p className="text-sm text-gray-500">Loading...</p>}
                {errorRelated && <p className="text-sm text-red-500">Failed to load articles.</p>}
                {!loadingRelated && !errorRelated && related.length === 0 && (
                  <p className="text-sm text-gray-500">No related articles found.</p>
                )}

                {related.map((item) => (
                  <Link
                    to={`/article-detail/${item._id}`}
                    key={item._id}
                    className="flex gap-4 group"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex flex-col justify-center">
                      <p className="text-base font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                        {item.title.slice(0, 55)}...
                      </p>
                      <span className="text-xs text-purple-400">{item.category}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
