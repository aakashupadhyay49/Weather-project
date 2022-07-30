import React,{useState,useEffect} from "react"
import Chart from "react-apexcharts"

const LineChart = ({hourly,toggleindex}) => {
    function displayTime(d) {
        var date = new Date(d * 1000);
        var hrs = date.getHours();
        return hrs
    }
        if(hourly.length>0){
            
            if(toggleindex==1){
                 var newarr=[]
                for(let i=0;i<12;i++){
            
                    newarr.push((hourly[i].temp-273.15).toFixed(0))
                }
            }else {
                var newarr=[]
                for(let i=12;i<24;i++){
            
                    newarr.push((hourly[i].temp-273.15).toFixed(0))
                }
            }
            
        }

   
    
    console.log(newarr)
    const [product,setProduct]=useState(
    

        [
            {
                name:"Temp",
                data:newarr
            }
         ]
    )

    const [options,setOptions]=useState(
        {
            xaxis:{
                categories:[1,2,3,4,5,6,7,8,9,10,11,12],

                
            },
            yaxis:{
                show:false,
                
            },
    
            colors:["#8cbed6"],
            stroke:{width:5,curve:"smooth"},
            fill:{opacity:0.1},
            dataLabels:{
                enabled:false
            },
            
            chart:{
                toolbar:{
                    show:true,
                    offsetX:0,
                    offsetY:0,
                    tools:{
                        download:true,
                        selection:false,
                        zoom:false,
                        zoomin:false,
                        zoomout:false,
                        pan:false,
                        reset:false
                    }
                   }
            }

           
            
         }
    )

   
    return (
            <React.Fragment>
                <div className="mainchart" style={{}}>
                    <Chart type="area"
                     width={730}
                     height={370}
                    
                     series={product}
                     options={options}
                     />
                </div>
            </React.Fragment>
    )
}

export default LineChart



