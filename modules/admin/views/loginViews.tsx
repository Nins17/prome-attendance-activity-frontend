"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const LoginViews = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log(username)
        console.log(password);

        setUsername("");
        setPassword("");
    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200">
      
      <div className="w-[420px] p-10 flex flex-col items-center rounded-2xl shadow-2xl bg-white">
        
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-teal-600 text-center">
            Admin Portal
          </h1>
          <p className="text-gray-500 text-sm text-center mt-1">
            Sign in to access your dashboard
          </p>
        </div>

        <div className="flex flex-col gap-5 w-full">
          <Input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-700"
          />
          <Input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-700"
          />
        </div>

        <Button 
          className="mt-6 w-full bg-teal-600 text-white hover:bg-teal-700 rounded-lg shadow-lg transition-all duration-300"
          onClick={handleLogin}
        >
          Login
        </Button>

        <p className="mt-4 text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
          Forgot your password?
        </p>

      </div>
    </div>
  );
};

export default LoginViews;
