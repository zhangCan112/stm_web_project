
const prefix = '/v1'

/// 用户信息
const USER =  prefix + '/user/'
///登录
const LOGIN = prefix + '/user/login'
///注册
const LOGOUT = prefix + '/user/logout'
/// 健康检查
const HEALTH =  prefix + '/user/health'


const URLS = {
    USER,
    LOGIN,
    LOGOUT,
    HEALTH,
}

export default URLS