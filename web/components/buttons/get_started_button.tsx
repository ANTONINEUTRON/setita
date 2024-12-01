import Link from "next/link";


export default function GetStartedButton() {
    return (
        <div>
            <Link href="/app">
                <button className="px-6 py-2 bg-secondary text-white rounded hover:bg-primaryAccent">
                    Get Started
                </button>
            </Link>
        </div>
    );
}
