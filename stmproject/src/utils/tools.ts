import { number } from "prop-types";



/**
 * 延时毫秒执行
 * @param millisecond 延时的毫秒数
 */
export const delay = async (millisecond: number) => {
     await new Promise((resovle) => {
        setTimeout(()=>{
            resovle()
        }, millisecond)
    })
}


/**
 * 倒计时
 * @param handler 每次间隔的回调
 * @param count   总计时次数
 * @param interval 计时间隔
 * @returns 终止倒计时的执行函数（stop）
 */
export const countdown = (handler:(lefts: number)=>void, count: number, interval: number = 1000) => {
    let start = new Date().getTime()    
    let end = new Date(start + (count * interval)).getTime()    
    //立即开始
    handler(Math.ceil(count))
    let intervalHandler = setInterval(()=>{
        let now = new Date().getTime()
        let lefts = end - now
        if ((lefts) < (interval * 0.5)) {
            //should end
            clearInterval(intervalHandler)
            handler(0)
            return            
        }        
        handler(Math.ceil(lefts/interval))
    }, interval)

    return ()=>{clearInterval(intervalHandler)}
}
