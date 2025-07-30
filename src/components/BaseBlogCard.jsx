// import { useNavigate, useNavigation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { extractPreview, formatDate } from "../modules/AppModules/pages/Blogs";

export default function BaseBlogCard(blog) {
  const navigate = useNavigate();
  return (
    <article
      key={blog.id}
      className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border shadow-md hover:shadow-xl hover:scale-[1.02]"
      style={{
        background: "var(--bs-cardSupport)",
        border: "1.5px solid var(--bs-lineDivider)",
        boxShadow:
          "0 4px 24px 0 rgba(36,46,242,0.06), 0 1.5px 6px 0 rgba(36,46,242,0.04)",
        transition: "box-shadow 0.2s, transform 0.2s",
      }}
      onClick={() => {
        // console.log(blog);
        navigate(`/app/blogs/${blog.id}`);
      }}
    >
      {blog.coverImage ? (
        <div className="relative h-48 w-full mb-4">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ) : (
        <div className="relative h-48 w-full mb-4 bg-gray-500"></div>
      )}

      <div className="p-6">
        {/* Blog Title */}
        <h2
          className="text-lg font-semibold mb-3 group-hover:text-blue-400 transition-colors leading-tight"
          style={{ color: "var(--bs-color)" }}
        >
          {blog.title}
        </h2>

        {/* Date */}
        <div
          className="flex items-center text-sm mb-4"
          style={{ color: "var(--bs-tableText)" }}
        >
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

        {/* Content Preview */}
        <p
          className="leading-relaxed mb-4 text-sm"
          style={{ color: "var(--bs-tableText)" }}
        >
          {extractPreview(blog.content)}
        </p>

        {/* Read More Link */}
        <div
          className="flex items-center font-medium text-sm group-hover:text-blue-300 transition-colors"
          style={{ color: "var(--bs-skyBlue)" }}
        >
          Read more
          <svg
            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </article>
  );
}
