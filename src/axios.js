import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://poloniex.com'

})

export default instance;