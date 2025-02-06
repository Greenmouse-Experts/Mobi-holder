import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        document.documentElement.style.position = null;
    }, [location]);

    return children;
};

{/*
                {
                    path: "/app/id-cards",
                    name: "All ID Cards"
                },
                {
                    path: "/app/id-cards/generate-card",
                    name: "Generate ID Card"
                }
                    */}

export default ScrollToTop; 