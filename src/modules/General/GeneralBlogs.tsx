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
export default function GeneralBlogs() {
  let query = useQuery({
    queryKey: ["public_blogs"],
    queryFn: async () => {
      let resp = await fetch(
        "https://api.mobiholder.tech/api/admins/public/blogs",
      );
      return await resp.json();
    },
  });
  return (
    <div>
      <Header />
      <div className="h-72 bg-gray-800 relative flex">
        <img src="" alt="" />
        <div className="my-auto container mx-auto">
          <h2 className="text-2xl font-bold text-white">Our Blog</h2>
          <p className="text-lg text-white">lorem ipsum</p>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="mt-6">
          <h2 className="text-3xl font-bold">Latest Posts</h2>
          <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
            {query?.data?.data.map((item: BlogPost) => {
              return <BlogCard key={item.id} {...item} />;
            })}
          </div>
        </div>
      </div>
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
