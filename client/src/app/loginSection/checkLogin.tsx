import axios from "axios";

const checkLogin = async () => {
    if (typeof window === "undefined") return false;
 
    const token = localStorage.getItem("token");

    if(!token) return false;
    try {
        const res = await axios.post( "http://localhost:3000/api/users/verify-token", {}, {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        return res.data.valid === true;
        
    } catch (error) {
         return false;
    }
    
}
export default checkLogin;
