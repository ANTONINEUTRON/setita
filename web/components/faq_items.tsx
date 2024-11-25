interface FaqItemProps{
    title: string,
    details: string,
}

export default function FaqItem({title,details}:FaqItemProps){
    return (
        <div className="collapse collapse-arrow border-b-2 border-b-200 rounded-none">
            <input type="checkbox" />
            <div className="collapse-title font-semibold">
                {title}
            </div>
            <div className="collapse-content text-b-400">
                {details}
            </div>
        </div>
    )
}