import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const result = await axios.get(baseUrl)
    return result.data
}

const create = async ({ title, author, url }) => {
    const body = {
        title,
        author,
        url,
        likes: 0
    }
    let config = {
        headers: {
            Authorization: token
        },
        timeout: 5000
    }
    const response = await axios.post(baseUrl, body, config)
    return response.data
}

const remove = async (id) => {
    let config = {
        headers: {
            Authorization: token
        },
        timeout: 5000
    }
    const request = await axios.delete(`${baseUrl}/${id}`, config)
    return request.data
}

export default { setToken, getAll, create, remove }