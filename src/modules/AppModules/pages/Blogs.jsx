import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApiMutation from "../../../api/hooks/useApiMutation";
import Header from "../../../components/Header";
import { setUser } from "../../../reducers/userSlice";
import { useSelector } from "react-redux";
import BaseBlogCard from "../../../components/BaseBlogCard";
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const extractPreview = (content) => {
  const plainText = content.replace(/<[^>]+>/g, "");
  return plainText.length > 120 ? plainText.slice(0, 120) + "..." : plainText;
};
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { mutate } = useApiMutation();
  const user = useSelector((state) => state.userData.data);

  useEffect(() => {
    mutate({
      url: "/api/admins/public/blogs",
      method: "GET",
      headers: true,
      onSuccess: (res) => {
        setBlogs(res.data?.data || res.data?.blogs || []);
        setLoading(false);
      },
      onError: () => {
        setError("Failed to load blogs");
        setLoading(false);
      },
    });
  }, []);

  const LoadingSkeleton = () => (
    <div className="p-8">
      <div className="h-8 bg-gray-700 rounded w-32 mb-8 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-800 rounded-xl p-6 animate-pulse">
            <div className="h-6 bg-gray-700 rounded mb-3"></div>
            <div className="h-4 bg-gray-700 rounded w-24 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) return <LoadingSkeleton />;

  if (error) {
    return (
      <div className="p-8">
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-900/20 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Unable to Load Blogs
          </h3>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header mobile data={user} title={"Blogs"} />
      <div
        className="p-8 min-h-screen rounded-lg"
        style={{ background: "var(--bs-bg)" }}
      >
        {/* Header */}
        {/* <h1
          className="text-3xl font-bold mb-8"
          style={{ color: "var(--bs-color)" }}
        >
          Blogs
        </h1> */}

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <div
              className="inline-flex items-center justify-center w-16 h-16 mb-4"
              style={{
                background: "var(--bs-mobiSkyCloud)",
                borderRadius: "9999px",
              }}
            >
              <svg
                className="w-8 h-8"
                style={{ color: "var(--bs-skyBlue)" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"
                />
              </svg>
            </div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--bs-color)" }}
            >
              No blogs found
            </h3>
            <p style={{ color: "var(--bs-tableText)" }}>
              Check back later for new content.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <BaseBlogCard {...blog} key={blog.id} />
              ))}
            </div>

            {/* Additional message for single blog */}
            {blogs.length === 1 && (
              <div
                className="text-center mt-12 p-6 rounded-lg border"
                style={{
                  background: "var(--bs-mobiSkyCloud)",
                  borderColor: "var(--bs-lineDivider)",
                }}
              >
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                  style={{ background: "var(--bs-skyBlue)", opacity: 0.15 }}
                >
                  <svg
                    className="w-6 h-6"
                    style={{ color: "var(--bs-skyBlue)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: "var(--bs-color)" }}
                >
                  More Content Coming Soon!
                </h3>
                <p style={{ color: "var(--bs-tableText)" }}>
                  We're working on publishing more blog posts. Check back later
                  for fresh content.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Blogs;
