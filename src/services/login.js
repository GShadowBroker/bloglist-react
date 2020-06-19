import axios from 'axios'

const url = '/api/login'

const login = async (credentials) => {
    const config = { timeout: 5000 }
    const response = await axios.post(url, credentials, config)
    return response.data
}

export default { login }