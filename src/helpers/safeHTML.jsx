import { useState } from "react";

const SafeHTML = ({ htmlContent }) => {
    const [expanded, setExpanded] = useState(false);
    
    const toggleExpand = () => setExpanded(!expanded);
    
    return (
        <div className="flex justify-between py-1">
            <div
                dangerouslySetInnerHTML={{
                    __html: htmlContent
                }}
            />
        </div>
    );
};

export default SafeHTML;
