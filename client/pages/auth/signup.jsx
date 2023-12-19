import React, {useState}from 'react'
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { jsxService } from '@/service'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const signup = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      phone: '',
      role_id:2,
    });
  
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
      setErrors({
        ...errors,
        [e.target.id]: '', // Clear the error when the user starts typing again
      });
    };
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
        };
  
    const validateForm = () => {
      const newErrors = {};
  
      // Check if required fields are empty
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
  
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      }else if (!/\S+@\S+/.test(formData.email)) {
        newErrors.email = 'Email address is invalid';
      }
      if (!formData.password.trim()) {
        newErrors.password = 'Password is required';
      }else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }else if(!/(?=.*[0-9])/.test(formData.password)){
        newErrors.password = 'Password must contain a number';
      }else if(!/(?=.*[A-Z])/.test(formData.password)){
        newErrors.password = 'Password must contain a capital letter';
      }else if(!/(?=.*[a-z])/.test(formData.password)){
        newErrors.password = 'Password must contain a small letter';
      }else if(!/(?=.*[!@#$%^&*])/.test(formData.password)){
        newErrors.password = 'Password must contain a special character';
      }else if (formData.password === formData.email) {
        newErrors.password = 'Password must be different from Email';
      }else if (formData.password === formData.name) {
        newErrors.password = 'Password must be different from Name';
      }else if (formData.password.length>20) {
        newErrors.password = 'Password must be less than 20 characters';
      }
        

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
  
      if (!formData.address.trim()) {
        newErrors.address = 'Address is required';
      }
  
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone is required';
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0; // Return true if there are no errors
    };
  
    const handleSignup = async () => {
      const isValid = validateForm();
  
      if (isValid) {
          const { confirmPassword, ...data } = formData; // Remove confirmPassword field from data
          try{
            const response = await jsxService().post('/auth/signup', data);
            if (response.status === 201 && response.data.status === 200) {
                toast.success(response.data.message);
                router.push('/auth/login');
            }
        }catch(error){
            toast.error(error.response.data.message);
        }
      } else {
        toast.error('Form is invalid. Please try again.');
      }
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="font-bold text-4xl bg-blue-600">HMS</h1>
            <p className="text-gray-500">
              Welcome to HMS. Please Sign Up to continue.
            </p>
          </div>
          <Card className="mx-auto w-full bg-[#ffffff] p-6 rounded-lg shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl bg-blue-600 text-center">
                Sign Up
              </CardTitle>
              <CardDescription className="text-black">
                Please enter your credentials to create your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-black">
                  Name
                </Label>
                <Input
                  className={`border-2 border-gray-200 p-2 rounded-md text-black ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  id="name"
                  placeholder="John"
                  required
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-black">
                  Email
                </Label>
                <Input
                  className={`border-2 border-gray-200 p-2 rounded-md text-black ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  id="email"
                  placeholder="john@example.com"
                  required
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-black">
                  Password
                </Label>
                <Input
                  className={`border-2 border-gray-200 p-2 rounded-md text-black ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  id="password"
                  required
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="text-blue-500 hover:text-blue-800 cursor-pointer"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? "Hide" : "Show"} Password
                </button>
                {errors.password && (
                  <p className="text-red-500">{errors.password}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-black">
                  Confirm Password
                </Label>
                <Input
                  className={`border-2 border-gray-200 p-2 rounded-md text-black ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  id="confirmPassword"
                  required
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="text-blue-500 hover:text-blue-800 cursor-pointer"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? "Hide" : "Show"} confirmPassword
                </button>
                {errors.confirmPassword && (
                  <p className="text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-black">
                  Address
                </Label>
                <Input
                  className={`border-2 border-gray-200 p-2 rounded-md text-black ${
                    errors.address ? "border-red-500" : ""
                  }`}
                  id="address"
                  required
                  type="text"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && (
                  <p className="text-red-500">{errors.address}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-black">
                  Phone
                </Label>
                <Input
                  className={`border-2 border-gray-200 p-2 rounded-md text-black ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                  id="phone"
                  required
                  type="text"
                  placeholder="01*********"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="text-red-500">{errors.phone}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center mt-4">
              <Button
                className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSignup}
              >
                Sign Up
              </Button>
              <Link
                href="/auth/login"
                className="text-blue-500 hover:text-blue-800"
              >
                Login Instead?
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  };
  
  export default signup;
  