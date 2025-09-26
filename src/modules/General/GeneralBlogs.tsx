import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BlogView from "../AppModules/pages/BlogView";
import BaseBlogCard from "../../components/BaseBlogCard";
import Header from "../Home/layouts/Header";
import axios, { AxiosError } from "axios";
//@ts-nocheck
interface BlogPost {
  id: string;
  title: string;
  banner: string;
  content: string;
  author: string;
  slug: string;
  published: boolean;
  publishedAt: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}
interface BlogPostsResponse {
  code: number;
  message: string;
  data: BlogPost[];
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
  let query = useQuery<BlogPostsResponse>({
    queryKey: ["public_blogs"],
    queryFn: async () => {
      let resp = await axios.get(
        "https://api.mobiholder.tech/api/admins/public/blogs",
      );
      return resp.data;
    },
  });

  if (query.isFetching)
    return (
      <>
        <Header /> <LoadingComponent />
      </>
    );
  if (query.error)
    return (
      <>
        onRetry={() => query.refetch()}
        <Header /> <ErrorComponent error={query.error as AxiosError} />
      </>
    );

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
      {/*
      {query.isFetching && <LoadingComponent />}

      {query.isError && (
        <ErrorComponent
          error={query.error as Error}
          onRetry={() => query.refetch()}
        />
      )}*/}

      {query.isSuccess && (
        <div className="container mx-auto pb-12a">
          <div className="mt-6">
            <h2 className="text-3xl font-bold">Latest Posts</h2>
            <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
              {query.data?.data &&
                query.data?.data &&
                query.data?.data?.map((item: BlogPost) => {
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
  banner,
}: BlogPost) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getExcerpt = (htmlContent: string) => {
    if (!htmlContent || typeof htmlContent !== "string") {
      return "";
    }

    try {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlContent;
      const textContent = tempDiv.textContent || tempDiv.innerText || "";
      return textContent.length > 120
        ? textContent.substring(0, 120) + "..."
        : textContent;
    } catch (error) {
      return "";
    }
  };

  // return <>{banner}</>;
  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {banner && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={banner}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-semibold">
              {author.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">{author}</span>
            <span className="text-xs text-gray-500">
              {formatDate(publishedAt)}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {getExcerpt(content)}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>{views.toLocaleString()} views</span>
          </div>

          <Link
            to={`/blogs/${id}`}
            className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Read More
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
