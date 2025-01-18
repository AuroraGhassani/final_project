import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoutes";

import LandingPage from "./page/LandingPage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import HomePage from "./page/HomePage";
import ProfilePage from "./page/ProfilePage";
import EditProfilePage from "./page/EditProfilePage";
import CreatePostPage from "./page/CreatePostPage";
import DetailPostPage from "./page/DetailPostPage";
import EditPostPage from "./page/EditPostPage";

function App () {
    return (
       <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/profilepage" element={<ProfilePage />} />
            <Route path="/editprofile" element={<EditProfilePage />} />
            <Route path="/createpost" element={<CreatePostPage />} />
            <Route path="/post/:id" element={<DetailPostPage />} />
            <Route path="/edit-post/:id" element={<EditPostPage />} />

            {/* 
            
            register
            homepage
            profilepage
            editprofile
            post
            editpost
            story
             */}

            {/* diprotect */}
            {/* <Route path="/detail/:id" element={
            <ProtectedRoute>
                <HomePage />
            </ProtectedRoute>
            }/> */}
          
        </Routes>
       </BrowserRouter>
    )
}

export default App;