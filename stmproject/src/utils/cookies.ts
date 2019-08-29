import * as cookie from "react-cookie";

// Cookie数据中的约定值的Key值
const LoginKey = "isLogin"

export function isLogin() {
   let cookies = new cookie.Cookies()    
   return cookies.get(LoginKey) === "true"
}


export default {
    isLogin,
}