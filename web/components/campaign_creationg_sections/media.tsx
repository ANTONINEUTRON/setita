"use client";

import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface MediaProps {
    images: File[];              
    video: File | null;          
    onImagesChange: (images: File[]) => void;
    onVideoChange: (video: File | null) => void;
}

export default function Media({ images: initialImages, video: initialVideo, onImagesChange, onVideoChange }: MediaProps) {
    const [images, setImages] = useState<File[]>(initialImages || []);
    const [video, setVideo] = useState<File | null>(initialVideo || null);
    const [error, setError] = useState("");

    // Sync the state with the initial values from props (formData)
    useEffect(() => {
        setImages(initialImages || []);
        setVideo(initialVideo || null);
    }, [initialImages, initialVideo]);

    // Handle file drop
    const onDrop = (acceptedFiles: File[]) => {
        const imageFiles = acceptedFiles.filter(file => file.type.startsWith("image/"));
        const videoFiles = acceptedFiles.filter(file => file.type.startsWith("video/"));

        if (images.length + imageFiles.length > 5) {
            setError("You can only upload a maximum of 5 images.");
            return;
        }

        setError(""); // Clear previous errors
        const newImages = [...images, ...imageFiles].slice(0, 5);
        setImages(newImages); // Update images
        onImagesChange(newImages); // Trigger callback for images

        if (videoFiles.length > 0) {
            const newVideo = videoFiles[0];
            setVideo(newVideo); // Update video
            onVideoChange(newVideo); // Trigger callback for video
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [], "video/*": [] },
    });

    // Remove selected image
    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        onImagesChange(newImages); // Trigger callback for updated images
    };

    // Remove selected video
    const removeVideo = () => {
        setVideo(null);
        onVideoChange(null); // Trigger callback for video removal
    };

    return (
        <div>
            <div className="p-4 mt-4">
                <h2 className="text-xl font-bold mb-4">Upload Media</h2>

                {/* Drag and Drop Area */}
                <div
                    {...getRootProps()}
                    className={`border-2 py-10 flex items-center hover:shadow-lg hover:opacity-90 hover:border-gray-500 border-dashed p-6 rounded-lg text-center cursor-pointer ${isDragActive ? "border-blue-500" : "border-gray-400"
                        }`}
                >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop your files here...</p>
                    ) : (
                        <div>
                            <div className="text-lg mb-10">
                                Drag and drop images or a video here, or click to browse.
                            </div>
                            <div>
                                <ul className="list-disc pl-12 text-left">
                                    <li>You can upload up to 5 Images and 1 Video</li>
                                    <li>Choose high-quality images that best represent your campaign</li>
                                    <li>Keep your video concise to engage donors effectively</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                {/* Preview Selected Images */}
                <div className="mt-4 flex space-x-2">
                    {images.map((image, index) => (
                        <div key={index} className="relative">
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                className="w-24 h-24 object-cover rounded"
                            />
                            <button
                                onClick={() => removeImage(index)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>

                {/* Video Preview */}
                {video && (
                    <div className="mt-4">
                        <div className="flex justify-between">
                            <h3 className="text-lg">Video Preview:</h3>
                            <button
                                onClick={removeVideo}
                                className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            >
                                X
                            </button>
                        </div>
                        <video controls className="w-full h-auto mt-2">
                            <source src={URL.createObjectURL(video)} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}
            </div>
        </div>
    );
}
