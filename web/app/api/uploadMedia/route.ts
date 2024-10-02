import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

// Disable Next.js default body parser
// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };
// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRETS,
});

const uploadToCloudinary = async (file: any, folder: string) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            file,
            {
                resource_type: "auto", // Automatically detect file type (image/video)
                folder: folder, // Upload to a specific folder in Cloudinary
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result?.secure_url); // Return the URL of the uploaded file
            }
        );
    });
};

// Function to handle API POST request
export async function POST(req: NextRequest) {
    const formData = await req.formData();
        try {
            const uploadedImages: string[] = [];
            let uploadedVideo: string | null = null;
            const campaignTrxHash = formData.get("trxHash") as any as string;
            
            const images = formData.getAll("images");
            
            if(images){
                for (let i = 0; i < images.length; i++) {
                    const image = images[i];
                    
                    let imageUrl = await uploadToCloudinary(await getFileUri(image as any as File), `campaign_videos/${campaignTrxHash}`);

                    uploadedImages.push(imageUrl as string); // Collect image URLs
                }
            }

            const video = formData.get("video") as File;
            if(video){
                let res = await uploadToCloudinary(await getFileUri(video), `campaign_videos/${campaignTrxHash}`);
                
                if(res){
                    uploadedVideo = res as string;
                }
            }

            // Return the URLs
            return NextResponse.json({
                imageUrls: uploadedImages,
                videoUrl: uploadedVideo,
            });
        } catch (error) {
            console.error("Error uploading media:", error);
            return NextResponse.error();
        }
}


const getFileUri = async (file: File): Promise<String>=>{
    const fileBuffer = await ( file.arrayBuffer() );

    const base64Data = fileBuffer
        ? Buffer.from(fileBuffer).toString("base64")
        : "";
    return "data:" + file.type + ";base64," + base64Data;
}