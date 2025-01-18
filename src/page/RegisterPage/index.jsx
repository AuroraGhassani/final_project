import { useRegisterUser } from "../../hooks/useRegister";
import BackButton from "../../components/BackButton";

const RegisterPage = () => {

    const {
        form,
        loading,
        success,
        isPasswordVisible,
        setIsPasswordVisible,
        handleChange,
        handleRegister,
    } = useRegisterUser(); 
  
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-80">
        <h1 className="mb-6 text-2xl font-bold text-center">Sign Up</h1>       
        <BackButton />
        {/*success message */}
        <div className="flex justify-center py-2">
            {success && (<p className="px-2 text-xs text-green-500 bg-green-200 rounded-md w-fit">{success}</p>)}
        </div>
        
        <form onSubmit={handleRegister}>
            {/* Name Input */}
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="your name"
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                    value={form.name}
                  onChange={handleChange}
                />
            </div>

            {/* Username Input */}
            <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                    type="text"
                    id="username"
                    placeholder="your username"
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                    value={form.username}
                  onChange={handleChange}
                />
            </div>
                      
            {/* Email Input */}
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    id="email"
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

            {/* Password Repeat Input */}
            <div>
                <label htmlFor="passwordRepeat" className="block text-sm font-medium text-gray-700">Password Repeat</label>
                <div className="relative">
                    <input
                        type={isPasswordVisible ? "text" : "password"} 
                        id="passwordRepeat"
                        name="passwordRepeat"
                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your password"
                        required
                        value={form.passwordRepeat}
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

            {/* Phone number Input */}
            <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    placeholder="your phone number"
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                    value={form.phoneNumber}
                  onChange={handleChange}
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full px-4 py-2 text-white rounded-lg bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                onClick={handleRegister}
                disabled={loading}
                >
                {loading ? "Loading..." : "Sign Up"}
            </button>
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;
