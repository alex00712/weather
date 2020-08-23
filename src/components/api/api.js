import axios from 'axios'

class API {
    constructor(){
        this.language = 'ru'
        this.api_key = '54ab163ce761aff8d66311a31fa2ce25'
    }
    changeLanguage(language){
        this.language = language
    }
    requestWeatherByCityName(city){
       return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${this.language}&appid=${this.api_key}`)
    }
    requestWeatherByCoords(coords){
        const {latitude, longitude} = coords
        return axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=${this.language}&appid=${this.api_key}`)
    }
    weatherIcon = (icon) => {
        return `https://openweathermap.org/img/wn/${icon}@2x.png`
    }
}

export default new API();

// latitude: 55.5808104
// longitude: 37.6631305
// 54ab163ce761aff8d66311a31fa2ce25

// 439d4b804bc8187953eb36d2a8c26a02