import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; // Icon for circular loading

interface CustomButtonProps {
    text: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    className?: string;
    isIconAfterTitle?: boolean;
    isProcessing?: boolean; // New prop to show the loading state
}

const CustomButton: React.FC<CustomButtonProps> = ({
    text,
    onClick,
    icon,
    className,
    isIconAfterTitle,
    isProcessing = false, // Default is not processing
}) => {
    return (
        <button
            className={`flex items-center px-4 py-2 bg-gradient-to-tr from-primary to-secondary hover:opacity-75 text-white rounded hover:bg-primary hover:shadow-2xl ${className} ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            onClick={isProcessing ? undefined : onClick} // Disable onClick if processing
            disabled={isProcessing} // Disable button when processing
        >
            {isProcessing ? (
                <AiOutlineLoading3Quarters className="animate-spin mr-2" /> // Loading spinner
            ) : (
                icon && !isIconAfterTitle && <span className="mr-2 ">{icon}</span>
            )}
            {text}
            {isIconAfterTitle && !isProcessing && <span className="ml-2 ">{icon}</span>}
        </button>
    );
};

export default CustomButton;
