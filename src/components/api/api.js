import axios from 'axios'

class API {
    constructor(){
        this.language = 'ru'
        this.api_key = 'your_api_key'
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
