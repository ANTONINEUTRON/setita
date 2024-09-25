import { ReactNode } from "react";

interface FormItemProps{
    children: ReactNode,
    title: String,
    subLabel: String,
    className? : String,
}

export default function FormItem({children, className, title, subLabel}:FormItemProps){
    return (
        <div className="mt-8">
            <div className="text-lg">
                {title}
            </div>
            <div className="text-sm">
                {subLabel}
            </div>
            <div className={"rounded-md bg-slate-800 text-lg border p-2 flex items-center gap-2 m-2 " + className}>
                {children}
            </div>
        </div>
        
    )
}