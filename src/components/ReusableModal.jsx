import { Dialog, DialogBody } from "@material-tailwind/react";
import React from "react";

const ReusableModal = ({
    isOpen,
    size,
    title,
    content,
    closeModal
}) => {
    return (
        <Dialog
            open={isOpen}
            size={size || "md"}
            animate={{
                mount: { scale: 1, y: -10 },
                unmount: { scale: 0.9, y: -100 },
            }}
            className="dialog-mobi"
            style={{ WebkitFontSmoothing: 'none' }}
            handler={closeModal}
        >
            <DialogBody className="montserrat">
                {content || <></>}
            </DialogBody>
        </Dialog>
    );
};

export default ReusableModal;
