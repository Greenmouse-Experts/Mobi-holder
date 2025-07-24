import React, { useState } from 'react';

const DeleteBlogModal = ({ blog, onDelete, onCancel }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await onDelete(blog);
        } catch (error) {
            console.error('Error deleting blog:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Delete Blog Post</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete the blog titled "{blog.title}"? This action cannot be undone.</p>

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
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" />
                            <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                    )}
                    <span>{isDeleting ? 'Deleting...' : 'Delete Blog Post'}</span>
                </button>
            </div>
        </div>
    );
};

export default DeleteBlogModal;
