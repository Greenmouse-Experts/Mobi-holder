import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Home/layouts/Header";

export default function GeneralBlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  let query = useQuery({
    queryKey: ["public_blogs"],
    queryFn: async () => {
      let resp = await fetch(
        `https://api.mobiholder.tech/api/admins/public/blog?id=${id}`,
      );
      return await resp.json();
    },
  });

  if (query.isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog post...</p>
          </div>
        </div>
      </>
    );
  }

  if (query.isError) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-600">
              Failed to load blog post. Please try again later.
            </p>
          </div>
        </div>
      </>
    );
  }

  const blog = query.data.data;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </button>

          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {blog?.image && (
              <img
                src={blog.image}
                alt={blog.title || "Blog post image"}
                className="w-full h-64 md:h-96 object-cover"
              />
            )}

            <div className="p-6 md:p-8">
              <header className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {blog?.title || "Untitled Blog Post"}
                </h1>

                <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4">
                  {blog?.author && (
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      By {blog.author}
                    </span>
                  )}

                  {blog?.publishedAt && (
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {new Date(blog.publishedAt).toLocaleDateString()}
                    </span>
                  )}

                  {blog?.category && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {blog.category}
                    </span>
                  )}
                </div>
              </header>

              {blog?.summary && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-gray-700 font-medium italic">
                    {blog.summary}
                  </p>
                </div>
              )}

              <div className="prose prose-lg max-w-none">
                {blog?.content ? (
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                ) : (
                  <p className="text-gray-600">
                    No content available for this blog post.
                  </p>
                )}
              </div>

              {blog?.tags && blog.tags.length > 0 && (
                <footer className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-gray-600 mr-2">Tags:</span>
                    {blog.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </footer>
              )}
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
