import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props){
  const {days, setDay} = props;

  const mappedDays = days.map(day => {
    if (day.name === props.day) {
      return <ul key={day.id}>
      <DayListItem name={day.name} spots={day.spots} setDay={setDay} selected/>
      </ul>
    }
    return <ul key={day.id}>
      <DayListItem name={day.name} spots={day.spots} setDay={setDay} />
    </ul>
  });

  return(
    <ul>
      {mappedDays}
    </ul>
  )
}