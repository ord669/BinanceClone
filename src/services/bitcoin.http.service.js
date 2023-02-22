import Axios from 'axios'

var axios = Axios.create({
    withCredentials: false
})

export const bitcoinHttpService = {
    get(endpoint, currency) {
        return ajax(endpoint, 'GET', currency)
    }
}

async function ajax(endpoint, method = 'GET', currency = 'BTC') {
    try {
        const res = await axios({
            url: `https://data.binance.com/api/v3/klines?symbol=${currency}USDT&interval=1s`,
            method
        })
        console.log('res.data: ', res.data);
        return res.data
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `, data)
        console.dir(err)
        if (err.response && err.response.status === 401) {
            sessionStorage.clear()
            window.location.assign('/')
        }
        throw err
    }
}