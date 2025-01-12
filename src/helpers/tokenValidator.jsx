import { jwtDecode } from 'jwt-decode';

export const isTokenValid = () => {
    const token = localStorage.getItem("userToken");
    if (!token) return false;

    try {
        const decoded = jwtDecode(token); // Decode the token
        if (decoded.exp * 1000 < Date.now()) {
            // Token is expired
            return false;
        }
        return true;
    } catch (error) {
        return false; // Invalid token
    }
};
