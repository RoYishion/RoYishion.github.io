// 将地址参数转为对象
export const param2Obj = url => { // 该函数用来解码url地址参数并转为对象
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}