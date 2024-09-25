import React from 'react';

interface CustomButtonProps {
    text: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    className?: string;
    isIconAfterTitle?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onClick, icon, className, isIconAfterTitle }) => {
    return (
        <button
            className={`flex items-center px-4 py-2 bg-gradient-to-tr from-primary to-secondary hover:opacity-75 text-white rounded hover:bg-primary hover:shadow-2xl ${className}`}
            onClick={onClick}
        >
            {icon && !isIconAfterTitle && <span className="mr-2 ">{icon}</span>}
            {text}
            {isIconAfterTitle && <span className="ml-2 ">{icon}</span>}
        </button>
    );
};

export default CustomButton;