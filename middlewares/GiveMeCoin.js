const axios = require("axios")
const coinDB = require("../middlewares/coin")

const options = (id) => {
    if(!id){
        return {method: "GET", url: "https://api.upbit.com/v1/market/all?isDetails=false", headers: {accept: 'application/json'}}
    }
    else{
        return {method: "GET", url: `https://api.upbit.com/v1/ticker?markets=${id}`, headers: {accept: 'application/json'}}
    }
}


const GiveMeCoin = async () =>{
    let coin
    await axios.request(options())
        .then(({data}) => {
            coin = data
        })
        .catch(err =>{
            coin = err
        })

    return coin
}

const GiveMeCoinInfo = async (id)=>{
    let info
    await axios.request(options(id))
        .then(({data}) => {
            info = data
        })
        .catch(err => {
            info = err
        })

    return info
}

module.exports = {GiveMeCoin, GiveMeCoinInfo}