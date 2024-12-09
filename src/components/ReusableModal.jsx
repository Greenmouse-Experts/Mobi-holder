import { Dialog, DialogBody } from "@material-tailwind/react";
import React from "react";

const ReusableModal = ({
    isOpen,
    size,
    title,
    content,
}) => {
    return (
        <Dialog
            open={isOpen}
            size={size || "md"}
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
            }}
            className="bGmobiGrayDark"
            style={{ WebkitFontSmoothing: 'none' }}
        >
            <DialogBody className="montserrat">
                {content}
            </DialogBody>
        </Dialog>
    );
};

export default ReusableModal;
