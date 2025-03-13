import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import CowLogo from "../../assets/CowLogo.lottie";

export default function Auth({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  const handleAuth = async () => {
    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      }
      setUser(userCredential.user);
      onLogin(userCredential.user);
    } catch (error) {
      console.error("Authentication Error:", error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    onLogin(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: "#dc90e8" }}>
        <DotLottieReact src={CowLogo} loop autoplay className="w-48 h-48" />
        <p className="mt-4 text-xl font-bold text-gray-900">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="p-6 w-96 text-center flex flex-col items-center"
      style={{
        backgroundColor: "#7c548c",
        border: "4px solid black",
        boxShadow: "10px 10px 0px black",
      }}
    >
      {user ? (
        <div className="flex flex-col items-center">
          <p className="mb-4 text-lg font-bold text-white bg-green-500 px-2 py-1 border-2 border-black shadow-lg">
            Logged in as {user.email}
          </p>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 font-bold uppercase text-white"
            style={{
              backgroundColor: "#cc08cd",
              border: "4px solid black",
              boxShadow: "6px 6px 0px black",
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-col w-full">
          <h2
            className="text-2xl font-bold p-3 mb-4"
            style={{
              backgroundColor: "#2d0a2e",
              color: "#fff",
              border: "4px solid black",
              boxShadow: "6px 6px 0px black",
            }}
          >
            {isLogin ? "Login" : "Create Account"}
          </h2>

          <div className="flex flex-col gap-4 w-full">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border text-lg font-medium w-full"
              style={{
                border: "3px solid black",
                backgroundColor: "#dc90e8", // Light Purple
                boxShadow: "4px 4px 0px black",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 border text-lg font-medium w-full"
              style={{
                border: "3px solid black",
                backgroundColor: "#dc90e8",
                boxShadow: "4px 4px 0px black",
              }}
            />

            <button
              onClick={handleAuth}
              className="px-4 py-2 text-lg font-bold uppercase w-full"
              style={{
                backgroundColor: "#cc08cd",
                color: "#fff",
                border: "4px solid black",
                boxShadow: "6px 6px 0px black",
              }}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium w-full py-2"
              style={{
                color: "#fff",
                backgroundColor: "#620a63",
                border: "4px solid black",
                boxShadow: "4px 4px 0px black",
              }}
            >
              {isLogin ? "Create an account" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
