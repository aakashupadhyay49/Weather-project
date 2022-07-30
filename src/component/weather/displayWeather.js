import React,{useState,useEffect,useCallback} from 'react'
import axios from "axios"
import { Chart, Line } from "react-chartjs-2"
import {Chart as ChartJS,Title,Tooltip,LineElement,Legend,CategoryScale,LinearScale,Filler,PointElement} from "chart.js";
import "./displayweather.css"
import { blue, yellow } from '@material-ui/core/colors';
import { DnsTwoTone } from '@material-ui/icons';
import Debounce from '../hooks/debounce';
import LineChart from "./apexchart"
import {Audio} from "react-loader-spinner"
ChartJS.register(
  Title,Tooltip,LineElement,Legend,CategoryScale,LinearScale,PointElement,Filler
);

const DisplayWeather = () => {
  const apikey="198e473e9af863b59c791ff28793291f";
  const [data,setData]=useState([])
  const [longitude,setLongitude]=useState({})
  const [latitude,setLatitude]=useState({})
  const [currentWeather,setcurrentWeather]=useState({})
  const [search,setSearch]=useState("Jodhpur,Rajasthan")
  const [hourly, setHourly] = useState([])
  const [loading,setloading]=useState(false)
  const [click,setClick]=useState({
    activeObject:1,
    objects:[{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8}]
  })
 const [toggleindex,settoggleindex]=useState(1)

  function toggleActive(index){
    setClick({...click,activeObject:click.objects[index]})
    settoggleindex(index)
  }

  function toggleActiveStyles(index){
    if(click.objects[index]==click.activeObject){
      return "weatherdata active"
    }else{
      return "weatherdata inactive"
    }
  }
  const CurrentWeather=(cityname)=>{
    console.log(cityname)
    const baseurl=`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=dfbfa90f298297bd32d78348f443a400`
    axios.get(baseurl).then((res)=>{
      console.log("response",res)
      
      setcurrentWeather(res.data)  
      var savePositionToState=(position)=>{
        setLongitude(res.data.coord.lon)
        setLatitude(res.data.coord.lat)
      }

      window.navigator.geolocation.getCurrentPosition(savePositionToState)
    }).catch((err)=>{
      console.log(err)
    })
  }
  
  const WeekDetails=(lat,lon)=>{
      
        const url=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=dfbfa90f298297bd32d78348f443a400`
        axios.get(url).then((response)=>{
        console.log("res",response)
        setData(response.data.daily)
        // setDate(response.data.daily.map((Dates)=>Dates.dt))
        // // // setHourly(response.data.hourly.map((hours)=>hours.dt))
        setHourly(response.data.hourly.map((hours)=>hours))
        // setWeather(response.data.daily.map((cloud)=>cloud.weather))

        }).catch((err)=>{
          console.log(err)
        })
  }

  const handlechange=(e)=>{
    setSearch(e.target.value)
  }

  const usedebounce=Debounce(search,1000)
  // console.log(usedebounce)

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      CurrentWeather(usedebounce)
      WeekDetails(latitude,longitude)
    }
  }

const handleSearch=()=>{
  if(usedebounce.length>0 ){
    CurrentWeather(usedebounce)
    WeekDetails(latitude,longitude)
    // setSearch("")
  }else{
    CurrentWeather("jodhpur")
    WeekDetails(26.2389,73.0243)
  }
   
}

useEffect(()=>{
  setloading(true)
  CurrentWeather("jodhpur")
  WeekDetails(26.2389,73.0243)
 

},[])



const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function displayDay(d) {
  var date = new Date(d * 1000);
  return days[date.getDay()];
}

function displayTime(d) {
  var date = new Date(d * 1000);
  var hrs = date.getHours();
  var minutes = date.getMinutes();
  if(hrs>12){
    if(minutes.toFixed().length==1){
      var formattedTime = hrs-12 + ":" + " "+minutes.toFixed()+"0"+"pm";
    }else{
      var formattedTime = hrs-12 + ":" +" "+ minutes.toFixed()+"pm";
    }
  }else if(hrs<12){
    if(minutes.toFixed().length==1){
      var formattedTime = hrs + ":" +" "+ minutes.toFixed()+"0"+"am";
    }else{
      var formattedTime = hrs + ":" +" "+ minutes.toFixed()+"am";
    }
    
  }else{
    if(minutes.toFixed().length==1){
      var formattedTime = hrs + ":" +" "+ minutes.toFixed()+"0"+"am";
    }else{
      var formattedTime = hrs + ":" +" "+ minutes.toFixed()+"am";
    }
  }
  
  

  return formattedTime;
}



    const [chartdata,setchartData]=useState({
      labels:["5am","","","","","2am","","","","","6pm"],
      datasets:[
        {
          label:"first Dataset",
          data:[,0,2,5,8,10,8,5,2,0,],
          
          borderColor:"yellow",
          segment:{
            backgroundColor:'rgba(231, 84, 128,0.1)',
          },
          
          borderWidth:1,
       
          tension:0.4,
          fill:true,
         
        }
      ]
    })
    

   
    var options={
      // maintainAspectRatio:false,
      scales:{
        x:{
          grid:{
            display:false,
            borderWidth:3,
            
          },
          ticks:{
            borderColor:yellow,
          }
        },
        y:{
        // beginAtZero:true,
        ticks:{
          display:false,
          
        },
       grid:{
        display:false,
        borderColor:"rgba(0, 0, 0, 0)"
       },
      
      }
    },
    elements:{
      point:{
        radius:0
      }
    },
    plugins:{
      legend:{
        display:false,
       
      }
    }
  }
  // console.log("data",data)

  return (
  
    <div className="weather-container">
      {!loading?<div className="loader"><Audio height="180" width="200" radius="40" color="skyblue" arialLabel="four-dots-loading" wrapperStyle wrapperClass/></div>:

          <div className="header-searchBar">
            <div className="location-icon-name">
                <i className="fi fi-rr-marker absolute-center location-icon"></i>
                
            </div>
            <input
              className="search-input"
              placeholder="Search for Weather"
              onChange={(e)=>setSearch(e.target.value)}
              value={search}
              onKeyDown={handleKeyDown}
            />
            <i className="fi fi-rr-search absolute-center search-icon" onClick={handleSearch}></i>
          </div>
          }
          <div className="weekdata">
              {data.length>0 &&
                <>
              <div className={toggleActiveStyles(1)} onClick={()=>{toggleActive(1)}}>
                  <p>{displayDay(data[0].dt)}</p>
                  <p><span>{(data[0].temp.max-273.15).toFixed(0)+"°"}</span><span>{(data[0].temp.min-273.15).toFixed(0)+"°"}</span></p>
                  <img 
                        
                    src={`http://openweathermap.org/img/wn/${data[0].weather[0]?.icon}@2x.png`}
                    alt=""
                  />
                  <h5>{data[0].weather[0]?.main}</h5>
              </div>
              <div className={toggleActiveStyles(2)} onClick={()=>{toggleActive(2)}}>
                  <p>{displayDay(data[1].dt)}</p>
                  <p><span>{(data[1].temp.max-273.15).toFixed(0)+"°"}</span><span>{(data[1].temp.min-273.15).toFixed(0)+"°"}</span></p>
                  <img 
                        
                        src={`http://openweathermap.org/img/wn/${data[1].weather[0]?.icon}@2x.png`}
                        alt=""
                  />
                  <h5>{data[1].weather[0]?.main}</h5>

              </div>
              <div className={toggleActiveStyles(3)} onClick={()=>{toggleActive(3)}}>
                <p>{displayDay(data[2].dt)}</p>
                <p><span>{(data[2].temp.max-273.15).toFixed(0)+"°"}</span><span>{(data[2].temp.min-273.15).toFixed(0)+"°"}</span></p>
                <img 
                        
                        src={`http://openweathermap.org/img/wn/${data[2].weather[0]?.icon}@2x.png`}
                        alt=""
                />
                <h5>{data[2].weather[0]?.main}</h5>
              </div>

              <div className={toggleActiveStyles(4)} onClick={()=>{toggleActive(4)}}>
                <p>{displayDay(data[3].dt)}</p>
                <p><span>{(data[3].temp.max-273.15).toFixed(0)+"°"}</span><span>{(data[3].temp.min-273.15).toFixed(0)+"°"}</span></p>
                <img 
                        
                        src={`http://openweathermap.org/img/wn/${data[3].weather[0]?.icon}@2x.png`}
                        alt=""
                />
                <h5>{data[3].weather[0]?.main}</h5>
              </div>
              <div className={toggleActiveStyles(5)} onClick={()=>{toggleActive(5)}}>
                <p>{displayDay(data[4].dt)}</p>
                <p><span>{(data[4].temp.max-273.15).toFixed(0)+"°"}</span><span>{(data[4].temp.min-273.15).toFixed(0)+"°"}</span></p>
                <img 
                        
                        src={`http://openweathermap.org/img/wn/${data[4].weather[0]?.icon}@2x.png`}
                        alt=""
                />
                <h5>{data[4].weather[0]?.main}</h5>
              </div>
              <div className={toggleActiveStyles(6)} onClick={()=>{toggleActive(6)}}>
                <p>{displayDay(data[5].dt)}</p>
                <p><span>{(data[5].temp.max-273.15).toFixed(0)+"°"}</span><span>{(data[5].temp.min-273.15).toFixed(0)+"°"}</span></p>
                <img 
                        
                        src={`http://openweathermap.org/img/wn/${data[5].weather[0]?.icon}@2x.png`}
                        alt=""
                />
                <h5>{data[5].weather[0]?.main}</h5>
              </div>

              <div className={toggleActiveStyles(7)} onClick={()=>{toggleActive(7)}}>
                <p>{displayDay(data[6].dt)}</p>
                <p><span>{(data[6].temp.max-273.15).toFixed(0)+"°"}</span><span>{(data[6].temp.min-273.15).toFixed(0)+"°"}</span></p>
                <img 
                        
                        src={`http://openweathermap.org/img/wn/${data[6].weather[0]?.icon}@2x.png`}
                        alt=""
                />
                <h5>{data[6].weather[0]?.main}</h5>
              </div>
              <div className={toggleActiveStyles(8)} onClick={()=>{toggleActive(8)}}>
                <p>{displayDay(data[7].dt)}</p>
                <p><span>{(data[7].temp.max-273.15).toFixed(0)+"°"}</span><span>{(data[7].temp.min-273.15).toFixed(0)+"°"}</span></p>
                <img 
                        
                        src={`http://openweathermap.org/img/wn/${data[7].weather[0]?.icon}@2x.png`}
                        alt=""
                />
                <h5>{data[7].weather[0]?.main}</h5>
              </div>
              
              </>
              }
             

              
            
          </div>
           <div className="chartdiv">
              {data.length>0 &&
                <>
                     <div className='charttemp'>
                      <h1>{(data[toggleindex-1].temp.max-273.15).toFixed(0)+"°C"}</h1>
                            <img 
                        
                                src={`http://openweathermap.org/img/wn/${data[toggleindex-1].weather[0]?.icon}@2x.png`}
                                alt=""
                            />
                     </div>
                    <div className='mainchart'>
                      <LineChart hourly={hourly} toggleindex={toggleindex}/>
                    </div>
                     

                     <div className='humidity-pressure'>
                      {data.length>0 &&
                        <>
                          <div className='pressure'>
                            <h3 className="press">Pressure</h3>
                            <h4 className='pressdata'>
                                  {data[toggleindex-1].pressure+"hpa"}
                            </h4>
                          </div>
                          <div className='humidity'>
                            <h3 className="humm">Humidity</h3>
                            <h4 className='hummdata'>
                                  {data[toggleindex-1].humidity+"%"}
                            </h4>
                          </div>
                        </>
                      }
                     </div>
                     <div className="sundatabox">
                          {data.length>0 &&
                            <>
                              <div>
                                <h3 className="sun">Sunrise</h3>
                                <h4 className='sunrise'>
                                  {displayTime(data[toggleindex-1].sunrise)}
                                </h4>
                              </div>
                              <div>
                                <h3 className='sun'>Sunset</h3>
                                <h4 className='sunset'>
                                  {displayTime(data[toggleindex-1].sunset)}
                                </h4>
                              </div>
                             
                            </>
                          }
                     </div>
                     <div className='linechart'>
                     <Line  data={chartdata} options={options}  height={65} className="chartdata"></Line>
                          
                     </div>
                     
                      
                </>
              }
                 
           </div>
      
    </div>

  )
}


export default DisplayWeather