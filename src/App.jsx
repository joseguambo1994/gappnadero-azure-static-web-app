import { useState } from "react";
import Auth from "./components/Auth";
import ImageGallery from "./components/ImageGallery";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-4"
      style={{ backgroundColor: "#dc90e8" }}
    >
      <h1
        className="text-4xl font-bold mb-6 p-3"
        style={{
          backgroundColor: "#cc08cd",
          color: "#fff",
          border: "4px solid black",
          boxShadow: "6px 6px 0px black",
        }}
      >
        Gappnadero
      </h1>

      <div
        className="p-6 w-full max-w-md rounded-lg"
        style={{
          backgroundColor: "#7c548c",
          border: "4px solid black",
          boxShadow: "8px 8px 0px black",
        }}
      >
        <Auth onLogin={setUser} />
      </div>


      {user && (
        <div
          className="mt-8 p-6 w-full max-w-4xl rounded-lg"
          style={{
            backgroundColor: "#2d0a2e",
            border: "4px solid black",
            boxShadow: "8px 8px 0px black",
          }}
        >
          <ImageGallery user={user} />
        </div>
      )}

    </div>
  );
}

export default App;
