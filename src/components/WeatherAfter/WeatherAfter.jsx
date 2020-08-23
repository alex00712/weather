import React from 'react'
import style from './WeatherAfter.module.css'
import format from 'node.date-time'

import API from '../api/api'

const WeatherAfterComponent = ({date, now, i, icon, click}) =>{

    const handlerClick = () => {
        click(date)
    }

    const nowDay = () => {
        if (now === date){
            return style.active
        }
        return ''
    }
    

    return (
        <div className = {`${style.atherWeatherChild} ${nowDay()}`} onClick = {handlerClick}>
                {i !== 0 ? `${new Date(date * 1000).format('HH')}:00` : 'сейчас'}<br/>
                <img className = {style.icon} src = {API.weatherIcon(icon)} alt = 'weather' /><br/>
                {new Date(date * 1000).format('d.MM')}
        </div>
    )
}

export default WeatherAfterComponent;