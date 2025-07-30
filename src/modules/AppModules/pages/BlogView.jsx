import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useApiMutation from "../../../api/hooks/useApiMutation";
import Header from "../../../components/Header";
import { useSelector } from "react-redux";

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { mutate } = useApiMutation();
  const user = useSelector((state) => state.userData.data);

  useEffect(() => {
    if (!id) return;

    mutate({
      url: `/api/admins/public/blog?id=${id}`,
      method: "GET",
      headers: true,
      onSuccess: (res) => {
        console.log(res.data.data);
        setBlog(res.data?.data || res.data?.blog || null);
        setLoading(false);
      },
      onError: () => {
        setError("Failed to load blog post");
        setLoading(false);
      },
    });
  }, [id, mutate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
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
      <div className="p-8 max-w-4xl mx-auto">
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
            Failed to Load Blog Post
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

  if (!blog) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Blog Post Not Found
          </h3>
          <p className="text-gray-400">
            The blog post you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header mobile data={user} title={"Blog Details"} />
      <div
        className="min-h-screen p-8 rounded-lg"
        style={{ background: "var(--bs-bg)" }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate("/app/blogs")}
            className="mb-8 inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors group"
            style={{
              color: "var(--bs-skyBlue)",
              background: "var(--bs-mobiSkyCloud)",
              border: "1px solid var(--bs-skyBlue)",
            }}
          >
            <svg
              className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blogs
          </button>

          {/* Main Content */}
          <article
            className="rounded-xl shadow-2xl overflow-hidden"
            style={{
              background: "var(--bs-bg)",
              border: "1px solid var(--bs-lineDivider)",
            }}
          >
            {/* Header */}
            <div className="h-72  w-full bg-gray-500">
              {blog.coverImage && (
                <img
                  src={blog.coverImage}
                  className="w-full h-full  object-cover"
                />
              )}
            </div>
            <div
              className="p-8 pb-6"
              style={{ borderBottom: "1px solid var(--bs-lineDivider)" }}
            >
              <h1
                className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
                style={{ color: "var(--bs-color)" }}
              >
                {blog.title}
              </h1>
              <div
                className="flex flex-wrap items-center gap-6 text-sm"
                style={{ color: "var(--bs-tableText)" }}
              >
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
                    />
                  </svg>
                  {formatDate(blog.createdAt)}
                </div>
                {blog.readTime && (
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {blog.readTime} min read
                  </div>
                )}
              </div>
              {/* Tags - Only show if available in API response */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: "var(--bs-mobiSkyCloud)",
                        color: "var(--bs-skyBlue)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-8">
              <div
                className="prose prose-lg max-w-none leading-relaxed"
                style={{ color: "var(--bs-color)" }}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default BlogView;
