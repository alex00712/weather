import React from 'react';
import WeatherData from '../weatherInfo/weatherInfo'

class Weather extends React.Component{
    distanation = (deg) =>{
        if (deg > 337.5 && deg < 22.5){
            return 'Южный'
        }
        else if (deg > 22.5 && deg < 67.5){
            return 'Юго-Западный'   
        }
        else if (deg > 67.5 && deg < 112.5){
            return 'Западный'
        }
        else if (deg > 112.5 && deg < 157.5){
            return 'Северо-Западный'
        }
        else if (deg > 157.5 && deg < 202.5){
            return 'Северный' 
        }
        else if (deg > 202.5 && deg < 247.5){
            return 'Северо-Восточный'
        }
        else if (deg > 247.5 && deg < 292.5){
            return 'Восточный'
        }
        else if (deg > 292.5 && deg < 337.5){
            return 'Юго-Восточный'   
        }
    }
    temprecher = (t) => {
        return Math.floor(t-273)
    }
    temprecherCart = (t) =>{
        // console.log(t)
        if (t<=0){
            return 120
        }
        else if (t > 0 && t < 20){
            return 60
        }
        else{
            return 0
        }
    }
    pressure = (p) =>{
        return Math.floor(p*100/133)
    }
    deg = (deg) =>{
        return deg-90
    }
    weatherDescription = () => {
        // return varables to choose the weather cards
    }
    weatherIcon = () => {
       return `https://openweathermap.org/img/wn/${this.props.weather.weather[0].icon}@2x.png`
    }
    render(){
        console.log(this.props)
        let {humidity, pressure, temp, feels_like} = this.props.weather.main
        let {speed, deg} = this.props.weather.wind
        let {description} = this.props.weather.weather[0].description
        return(
            <div>
            {this.props.weather && 
                <WeatherData
                    temp = {this.temprecher(temp)}
                    feels_like = {this.temprecher(feels_like)}
                    pressure = {this.pressure(pressure)}
                    humidity = {humidity}
                    speed = {speed}
                    deg = {this.deg(deg)}
                    distanation = {this.distanation(deg)}
                    temprecherCart = {this.temprecherCart(this.temprecher(temp))}
                    description = {description}
                    weatherIcon = {this.weatherIcon()}
                />
            }
            </div>
        )
    }
}
export default Weather