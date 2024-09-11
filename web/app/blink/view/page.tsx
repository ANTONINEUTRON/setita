import AppBar from "@/components/app_bar";
import UnfurlBlink from "@/components/view_blink";

export default function Page(){
    return (
        <div className="">
            <div className="my-10  flex justify-center items-center">
                <div className="w-1/3 m-auto bg-primary">
                    <UnfurlBlink />
                </div>
            </div>
        </div>
    )
}