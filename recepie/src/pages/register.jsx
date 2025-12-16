import { EyeDropperIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const Register = () => {
  // State management with form object instead of individual states
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "" // Added confirm password field
  });

  const [showpassword, setshowpassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Unified change handler for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const passwordhandler = () => {
    setshowpassword((prev) => !prev)
  }
  // Form validation function
  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";


    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Enhanced submit handler with actual registration logic
  const port = "http://localhost:5003";
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const { username, email, password } = formData;
      const response = await fetch(`${port}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      const res = await response.json();
      console.log(res);

      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Side - Image */}
      <div className="hidden md:block w-1/2 relative">
        <img
          src="https://source.unsplash.com/600x800/?food,cooking"
          alt="Cooking ingredients"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white">
            Join Our Recipe Community
          </h2>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="mt-2 text-gray-600">
              Start saving and sharing your favorite recipes
            </p>
          </div>

          {/* Username Field */}
          <div>

            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>

            <input

              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`mt-1 w-full border ${errors.username ? "border-red-500" : "border-gray-300"
                } p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300`}
              placeholder="Enter your username"
            />

            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username}</p>
            )}

          </div>

          {/* Email Field */}
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
              className={`mt-1 w-full border ${errors.email ? "border-red-500" : "border-gray-300"
                } p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300`}
              placeholder="your@email.com"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}

          </div>

          {/* Password Field */}
          <div className="">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex flex-row gap-4">
              <input
                type={showpassword == true ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 w-full border ${errors.password ? "border-red-500" : "border-gray-300"
                  } p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300`}
                placeholder="•••••••• "
              />

              <button type="button" className="" onClick={passwordhandler}>
                <EyeIcon className="w-4 h-4 cursor-pointer " />
              </button >

              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}

            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className=" flex flex-row gap-4">
              <input
                type={showpassword == true ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-1 w-full border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  } p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300`}
                placeholder="••••••••"
              />
              <button type="button" onClick={passwordhandler}>
                <EyeIcon className="w-4 h-4 cursor-pointer " />
              </button>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-yellow-600 text-white p-3 rounded-lg font-bold hover:bg-yellow-500 transition ${isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </button>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
