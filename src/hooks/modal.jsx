import { useState, useCallback } from "react";

const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState({
        size: "md",
        title: "",
        content: null,
    });

    const openModal = useCallback(
        (modalOptions) => {
            setOptions(modalOptions);
            setIsOpen(true);
        },
        [setOptions, setIsOpen]
    );

    const closeModal = useCallback(() => setIsOpen(false), []);

    return {
        isOpen,
        openModal,
        closeModal,
        modalOptions: options,
    };
};

export default useModal;
