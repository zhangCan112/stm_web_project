var pkg = require("../../package.json");

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
export const POST = <B>(url: string, form?: {[key: string]: any}) : Promise<ResponseBody<B>> => {    
    let init: RequestInit = {}
    init.method = "POST"    
    init.body = JSON.stringify(form)
    init.headers = {'Content-Type': 'application/json'}
    return request(url, init)
}

//PUT PUT请求方法 
export const PUT = <B>(url: string, id?: string, form?: {[key: string]: any}) : Promise<ResponseBody<B>> => {    
    let init: RequestInit = {}
    init.method = "PUT"    
    init.body = JSON.stringify(form)
    init.headers = {'Content-Type': 'application/json'}
    let urlStr = url
    if (id && id.length > 0) {
        urlStr = `${url}/${id}`
    }     
    return request(urlStr, init)
}

//DELETE DELETE请求方法 
export const DELETE = <B>(url: string, id?: string) : Promise<ResponseBody<B>> => {
    let init: RequestInit = {}
    init.method = "DELETE"   
    let urlStr = url
    if (id && id.length > 0) {
        urlStr = `${url}/${id}`
    }         
    return request(url, init)    
}


// request 针对后台API服务接口约定封装的基础业务请求接口
const request = <B>(input: string, init?: RequestInit): Promise<ResponseBody<B>> => {
    let newInit: RequestInit = { ...init }
    newInit.mode = 'cors'//跨域  
    newInit.credentials = "include"      

    return fetch(`${commonUrl}${input}`, newInit)
        .then(checkStatus)        
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

// 筛选返回scode==0的返回数据，其他scode将作为错误抛出
export function filterSuccessCode<B>(response: ResponseBody<B>) {
    if (response.scode === 0) {
        return response;
    }
    throw new Error(response.msg || ServiceErrorMsg)       
}
