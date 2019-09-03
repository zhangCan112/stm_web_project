


export const delay = async (millisecond: number) => {
     await new Promise((resovle) => {
        setTimeout(()=>{
            resovle()
        }, millisecond)
    })
}