import request from 'utils/request'
/**
 * 登录请求 
 * @param {string} mobile  手机号
 * @param {string} code  验证码
 * @returns  Promise
 */
export const login = (mobile, code) =>{
    return request({
        method: 'post',
        url: '/authorizations',
        data:{
            mobile,
            code,
        }
    })
} 


/**
 * 
 * @returns 
 */
// 页面渲染用户信息
export const getUserprofile = () =>{
    return request({
        method: 'get',
        url:'/user/profile', 
    })
}