import google from "../../assets/LoginPage/google.png"
import { useLoginUser } from "../../hooks/useLogin";

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
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-80">
        <h1 className="mb-6 text-2xl font-bold text-center">Login</h1>       

        {/* error & success message */}
        <div className="flex justify-center py-2">
            {error && (<p className="px-2 text-xs text-red-500 bg-red-200 rounded-md w-fit">{error}</p>)} 
            {success && (<p className="px-2 text-xs text-green-500 bg-green-200 rounded-md w-fit">{success}</p>)}
        </div>
        
        <form>
            {/* Email Input */}
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your email"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
            </div>

            {/* Password Input */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      id="password"
                      name="password"
                      className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your password"
                      required
                      value={form.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 text-sm text-gray-500 right-3 hover:text-blue-500"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)} 
                      > 
                      {isPasswordVisible ? "Hide" : "Show"}
                    </button>
                </div>
            </div>

            {/* Forget Password */}
            <div className="mb-6 text-right">
                <a href="#" className="text-sm text-blue-500 hover:underline">
                    Forget password?
                </a>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full px-4 py-2 text-white rounded-lg bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                onClick={handleLogin}
                disabled={loading}
                >
                {loading ? "Loading..." : "Login"}
            </button>
        </form>

        {/* Divider */}
        <div className="my-6 text-sm text-center text-gray-500">or</div>

        {/* Social Login Buttons */}
        <div className="flex justify-center gap-4">
          <button
            type="button"
            className="flex items-center justify-center w-10 h-10 text-white bg-white rounded-full drop-shadow-md"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook Logo"
              className="w-6 h-6"
            />
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-10 h-10 text-white bg-white rounded-full drop-shadow-md"
          >
            <img src={google} alt="Google Logo" className="w-6 h-6"/>
          </button>
        </div>

        {/* Signup Link */}
        <p className="mt-6 text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;
