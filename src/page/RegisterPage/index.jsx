import { useRegisterUser } from "../../hooks/useRegisterUser";
import image1 from "../../assets/LoginPage/image1.jpg";
import BackButton from "../../components/BackButton";

const RegisterPage = () => {
    const {
        form,
        loading,
        success,
        isPasswordVisible,
        isPasswordRepeatVisible,
        setIsPasswordVisible,
        setIsPasswordRepeatVisible,
        handleChange,
        handleRegister,
    } = useRegisterUser(); 

    return (
        <main className="flex items-center justify-center min-h-screen bg-center bg-cover bg-gray">
            <div className="w-full max-w-md p-8 mx-10 bg-white rounded-lg shadow-lg bg-opacity-80 md:mx-15">
                <BackButton />
                <h1 className="mb-6 text-3xl font-extrabold text-center text-emerald-500">Sign Up</h1>       
                
                {/* Success Message */}
                <div className="flex justify-center py-2">
                    {success && (<p className="px-2 text-xs text-green-400 bg-green-600 rounded-md w-fit">{success}</p>)}
                </div>
                
                <form onSubmit={handleRegister}>
                    {/* Name Input */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Your name"
                            className="w-full px-3 py-2 mt-1 text-gray-800 bg-gray-200 border border-gray-400 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                            required
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>
                    
                    {/* Username Input */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Your username"
                            className="w-full px-3 py-2 mt-1 text-gray-800 bg-gray-200 border border-gray-400 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                            required
                            value={form.username}
                            onChange={handleChange}
                        />
                    </div>
                    
                    {/* Email Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Your email"
                            className="w-full px-3 py-2 mt-1 text-gray-800 bg-gray-200 border border-gray-400 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                            required
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                    
                    {/* Password Input */}
                    <div className="mb-4">
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
                    
                    {/* Password Repeat Input */}
                    <div className="mb-4">
                        <label htmlFor="passwordRepeat" className="block text-sm font-medium text-gray-600">Repeat Password</label>
                        <div className="relative">
                            <input
                                type={isPasswordRepeatVisible ? "text" : "password"}
                                id="passwordRepeat"
                                name="passwordRepeat"
                                className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border border-gray-400 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Repeat your password"
                                required
                                value={form.passwordRepeat}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 text-sm text-gray-500 right-3 hover:text-emerald-500"
                                onClick={() => setIsPasswordRepeatVisible(!isPasswordRepeatVisible)} 
                            > 
                                {isPasswordRepeatVisible ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    
                    {/* Phone Number Input */}
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            placeholder="Your phone number"
                            className="w-full px-3 py-2 mt-1 text-gray-800 bg-gray-200 border border-gray-400 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                            required
                            value={form.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 mt-6 text-white rounded-lg bg-emerald-500 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
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
