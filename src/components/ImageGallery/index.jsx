import { useState, useEffect } from "react";

// Environment variables (Azure Function URL)
const azureFunctionUrl = 'http://localhost:7071/api/httpTrigger1';

const ImageGallery = ({ user }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const idToken = await user.getIdToken();

        const response = await fetch(`${azureFunctionUrl}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${idToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to fetch images");
        }

        const data = await response.json();
        setImageUrls(data.imageUrls);
      } catch (error) {
        if (error.message.includes("Unauthorized")) {
          alert("You are not authorized to view these images. Please log in again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center w-full p-6 bg-[#7c548c] border-4 border-black shadow-[10px_10px_0px_black]">
      <h2 className="text-2xl font-bold text-white px-4 py-2 mb-6 bg-[#2d0a2e] border-4 border-black shadow-[6px_6px_0px_black]">
        Image Gallery
      </h2>

      {user ? (
        loading ? (
          <p className="text-white text-lg font-bold">Loading images...</p>
        ) : imageUrls.length > 0 ? (
          <div className="flex flex-col items-center gap-4 max-w-[600px] mx-auto">
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Image ${index}`}
                style={{
                  height: "300px",
                  width: "300px",
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-white text-lg font-bold">No images found</p>
        )
      ) : (
        <p className="text-red-500 text-lg font-bold">
          You must be logged in to view images.
        </p>
      )}
    </div>
  );
};

export default ImageGallery;
