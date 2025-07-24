import React from 'react';
import { format } from 'date-fns';
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";

const BlogCard = ({ blog, onEdit, onDelete }) => {
    const formatDate = (dateString) => {
        try {
            return format(new Date(dateString), 'MMM dd, yyyy');
        } catch (error) {
            return 'Invalid date';
        }
    };

    // Truncate content to show preview
    const stripHtml = (html) => {
        const tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    const truncateContent = (content, maxLength = 150) => {
        const strippedContent = stripHtml(content);
        if (strippedContent.length <= maxLength) return strippedContent;
        return `${strippedContent.substring(0, maxLength)}...`;
    };

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold line-clamp-2">{blog.title}</h3>
                    <Menu placement="bottom-end">
                        <MenuHandler>
                            <button className="p-1 rounded-full hover:bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                            </button>
                        </MenuHandler>
                        <MenuList>
                            <MenuItem onClick={() => onEdit(blog)} className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 0L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit Blog
                            </MenuItem>
                            <MenuItem onClick={() => onDelete(blog)} className="flex items-center gap-2 text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete Blog
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
                <p className="text-gray-600 text-sm mb-3">{formatDate(blog.createdAt)}</p>
                <div className="text-gray-700 mb-4 line-clamp-3">
                    {truncateContent(blog.content)}
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
