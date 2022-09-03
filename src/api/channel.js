import request from 'utils/request'
/**
 * 获取频道数据
 * @returns 
 */
export function getChannels (){
    return request.get('/channels')
}