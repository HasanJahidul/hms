import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { jsxService } from "@/service"
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';


export default function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('A4apple%');

  const handleLogin = async () => {
    try {
      // Make a POST request to your backend for authentication
      const response = await jsxService().post('/auth/login', { email, password });
      console.log(response);

      if (response.data.status === 200) {
        // Login successful, you may redirect or perform other actions
        console.log(response.data.message);
        toast.success(response.data.message.message);
      } else {
        toast.error(response.data.message);
        // Handle authentication error
        console.error('Authentication failed');
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error('Error during login:', error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-bold text-4xl bg-blue-600">HMS</h1>
          <p className="text-gray-500">
            Welcome to HMS. Please login to continue.
          </p>
        </div>
        <Card className="mx-auto w-full bg-[#ffffff] p-6 rounded-lg shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-white bg-blue-600 text-center">
              Login
            </CardTitle>
            <CardDescription className="text-black">
              Please enter your credentials to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-black">
                Email
              </Label>
              <Input
                className="border-2 border-gray-200 p-2 rounded-md text-black"
                id="email"
                placeholder="john@example.com"
                required
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-black">
                Password
              </Label>
              <Input
                className="border-2 border-gray-200 p-2 rounded-md text-black"
                id="password"
                required
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center mt-4">
            <Button
              className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Link
              href="/auth/signup"
              className="text-blue-500 hover:text-blue-800"
            >
              Sign Up?
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}