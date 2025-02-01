import image1 from "../../assets/LandingPage/image1.jpg";
import image2 from "../../assets/LandingPage/image2.jpg";
import image3 from "../../assets/LandingPage/image3.jpg";

const LandingPage = () => {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen px-6 py-20 text-center text-white bg-gray">
            {/* Grid layout agar gambar tidak tumpang tindih dan responsif */}
            <div className="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                <img 
                    src={image1} 
                    alt="Landing Page" 
                    className="w-full mt-10 transition-transform rounded-lg shadow-lg hover:rotate-3 hover:scale-105"
                />
                <img 
                    src={image2} 
                    alt="Landing Page" 
                    className="hidden w-full transition-transform rounded-lg shadow-lg sm:block hover:-rotate-1 hover:scale-105 "
                />
                <img 
                    src={image3} 
                    alt="Landing Page" 
                    className="hidden w-full mt-10 transition-transform rounded-lg shadow-lg sm:block hover:rotate-3 hover:scale-105"
                />  
            </div>

            {/* Jarak tambahan agar teks tidak tertimpa */}
            <div className="px-4 mt-8">
                <h1 className="text-2xl font-extrabold sm:text-3xl md:text-5xl">
                <span className="text-green-500">SNAP</span> MOMENT, EXPAND YOUR <span className="text-green-500">LINK</span>
                </h1>
                <p className="mt-4 text-base sm:text-lg md:text-2xl">
                Dynamic space for you to share your stories and discover inspiration effortlessly
                </p>
                <button className="px-6 py-3 mt-6 text-base font-bold text-white transition-all transform bg-green-600 rounded-lg shadow-lg sm:px-8 sm:py-4 sm:text-lg active:translate-y-1 active:shadow-none hover:bg-green-400">
                    <a href="/login">GET STARTED</a>
                </button>
            </div>
        </main>
    );
};

export default LandingPage;
