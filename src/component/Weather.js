import React,{useState,useEffect} from 'react'
import "./Weather.css"
import axios from "axios"
import { Line } from "react-chartjs-2"
import {Chart as ChartJS,Title,Tooltip,LineElement,Legend,CategoryScale,LinearScale,PointElement} from "chart.js";


ChartJS.register(
  Title,Tooltip,LineElement,Legend,CategoryScale,LinearScale,PointElement
);
const Weather = () => {
    const [data,setData]=useState({})
    const [longitude,setLongitude]=useState({})
    const [latitude,setLatitude]=useState({})
    const [search,setSearch]=useState("")
    const [date,setDate]=useState({})
    const [hourly, setHourly] = useState([])
    const [weather,setWeather]=useState([])


    
   
    const apikey="a7e8c99628873a0af054674c1a36e5be"
    const getWeatherDetails=(cityname)=>{

      
        // const baseurl=`https://api.openweathermap.org/data/3.0/onecall?q=${cityname}&appid=198e473e9af863b59c791ff28793291f`
        const baseurl=`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&cnt=7&appid=198e473e9af863b59c791ff28793291f`
        axios.get(baseurl).then((res)=>{
            console.log("response",res)
            setData(res.data)
            var savePositionToState=(position)=>{
              setLongitude(res.data.city.coord.lon)
              setLatitude(res.data.city.coord.lat)
            }

            window.navigator.geolocation.getCurrentPosition(savePositionToState)
            
           
          }).catch((err)=>{
            console.log(err)
        })
     
    }

    const gethourDetails=(latitude,longitude)=>{
      const url=`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=198e473e9af863b59c791ff28793291f`
      axios.get(url).then((response)=>{
        console.log("res",response)
        setDate(response.data.daily.map((Dates)=>Dates.dt))
        // setHourly(response.data.hourly.map((hours)=>hours.dt))
        setHourly(response.data.hourly.map((hours)=>hours))
        setWeather(response.data.daily.map((cloud)=>cloud.weather))
        
        
      }).catch((err)=>{
        console.log(err)
    })
    }

  // for(let i in hourly){
  //     if(i<12){
  //         newarr.push(hourly[i])
  //     }else{
  //       break
  //     }
  // }

    

    const handlechange=(e)=>{
          setSearch(e.target.value)
    }
// console.log("weather",weather)
const handleSearch=()=>{
    getWeatherDetails(search)
    gethourDetails(latitude,longitude)
    setSearch("")
}
    useEffect(()=>{
        getWeatherDetails("jodhpur")
        gethourDetails(26.2389,73.0243)

    },[])
    

    var newarr=[
    //   Math.floor(data.list[0].main.temp-273.15),
    // Math.floor(data.list[1].main.temp-273.15),
    //       Math.floor(data.list[2].main.temp-273.15),
    //       Math.floor(data.list[3].main.temp-273.15),
    //       Math.floor(data.list[4].main.temp-273.15),
    //       Math.floor(data.list[5].main.temp-273.15),
    //       Math.floor(data.list[6].main.temp-273.15),
          // Math.floor(data.list[7].main.temp-273.15)
  
  ]
    // console.log(newarr)
    const [chartdata,setchartData]=useState({
      labels:[1,2,3,4,5,6,7],
      datasets:[
        {
          label:"first Dataset",
          data:[37,26,34,33,31,33,37],
          backgroundColor:'yellow',
          borderColor:"red",
          tension:0.4
          
         
        }
      ]
    })
    

   
    var options={
      // maintainAspectRatio:false,
      scales:{
        y:{
        // beginAtZero:true,
        ticks:{
          display:false
        }
      }
    }
  }




    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function displayDay(d) {
    var date = new Date(d * 1000);
    return days[date.getDay()];
  }

  function displayTime(d) {
    var date = new Date(d * 1000);
    var hrs = date.getHours();
    var minutes = date.getMinutes();

    var formattedTime = hrs + ":" + minutes.toFixed();

    return formattedTime;
  }

  function displayDate(d) {
    var date = new Date(d * 1000);
    var years = date.getFullYear();
    var month = months[date.getMonth()];
    var day = date.getDate();

    var formattedDate = day + " " + month + " " + years;
    return formattedDate;
  }

 
  return (
    <div className="weather-container">

          <div className="header-searchBar">
            <div className="location-icon-name">
                <i className="fi fi-rr-marker absolute-center location-icon"></i>
                
                </div>
            <input
              className="search-input"
              placeholder="Search for Weather"
              onChange={handlechange}
              value={search}
            />
            <i className="fi fi-rr-search absolute-center search-icon" onClick={handleSearch}></i>
          </div>
          <div className='week-data'>
          {/* <small>{displayDate(date[0])}</small>
          <p>{displayTime(new Date(hourly[0]).getTime())+"-"+displayTime(new Date(hourly[1]).getTime())}</p>
          <p className="day">{displayDay(date[0])}</p> */}
            
                <div className="current-weather">
                    <div className="weather-data">
                        <h5 className="weathercity">{data.city.name}</h5>
                        <img 
                        
                        src={`http://openweathermap.org/img/wn/${weather[0][0]?.icon}@2x.png`}
                        alt=""
                        />
                          <h5 className='weather'>{"Weather"+":"+" "+weather[0][0].main}</h5> 
                         <h5 className='weatherday'><p className="day">{"Day"+":"+" "+displayDay(date[0])}</p></h5>
                        <h5 className="weathertemp">{"Temp"+(data.list[0].main.temp-273.15).toFixed(2)+"°C"}</h5>
                        
                    </div>
                </div>

                <div className="current-weather">
                    <div className="weather-data">
                    <h5 className="weathercity">{data.city.name}</h5>
                        <img 
                        
                        src={`http://openweathermap.org/img/wn/${weather[1][0]?.icon}@2x.png`}
                        alt=""
                        />
                          <h5 className='weather'>{"Weather"+":"+" "+weather[1][0].main}</h5> 
                         <h5 className='weatherday'><p className="day">{"Day"+":"+" "+displayDay(date[1])}</p></h5>
                        <h5 className="weathertemp">{"Temp"+(data.list[1].main.temp-273.15).toFixed(2)+"°C"}</h5>
                    </div>
                </div>

                <div className="current-weather">
                    <div className="weather-data">
                    <h5 className="weathercity">{data.city.name}</h5>
                        <img 
                        
                        src={`http://openweathermap.org/img/wn/${weather[2][0]?.icon}@2x.png`}
                        alt=""
                        />
                          <h5 className='weather'>{"Weather"+":"+" "+weather[2][0].main}</h5> 
                         <h5 className='weatherday'><p className="day">{"Day"+":"+" "+displayDay(date[2])}</p></h5>
                        <h5 className="weathertemp">{"Temp"+(data.list[2].main.temp-273.15).toFixed(2)+"°C"}</h5>
                    </div>
                </div>

                <div className="current-weather">
                    <div className="weather-data">
                        <h5 className="weathercity">{data.city.name}</h5>
                        <img 
                        
                        src={`http://openweathermap.org/img/wn/${weather[3][0]?.icon}@2x.png`}
                        alt=""
                        />
                          <h5 className='weather'>{"Weather"+":"+" "+weather[3][0].main}</h5> 
                         <h5 className='weatherday'><p className="day">{"Day"+":"+" "+displayDay(date[3])}</p></h5>
                        <h5 className="weathertemp">{"Temp"+(data.list[3].main.temp-273.15).toFixed(2)+"°C"}</h5>
                    </div>
                </div>

                <div className="current-weather">
                    <div className="weather-data">
                        <h5 className="weathercity">{data.city.name}</h5>
                        <img 
                        
                        src={`http://openweathermap.org/img/wn/${weather[4][0]?.icon}@2x.png`}
                        alt=""
                        />
                          <h5 className='weather'>{"Weather"+":"+" "+weather[4][0].main}</h5> 
                         <h5 className='weatherday'><p className="day">{"Day"+":"+" "+displayDay(date[4])}</p></h5>
                        <h5 className="weathertemp">{"Temp"+(data.list[4].main.temp-273.15).toFixed(2)+"°C"}</h5>
                    </div>
                </div>

                <div className="current-weather">
                    <div className="weather-data">
                        <h5 className="weathercity">{data.city.name}</h5>
                        <img 
                        
                        src={`http://openweathermap.org/img/wn/${weather[5][0]?.icon}@2x.png`}
                        alt=""
                        />
                          <h5 className='weather'>{"Weather"+":"+" "+weather[5][0].main}</h5> 
                         <h5 className='weatherday'><p className="day">{"Day"+":"+" "+displayDay(date[5])}</p></h5>
                        <h5 className="weathertemp">{"Temp"+(data.list[5].main.temp-273.15).toFixed(2)+"°C"}</h5>
                    </div>
                </div>

                <div className="current-weather">
                    <div className="weather-data">
                        <h5 className="weathercity">{data.city.name}</h5>
                        <img 
                        
                        src={`http://openweathermap.org/img/wn/${weather[6][0]?.icon}@2x.png`}
                        alt=""
                        />
                          <h5 className='weather'>{"Weather"+":"+" "+weather[6][0].main}</h5> 
                         <h5 className='weatherday'><p className="day">{"Day"+":"+" "+displayDay(date[6])}</p></h5>
                        <h5 className="weathertemp">{"Temp"+(data.list[6].main.temp-273.15).toFixed(2)+"°C"}</h5>
                    </div>
                </div>
            </div>
        

        <Line  data={chartdata} options={options}  height={70} className="chartdata"></Line>
    </div>

  )
 
}

export default Weather