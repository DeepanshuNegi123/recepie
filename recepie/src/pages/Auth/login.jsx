import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
    if (loginError) setLoginError("");
  };



  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);


    try {

      const response = await axios.post("http://localhost:5003/api/auth/login", formData);

      
      // ✅ FIXED: Changed from "authToken" to "token"
      localStorage.setItem("token", response.data.token);
      

      // ✅ ADDED: Also save user data
      localStorage.setItem("user", JSON.stringify(response.data.user));
      

      console.log("Login successful");
      console.log("Token saved:", response.data.token);
      console.log("User:", response.data.user);
      
      // ✅ FIXED: Navigate to home page after successful login
      navigate("/profile");
      
    } catch (error) {
      setLoginError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Side - Image */}
      <div className="hidden md:block w-1/2 relative">
        <img
          src="https://source.unsplash.com/600x800/?food,recipe"
          alt="Login"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white">
            Welcome Back to RecipeBook
          </h2>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
            <p className="mt-2 text-gray-600">
              Access your recipe collection and personal favorites
            </p>
          </div>

          {loginError && (
            <div className="text-red-600 text-center">{loginError}</div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 w-full border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
            <div className="mt-2 text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-yellow-600 text-white p-3 rounded-lg font-bold hover:bg-yellow-500 transition ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Create one
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;