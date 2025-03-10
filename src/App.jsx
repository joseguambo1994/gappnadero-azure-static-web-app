import { useState } from "react";
import Auth from "./components/Auth";
import ImageUpload from "./components/ImageUpload";


function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Azure Static Web App + Google Login</h1>
      <Auth onLogin={setUser} />
      <ImageUpload user={user} />
    </div>
  );
}

export default App;
