import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props){
  const {days, setDay} = props;

  const mappedDays = days.map(day => {

    return <DayListItem 
      key={day.id}
      name={day.name} 
      spots={day.spots} 
      setDay={(event) => setDay(day.name)} 
      selected={day.name === props.day}
      full={day.spots === 0}
    />
  });

  return(
    <ul>
      {mappedDays}
    </ul>
  )
}