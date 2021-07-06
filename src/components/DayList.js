import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props){
  const {days, day, setDay} = props;

  const mappedDays = days.map(day => {
    return <ul key={day.id}>
      <DayListItem name={day.name} spots={day.spots} setDay={setDay}/>
    </ul>
  });

  return(
    <ul>
      {mappedDays}
    </ul>
  )
}