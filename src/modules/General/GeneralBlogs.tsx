import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BlogView from "../AppModules/pages/BlogView";
import BaseBlogCard from "../../components/BaseBlogCard";
import Header from "../Home/layouts/Header";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  slug: string;
  published: boolean;
  publishedAt: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

const LoadingComponent = () => {
  return (
    <div className="container mx-auto">
      <div className="mt-6">
        <h2 className="text-3xl font-bold">Latest Posts</h2>
        <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              <div className="p-6">
                <div className="h-6 bg-gray-300 rounded mb-3"></div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-3 bg-gray-300 rounded w-16"></div>
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ErrorComponent = ({
  error,
  onRetry,
}: {
  error: Error;
  onRetry: () => void;
}) => {
  return (
    <div className="container mx-auto">
      <div className="mt-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 mb-4">
            <svg
              className="w-12 h-12 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Failed to load blog posts
          </h3>
          <p className="text-red-600 mb-4">
            {error.message ||
              "Something went wrong while fetching the blog posts."}
          </p>
          <button
            onClick={onRetry}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default function GeneralBlogs() {
  let query = useQuery({
    queryKey: ["public_blogs"],
    queryFn: async () => {
      let resp = await fetch(
        "https://api.mobiholder.tech/api/admins/public/blogs",
      );
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
      return await resp.json();
    },
  });

  return (
    <div>
      <Header />
      <div className="h-72 bg-gray-800 relative flex ">
        <img src="" alt="" />
        <div className="relative isolate w-full flex ">
          <img
            className="left-0 absolute  w-full h-full  object-cover"
            src="./blog_header.jpeg"
            alt=""
          />
          <div className="w-full h-full bg-black/50 absolute"></div>
          <div className="my-auto   mx-auto w-full container  relative">
            <h2 className="text-4xl font-bold text-white">Our Blog</h2>
            <p className="text-lg text-white mt-2">
              Read the latest insights and Updates; stay informed with our
              latest articles.
            </p>
          </div>
        </div>
      </div>

      {query.isLoading && <LoadingComponent />}

      {query.isError && (
        <ErrorComponent
          error={query.error as Error}
          onRetry={() => query.refetch()}
        />
      )}

      {query.isSuccess && (
        <div className="container mx-auto pb-12a">
          <div className="mt-6">
            <h2 className="text-3xl font-bold">Latest Posts</h2>
            <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
              {query.isSuccess &&
                query?.data?.data &&
                query?.data?.data?.map((item: BlogPost) => {
                  return <BlogCard key={item.id} {...item} />;
                })}
            </div>
            <div className="h-[400px]"></div>
          </div>
        </div>
      )}
    </div>
  );
}

let BlogCard = ({
  id,
  title,
  content,
  author,
  slug,
  publishedAt,
  views,
}: BlogPost) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getExcerpt = (htmlContent: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const textContent = tempDiv.textContent || tempDiv.innerText || "";
    return textContent.length > 150
      ? textContent.substring(0, 150) + "..."
      : textContent;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {getExcerpt(content)}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>By {author}</span>
          <span>{formatDate(publishedAt)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">{views} views</span>
          <Link
            to={`/blogs/${id}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};
