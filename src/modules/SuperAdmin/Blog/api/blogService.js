import axios from 'axios';

const getToken = () => localStorage.getItem('token');

export const blogService = {
    // Fetch all blogs
    getBlogs: async () => {
        try {
            const response = await axios.get('/api/admins/blogs', {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            });
            return response.data.data || response.data;
        } catch (error) {
            console.error('Error fetching blogs:', error);
            throw error;
        }
    },

    // Create a new blog
    createBlog: async (blogData) => {
        try {
            const response = await axios.post('/api/admins/blog/create', blogData, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error creating blog:', error);
            throw error;
        }
    },

    // Update an existing blog
    updateBlog: async (blogData) => {
        try {
            const response = await axios.post('/api/admins/blog/update', blogData, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error updating blog:', error);
            throw error;
        }
    },

    // Delete a blog
    deleteBlog: async (blogId) => {
        try {
            const response = await axios.delete(`/api/admins/blog/delete?id=${blogId}`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting blog:', error);
            throw error;
        }
    }
};
