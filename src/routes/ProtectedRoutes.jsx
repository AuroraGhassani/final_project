import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem("access_token"); //akses apakah ada token atau tdk

    //kondisi jika tdk ada token kembali ke halaman login
    if (!token && token === null) {
       return <Navigate to="/login" />;
       
    }

    //jika ada toket, dapat lanjut ke "detail page" atau halaman yang di protectedroute
    return <>{children || <Outlet/>}</>;
}

export default ProtectedRoute;