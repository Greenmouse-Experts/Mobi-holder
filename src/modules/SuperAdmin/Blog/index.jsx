import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ReusableModal from "../../../components/ReusableModal";
import useModal from "../../../hooks/modal";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { format } from "date-fns";
import Loader from "../../../components/Loader";
import useApiMutation from "../../../api/hooks/useApiMutation.jsx";
import Header from "../header.jsx";
import { useSelector } from "react-redux";
import useFileUpload from "../../../api/hooks/useFileUpload.jsx";

// Blog Card Component
const BlogCard = ({ blog, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  const { uploadFiles } = useFileUpload();

  // Truncate content to show preview
  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const truncateContent = (content, maxLength = 150) => {
    const strippedContent = stripHtml(content);
    if (strippedContent.length <= maxLength) return strippedContent;
    return `${strippedContent.substring(0, maxLength)}...`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-colors duration-300">
      {blog.banner && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={blog.banner}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {blog.title}
          </h3>
          <Menu placement="bottom-end">
            <MenuHandler>
              <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 dark:text-gray-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </MenuHandler>
            <MenuList className="dark:bg-gray-900 dark:text-gray-100">
              <MenuItem
                onClick={() => onEdit(blog)}
                className="flex items-center gap-2 dark:hover:bg-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 0L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Blog
              </MenuItem>
              <MenuItem
                onClick={() => onDelete(blog)}
                className="flex items-center gap-2 text-red-500 dark:text-red-400 dark:hover:bg-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete Blog
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
          {formatDate(blog.createdAt)}
        </p>
        <div className="text-gray-700 dark:text-gray-200 mb-4">
          {truncateContent(blog.content)}
        </div>
      </div>
    </div>
  );
};

// Blog Editor Component
const BlogEditor = ({ blog = null, onSubmit, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(blog?.banner || null);
  const [isUploading, setIsUploading] = useState(false);
  const { uploadFiles } = useFileUpload();

  const [editorState, setEditorState] = useState(() => {
    if (blog && blog.content) {
      const contentBlock = htmlToDraft(blog.content);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks,
        );
        return EditorState.createWithContent(contentState);
      }
    }
    return EditorState.createEmpty();
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title: blog ? blog.title : "",
    },
  });

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      // Validate file size (e.g., 5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }

      setSelectedFile(file);

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setBannerPreview(previewUrl);
    }
  };

  const removeBanner = () => {
    setSelectedFile(null);
    setBannerPreview(null);
    // Clear the file input
    const fileInput = document.getElementById("banner-upload");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleFormSubmit = async (data) => {
    setIsLoading(true);

    try {
      let bannerUrl = bannerPreview;

      // Upload banner if a new file is selected
      if (selectedFile) {
        setIsUploading(true);
        try {
          const uploadResponse = await uploadFiles([selectedFile]);
          if (uploadResponse && uploadResponse.length > 0) {
            bannerUrl = uploadResponse[0];
          }
        } catch (uploadError) {
          console.error("Error uploading banner:", uploadError);
          toast.error("Failed to upload banner image");
          return;
        } finally {
          setIsUploading(false);
        }
      }

      // Convert editor content to HTML
      const contentState = editorState.getCurrentContent();
      const htmlContent = draftToHtml(convertToRaw(contentState));

      const blogData = {
        title: data.title,
        content: htmlContent,
        banner: bannerUrl,
      };

      // If editing an existing blog, include the id
      if (blog && blog.id) {
        blogData.id = blog.id;
        console.log("Including blog ID in update:", blog.id);
      }

      await onSubmit(blogData);
    } catch (error) {
      console.error("Error submitting blog:", error);
      toast.error("Failed to save blog post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-4 max-h-[80vh] overflow-y-auto">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Blog Title *
          </label>
          <input
            type="text"
            id="title"
            {...register("title", {
              required: "Blog title is required",
              minLength: {
                value: 5,
                message: "Title must be at least 5 characters long",
              },
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mobiBlue focus:border-transparent bg-transparent"
            placeholder="Enter your blog title..."
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Banner Upload Field */}
        <div>
          <label className="block text-sm font-medium mb-2">Banner Image</label>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="banner-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span>{" "}
                    banner image
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
                <input
                  id="banner-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </label>
            </div>

            {/* Banner Preview */}
            {bannerPreview && (
              <div className="relative">
                <img
                  src={bannerPreview}
                  alt="Banner preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-300"
                />
                <button
                  type="button"
                  onClick={removeBanner}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Editor */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Blog Content *
          </label>
          <div className="border border-gray-300 rounded-md max-h-[400px] overflow-hidden">
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class px-4 py-2 min-h-[300px] max-h-[350px] overflow-y-auto"
              toolbarClassName="toolbar-class border-b border-gray-300"
              placeholder="Write your blog content here..."
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "list",
                  "textAlign",
                  "link",
                  "history",
                ],
                inline: {
                  options: ["bold", "italic", "underline", "strikethrough"],
                },
                blockType: {
                  options: [
                    "Normal",
                    "H1",
                    "H2",
                    "H3",
                    "H4",
                    "H5",
                    "H6",
                    "Blockquote",
                  ],
                },
                list: {
                  options: ["unordered", "ordered"],
                },
                textAlign: {
                  options: ["left", "center", "right", "justify"],
                },
              }}
            />
          </div>
          {editorState.getCurrentContent().hasText() === false && (
            <p className="text-red-500 text-sm mt-1">
              Blog content is required
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={
              isLoading ||
              isUploading ||
              !editorState.getCurrentContent().hasText()
            }
            className="px-6 py-2 bg-mobiBlue text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            {(isLoading || isUploading) && (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="opacity-25"
                />
                <path
                  fill="currentColor"
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            <span>
              {isUploading
                ? "Uploading banner..."
                : isLoading
                  ? blog
                    ? "Updating..."
                    : "Creating..."
                  : blog
                    ? "Update Blog Post"
                    : "Create Blog Post"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

// Delete Confirmation Modal
const DeleteConfirmation = ({ blog, onConfirm, onCancel }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirm(blog);
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog post");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-medium mb-4">Delete Blog Post</h3>
      <p className="text-gray-600 mb-6">
        Are you sure you want to delete the blog titled "{blog.title}"? This
        action cannot be undone.
      </p>

      <div className="flex justify-end space-x-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          disabled={isDeleting}
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          disabled={isDeleting}
        >
          {isDeleting && (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="opacity-25"
              />
              <path
                fill="currentColor"
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          <span>{isDeleting ? "Deleting..." : "Delete Blog Post"}</span>
        </button>
      </div>
    </div>
  );
};

// Main Blog Component
const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { openModal, isOpen, modalOptions, closeModal } = useModal();
  const { mutate } = useApiMutation();
  // const user = useSelector((state) => state.userData.data);

  // Fetch all blogs using useApiMutation for better error handling
  const fetchBlogs = () => {
    setIsLoading(true);
    setError(null);

    mutate({
      url: "/api/admins/blogs",
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        console.log("API Response:", response);
        let blogsData;

        if (response.data && Array.isArray(response.data)) {
          blogsData = response.data;
        } else if (
          response.data &&
          response.data.data &&
          Array.isArray(response.data.data)
        ) {
          blogsData = response.data.data;
        } else if (
          response.data &&
          response.data.blogs &&
          Array.isArray(response.data.blogs)
        ) {
          blogsData = response.data.blogs;
        } else {
          // If we can't find an array in the response, use an empty array
          console.warn("Could not find blogs array in API response");
          blogsData = [];
        }

        setBlogs(blogsData);
        setIsLoading(false);
      },
      onError: (error) => {
        console.error("Error fetching blogs:", error);
        setError("Failed to fetch blogs. Please try again later.");
        setBlogs([]); // Ensure blogs is set to an empty array on error
        setIsLoading(false);
      },
    });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Create a new blog using useApiMutation
  const handleCreateBlog = (blogData) => {
    return new Promise((resolve, reject) => {
      mutate({
        url: "/api/admins/blog/create",
        method: "POST",
        data: blogData,
        headers: true,
        onSuccess: (response) => {
          toast.success("Blog post created successfully!");
          fetchBlogs(); // Refresh the blog list
          closeModal();
          resolve(response.data);
        },
        onError: (error) => {
          console.error("Error creating blog post:", error);
          reject(error);
        },
      });
    });
  };

  // Update an existing blog using useApiMutation
  const handleUpdateBlog = (blogData) => {
    return new Promise((resolve, reject) => {
      mutate({
        url: "/api/admins/blog/update",
        method: "POST",
        data: blogData,
        headers: true,
        onSuccess: (response) => {
          toast.success("Blog post updated successfully!");
          fetchBlogs(); // Refresh the blog list
          closeModal();
          resolve(response.data);
        },
        onError: (error) => {
          console.error("Error updating blog post:", error);
          reject(error);
        },
      });
    });
  };

  // Delete a blog using useApiMutation
  const handleDeleteBlog = (blog) => {
    return new Promise((resolve, reject) => {
      mutate({
        url: `/api/admins/blog/delete?id=${blog.id}`,
        method: "DELETE",
        headers: true,
        onSuccess: (response) => {
          toast.success("Blog post deleted successfully!");
          fetchBlogs(); // Refresh the blog list
          closeModal();
          resolve(response.data);
        },
        onError: (error) => {
          console.error("Error deleting blog post:", error);
          reject(error);
        },
      });
    });
  };

  // Open modal for creating a new blog
  const openCreateModal = () => {
    openModal({
      size: "lg",
      title: "Create New Blog Post",
      content: <BlogEditor onSubmit={handleCreateBlog} onCancel={closeModal} />,
    });
  };

  // Open modal for editing a blog
  const openEditModal = (blog) => {
    openModal({
      size: "lg",
      title: "Edit Blog Post",
      content: (
        <BlogEditor
          blog={blog}
          onSubmit={handleUpdateBlog}
          onCancel={closeModal}
        />
      ),
    });
  };

  // Open modal for confirming blog deletion
  const openDeleteModal = (blog) => {
    openModal({
      size: "sm",
      title: "Confirm Deletion",
      content: (
        <DeleteConfirmation
          blog={blog}
          onConfirm={handleDeleteBlog}
          onCancel={closeModal}
        />
      ),
    });
  };

  return (
    <>
      <Header mobile superAdmin />
      <div className="w-full p-6 animate__animated animate__fadeIn">
        <div className="flex justify-between items-center mb-6 pt-2 pb-6 border-b border-gray-700">
          <div>
            <h1 className="text-2xl font-semibold">Blog Management</h1>
            <p className="text-mobiRomanSilver">Create and manage blog posts</p>
          </div>
          <button
            onClick={openCreateModal}
            className="bg-mobiBlue text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Create New Blog</span>
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader size={40} />
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md text-red-600 text-center">
            {error}
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-gray-50 p-10 rounded-md text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              No Blog Posts Yet
            </h3>
            <p className="text-gray-500 mb-6">
              Create your first blog post to get started.
            </p>
            <button
              onClick={openCreateModal}
              className="bg-mobiBlue text-white px-4 py-2 rounded-md flex items-center space-x-2 mx-auto hover:bg-blue-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Create New Blog</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
              />
            ))}
          </div>
        )}

        <ReusableModal
          isOpen={isOpen}
          size={modalOptions.size}
          title={modalOptions.title}
          content={modalOptions.content}
          closeModal={closeModal}
        />
      </div>
    </>
  );
};

export default Blog;
