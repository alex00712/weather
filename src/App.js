import React from 'react';
import API from './components/api/api'
import format from 'node.date-time'

import WeatherAfterComponent from './components/WeatherAfter/WeatherAfter'
import Preloader from './components/Preloader/Preloader'
import ChartComponent from './components/ChartComponent/ChartComponent';


class App extends React.Component{

    state = {
        city: undefined,
        cityData: undefined,
        weatherNow: undefined,
        weatherAfter: undefined,
        isLoading: undefined,
        isError: undefined
    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                this.setState({...this.state, isLoading: true})
                API.requestWeatherByCoords(position.coords)
                    .then((res)=>{
                        this._setWeatherData(res.data)
                    })
                    .catch(err=>{
                        this._setError(err)
                    })
            },

            ()=>{
                window.M.toast({html: 'Геопозиция не определена'})
                API.requestWeatherByCityName('Москва')
                .then(res=>{
                    this._setWeatherData(res.data)
                })
                .catch(err=>{
                    this._setError(err)
                })

            }  
        )
    }

    _requestWeather = () => {
        if(this.state.city !== undefined){
            this.setState({...this.state, isLoading: true})
            API.requestWeatherByCityName(this.state.city)
                .then(res=>{
                    this._setWeatherData(res.data)
                })
                .catch(err=>{
                    this._setError(err)
                })
        }
    }

    _setWeatherData = wetherData => {
        this.setState({
            ...this.state,
            cityData: wetherData.city,
            weatherNow: wetherData.list[0],
            number: 0, 
            weatherAfter: wetherData.list, 
            isError: false,
            isLoading: false
        })
    }
    _setError = error => {
        this.setState({
            ...this.state,
            errorMessage: error.response.data.message,
            isError: true,
            isLoading: false
        })
        window.M.toast({
            html: error.response.data.message, 
            completeCallback: ()=>{
                this.setState({
                    ...this.state,
                    errorMessage: '',
                    city: '',
                    isError: false
                })
            }
        })
    }

    _handleChange = e =>{
        this.setState({...this.state, [e.target.name]: e.target.value})
    }

    _temprecher = t => {
        return Math.floor(t-273)
    }

    _pressure = (p) =>{
        return Math.floor(p*100/133)
    }

    _timing = time => {
        let local = new Date().getTimezoneOffset()*60
        let t = new Date((time+local+this.state.cityData.timezone)*1000)
        return t.format('HH:mm')
    }

    _atherWeather = () =>{
       return this.state.weatherAfter.map((el,i)=> 
            <WeatherAfterComponent  
                now = {this.state.weatherNow.dt}
                i = {i}
                key = {el.dt}
                date = {el.dt} 
                icon = {el.weather[0].icon}
                click = {this.selectEl} 
            />
        )
    }

    selectEl = (el) => {
        let n = this.state.weatherAfter.find(weather => weather.dt === el)
        this.setState({...this.state, weatherNow: n, number: this.state.weatherAfter.indexOf(n)})
    }

    render() {
        return ( 
            <>
            <div className = 'main_wraper'>
                <div className = 'container' >
                    <div className = 'row' >

                        <div className = 'col s10' >
                            <input 
                                name = 'city' 
                                type = 'text' 
                                ref ={el=>this.city=el} 
                                placeholder = 'город' 
                                value = {this.state.city}
                                onChange = {this._handleChange} 
                                style = {this.state.isError ? {color: 'red'} : {color: ''}}
                                className = {this.state.isError ? 'invalid' : 'valid'}
                            />
                        </div>

                        <div className = 'col s2 center' >
                            <a className="btn-floating waves-effect waves-light" >
                                <i onClick = {this._requestWeather} className="material-icons">search</i>
                            </a>
                        </div>

                    </div>
                

                { this.state.isLoading ? <Preloader /> :
                    <div>
                        { 
                        this.state.weatherNow &&
                        <div className = 'row'>

                            <div className = 'col s12 center' style = {{fontWeight: 'bold'}} >
                                 {this.state.cityData && this.state.cityData.name}
                            </div>

                            <div className = 'col s12 center' style ={{height: '3px'}}>
                                <img src = {API.weatherIcon(this.state.weatherNow.weather[0].icon)} alt = 'weather' />
                            </div>

                            <div className = 'col s12 center' style = {{marginBottom: '3em'}}>
                                <div>{this.state.weatherNow.weather[0].description}</div>
                            </div>
                            
                            <div className = 'col s3 center'>
                                <div className = 'sunrise' >{this._timing(this.state.cityData.sunrise)}</div>
                            </div>

                            <div className = 'col s6 center'>
                                <div className = 'temp_size'>
                                    {this._temprecher(this.state.weatherNow.main.temp)} &#8451;
                                </div>
                                <div className = 'temp_fill_size'>
                                    ощущается: {this._temprecher(this.state.weatherNow.main.feels_like)} &#8451; <br/>
                                    давление: {this._pressure(this.state.weatherNow.main.pressure)} мм
                                </div>
                            </div>

                            <div className = 'col s3 center'>
                                <div className = 'sunset' >{this._timing(this.state.cityData.sunset)}</div>
                            </div>
                            
                            <div className = 'col s12 center' style = {{height: '180px'}}>
                                <ChartComponent 
                                    data = {this.state.weatherAfter.slice(this.state.number, this.state.number+10)} 
                                />
                            </div>

                        </div>
                        }
                    
                    {this.state.weatherAfter && 
                    <div className = 'weather_after' >
                        {this._atherWeather()}
                    </div>
                    }

                    </div>
                }
                </div>
            </div>
            </>
        )
    }
}

export default App;