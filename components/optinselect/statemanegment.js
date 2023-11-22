import React from 'react'
import { useEffect,useReducer } from 'react';
const initstate={
    alldata:[],
    cityname:"",
    region:[],
    regionname:"",
    district:""
}
const statemanegment = () => {
    const [state, dispatch] = useReducer(reducer, initstate)

    useEffect(() => {
        // https://restallcity.com/v2/all?fields=${value}
        fetch("https://mohaddesepkz.pythonanywhere.com/cities/")
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            setAllcity(data);
          });
      }, []);

  return (
    <div>
      
    </div>
  )
}

export default statemanegment;

