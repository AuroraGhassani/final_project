import { useLoginUser } from "../../hooks/useLogin";
import image1 from "../../assets/LoginPage/image1.jpg";

const LoginPage = () => {
    const {
        form,
        error,
        loading,
        success,
        isPasswordVisible,
        setIsPasswordVisible,
        handleChange,
        handleLogin,
    } = useLoginUser(); 

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-800 md:flex-row">
            {/* Container untuk gambar dan form */}
            <div className="hidden w-full md:w-1/2 md:block">
                <img 
                    src={image1} 
                    alt="LoginPage" 
                    className="object-cover w-full h-screen"
                />
            </div>

            {/* Form Login */}
            <div className="flex justify-center w-full md:w-1/2">
                <div className="w-full max-w-md p-8 mx-10 bg-white rounded-lg shadow-lg bg-opacity-80">
                    <h1 className="mb-6 text-3xl font-extrabold text-center text-emerald-500">Login</h1>
                    
                    {/* Success Message */}
                    {success && (
                        <p className="p-3 mb-4 text-sm text-center text-green-700 bg-green-200 border border-green-500 rounded-md">
                            Login successful!
                        </p>
                    )}
                    
                    {/* Error Message */}
                    {error && (
                        <p className="p-3 mb-4 text-sm text-center text-red-700 bg-red-200 border border-red-500 rounded-md">
                            {error}
                        </p>
                    )}
                    
                    <form>
                        {/* Email Input */}
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border border-gray-400 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                required
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                            <div className="relative">
                                <input
                                    type={isPasswordVisible ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border border-gray-400 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                    placeholder="Enter your password"
                                    required
                                    value={form.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 text-sm text-gray-500 right-3 hover:text-emerald-500"
                                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                > 
                                    {isPasswordVisible ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full px-4 py-2 mt-6 font-bold text-white rounded-lg bg-emerald-500 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Login"}
                        </button>
                    </form>

                    {/* Signup Link */}
                    <p className="mt-6 text-sm text-center text-gray-500">
                        Don't have an account?{" "}
                        <a href="/signup" className="text-emerald-500 hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default LoginPage;
