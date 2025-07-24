import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EditBlogModal = ({ blog, onSubmit, onCancel }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [editorState, setEditorState] = useState(() => {
        if (blog && blog.content) {
            const contentBlock = htmlToDraft(blog.content);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                return EditorState.createWithContent(contentState);
            }
        }
        return EditorState.createEmpty();
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        defaultValues: {
            title: blog ? blog.title : ''
        }
    });

    useEffect(() => {
        if (blog) {
            setValue('title', blog.title);

            if (blog.content) {
                const contentBlock = htmlToDraft(blog.content);
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    setEditorState(EditorState.createWithContent(contentState));
                }
            }
        }
    }, [blog, setValue]);

    const handleFormSubmit = async (data) => {
        setIsLoading(true);

        try {
            // Convert editor content to HTML
            const contentState = editorState.getCurrentContent();
            const htmlContent = draftToHtml(convertToRaw(contentState));

            const blogData = {
                id: blog.id,
                title: data.title,
                content: htmlContent
            };

            await onSubmit(blogData);
        } catch (error) {
            console.error('Error updating blog:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full p-4">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                {/* Title Field */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-2">
                        Blog Title *
                    </label>
                    <input
                        type="text"
                        id="title"
                        {...register('title', { 
                            required: 'Blog title is required',
                            minLength: {
                                value: 5,
                                message: 'Title must be at least 5 characters long'
                            }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mobiBlue focus:border-transparent"
                        placeholder="Enter your blog title..."
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                    )}
                </div>

                {/* Content Editor */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Blog Content *
                    </label>
                    <div className="border border-gray-300 rounded-md">
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={setEditorState}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class px-4 py-2 min-h-[300px]"
                            toolbarClassName="toolbar-class border-b border-gray-300"
                            placeholder="Write your blog content here..."
                            toolbar={{
                                options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'history'],
                                inline: {
                                    options: ['bold', 'italic', 'underline', 'strikethrough']
                                },
                                blockType: {
                                    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote']
                                },
                                list: {
                                    options: ['unordered', 'ordered']
                                },
                                textAlign: {
                                    options: ['left', 'center', 'right', 'justify']
                                }
                            }}
                        />
                    </div>
                    {editorState.getCurrentContent().hasText() === false && (
                        <p className="text-red-500 text-sm mt-1">Blog content is required</p>
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
                        disabled={isLoading || !editorState.getCurrentContent().hasText()}
                        className="px-6 py-2 bg-mobiBlue text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                    >
                        {isLoading && (
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" />
                                <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        )}
                        <span>{isLoading ? 'Updating...' : 'Update Blog Post'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBlogModal;
