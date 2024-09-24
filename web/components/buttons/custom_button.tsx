import React from 'react';

interface CustomButtonProps {
    text: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onClick, icon, className }) => {
    return (
        <button
            className={`px-6 py-2 bg-gradient-to-tr from-primary to-secondary hover:opacity-75 text-white rounded hover:bg-primary hover:shadow-2xl ${className}`}
            onClick={onClick}
        >
            {icon && <span className="m-2 ">{icon}</span>}
            {text}
        </button>
    );
};

export default CustomButton;