import * as cookie from "react-cookie";
import { GET } from "../utils/request";
import URLS from "../utils/urls";

// Cookie数据中的约定值的Key值
const LoginKey = "isLogin"

export function isLogin() {
   GET(URLS.HEALTH)
   let cookies = new cookie.Cookies()    
   return cookies.get(LoginKey) === "true"
}


export default {
    isLogin,
}