import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { data } from '@tensorflow/tfjs';

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = { temp: 0, icon: '', weather : "", feels_like : 0, humidity : 0, wind_speed : '', country : '', city : '', loading: true }
    }
    componentDidMount() {
        const city = 'Seoul';
        const key = 'cd4310f43de1eba409aa9d9d51ca3851';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
        axios.get(url)
            .then(responseData => {
                console.log(responseData);
                const data = responseData.data;
                this.setState({
                    temp: Math.round((data.main.temp-273.15)*10)/10,
                    feels_like : Math.round((data.main.feels_like-273.15)*10)/10,
                    humidity : Math.round(data.main.humidity*10)/10,
                    icon: data.weather[0].icon,
                    weather : data.weather[0].main,
                    country: data.sys.country,
                    city: data.name,
                    wind_speed:data.wind.speed,
                    loading: false
                });
            })
            .catch(error => console.log(error));

    }
    render() {
        const imgSrc = `http://openweathermap.com/img/w/${this.state.icon}.png`;
        if (this.state.loading) {
            return <p>Loading</p>;
        } else {
            return (
                <div>
                    <div>
                        <img class="weatherImg" src={imgSrc}/>
                        <div><b>{this.state.weather}</b></div>
                    </div>
                    <span>
                        <sapn className="temp"> {this.state.temp}° </sapn>
                    </span>
                    <div>
                        <div className="temp2">
                            체감 : {this.state.feels_like}°
                        </div>
                        <br/>
                        <div className="temp2">
                            습도 : {this.state.humidity}%
                        </div>
                    </div>
                    <div>
                        <div className="temp2">
                            {this.state.city}.{this.state.country}
                        </div>
                        <br/>
                        <div className="temp2">
                            풍속 : {this.state.wind_speed}m/s
                        </div>
                    </div>
                    <p>{this.state.desc}</p>
                </div>
            );
        }
    }
}

export default Weather;