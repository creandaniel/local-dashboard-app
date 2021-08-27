import React from 'react';
class WeatherForecast extends React.Component {
  constructor() {
    super();
    this.state = {
      city: 'London',
      data: ''
    };
  }

  

  async componentDidMount() {

    const settings = {
      method: 'GET',
      headers: {
          Accept: 'application/json',
      }
  };
    try {
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
        const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`,settings);
        const json = await response.json();
        this.setState({  
          city: "london",
          data: json 
        });
        
      } catch (error) {
        return error;
      }
  }

  render() {
      return (
        
        <div className="open-weather-app p-2">
               {(() => {
                if (this.state.data)
                  return (
                      <div>
                        <p>Place: {this.state.city}</p>
                        <img src={`http://openweathermap.org/img/w/${this.state.data.list[0].weather[0].icon}.png`} alt="weathericon" />
                        <p>Weather: {this.state.data.list[0].weather[0].main}</p>
                        <p>Wind: {this.state.data.list[0].wind.speed}</p>
                        <p>Temperature: {this.state.data.list[0].main.temp} ·C</p>
                      </div>
                  )
              })()}

     
        </div>
      );
  }
}

export default WeatherForecast;