var pkg = require("../../package.json");

// headers设置Cookie相关的key值
const SetCookieKey = "Set-Cookie"

// Cookie数据中的约定值的Key值
const SessionIDKey = "beegosessionID"
const LoginKey = "isLogin"

const ServiceErrorMsg = "服务器错误!"

// 业务Api的commonUrl
var commonUrl: string = pkg.projectConfig.proxy

// 业务API返回的Body数据格式
export interface ResponseBody<B> {
    scode: number
    body?: B
    msg?: string
}

//GET GET请求方法 
export const GET = <B>(url: string, querry?: {[key: string]: string}) : Promise<ResponseBody<B>> => {
    let querryStr: string | null = null
    if (querry && Object.keys(querry).length > 0) {
        let querryStrArr: string[] = []
        Object.keys(querry).forEach((key) => {
            querryStrArr.push(`${key}=${querry[key]}`)
        })
        querryStr = querryStrArr.join("&")
    }    
    let querryUrl = url 
    if (querryStr && querryStr.length > 0) {
        querryUrl = `${url}?${querryStr}`
    }
    return request(querryUrl)
}

//POST POST请求方法 
export const POST = <B>(url: string, querry?: {[key: string]: string}) : Promise<ResponseBody<B>> => {
    
    return request(url)
}

//PUT PUT请求方法 
export const PUT = <B>(url: string, querry?: {[key: string]: string}) : Promise<ResponseBody<B>> => {
    
    return request(url)
}

//DELETE DELETE请求方法 
export const DELETE = <B>(url: string, querry?: {[key: string]: string}) : Promise<ResponseBody<B>> => {
    
    return request(url)
}


// request 针对后台API服务接口约定封装的基础业务请求接口
const request = <B>(input: string, init?: RequestInit): Promise<ResponseBody<B>> => {
    let newInit: RequestInit = { ...init }
    newInit.mode = 'cors'//跨域    
    // 设置Cookie相关
    let sessionId = window.localStorage.getItem(SessionIDKey) as string | undefined
    let isLogin = window.localStorage.getItem(LoginKey) as string | undefined
    let cookie = new Cookies()
    if (sessionId) {
        cookie.setCookie(SessionIDKey, sessionId)
    }
    if (isLogin) {
        cookie.setCookie(LoginKey, isLogin)
    }
    if (cookie.hasValues) {
        newInit.headers = { ...newInit.headers, Cookie: cookie.string() }
    }

    return fetch(`${commonUrl}${input}`, newInit)
        .then(checkStatus)
        .then(updateCookie)
        .then((response) => {
            return response.json() as any as ResponseBody<B>
        })        
}

//检查请求状态 200才认为网络服务请求成功
function checkStatus(response: Response) {
    if (response.status === 200) {
        return response
    }

    throw new Error(ServiceErrorMsg)    
}

//更新Cookie信息，保存到本地
function updateCookie(response: Response) {
    let setcookiesStr = response.headers.get(SetCookieKey)
    if (setcookiesStr) {
        let cookies = new Cookies(setcookiesStr)
        let sessionId = cookies.getCookie(SessionIDKey)
        sessionId && window.localStorage.setItem(SessionIDKey, sessionId)        
        let isLogin = cookies.getCookie(LoginKey)
        isLogin && window.localStorage.setItem(LoginKey, isLogin)
    }    
    return response
}

// 筛选返回scode==0的返回数据，其他scode将作为错误抛出
export function filterSuccessCode<B>(response: ResponseBody<B>) {
    if (response.scode === 0) {
        return response;
    }
    throw new Error(response.msg || ServiceErrorMsg)       
}


// Cookies 对Cookie操作进行封装
class Cookies {
    private store = new Map<string, string>()
    constructor(message: string = "") {
        let arrCookieStr = message.trim().split(";")
        arrCookieStr.forEach((cookieStr) => {
            let arr = cookieStr.trim().split(":")
            if (arr.length > 1) {
                this.setCookie(arr[0].trim(), arr[1].trim())
            }
        })
    }

    setCookie = (key: string, val: string) => {
        this.store.set(key, val)
    }

    getCookie = (key: string) => {
        return this.store.get(key)
    }

    deleteCookie = (key: string) => {
        this.store.delete(key)
    }

    hasValues = () => {
        return this.store.values.length > 0
    }

    string = () => {
        let result = ""
        this.store.forEach((val, key) => {
            result += `${key}=${val};`
        })
        return result
    }

}