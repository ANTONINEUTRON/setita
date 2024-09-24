

interface ExtendedButtonProps {
    text: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    className?: string;
}

export default function ExtendedButton({ text, onClick, icon, className }: ExtendedButtonProps){
    return (
        <button 
            className={" hover:shadow-2xl hover:opacity-85 bg-primary text-white flex justify-between items-center rounded-full "+className }
            onClick={onClick}>
            <span className="mx-2 ml-4">
                {text}
            </span>
            {icon && <span className="text-4xl bg-purple-300 rounded-full" >{icon}</span>}
        </button>
    )
}