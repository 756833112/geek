import request from 'utils/request'

export const getArticles = (params) =>{
    return request({
        url: '/mp/articles',
        method: 'get',
        params,
    })
}
/**
 * 删除接口
 * @param {*} id 
 * @returns 
 */
export const delArticle = (id) => {
    return request.delete(`/mp/articles/${id}`)
}

/**
 *  添加文章
 * @param {*} data 
 * @returns 
 */
export const addArticle = (data, draft = false) =>{
    return request({
        url:`/mp/articles?draft=${draft}`,
        method:'post',
        data
    })
}

/**
 * 编辑请求回显接口
 * @param {*} id 
 * @returns 
 */
export const getArticleById = (id) =>{
    return request.get(`mp/articles/${id}`)
}

/**
 * 修改文章接口
 * @param {*} data 
 * @param {*} draft 
 * @returns 
 */
export const updateArticle = (data, draft) =>{
    return request({
        url: `/mp/articles/${data.id}?draft=${draft}`,
        method: 'PUT',
        data,
    })
}