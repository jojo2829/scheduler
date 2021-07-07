import React, {useState, useEffect} from "react";
import axios from "axios";

import DayList from "components/DayList";
import Appointment from "components/Appointment/index";

import "components/Application.scss";


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "11am",
    interview: {
      student: "Bob",
      interviewer: { 
        id: 2, 
        name: "Tori Malcolm", 
        avatar: "https://i.imgur.com/Nmx0Qxo.png" 
      }
    }
  },
  {
    id: 4,
    time: "2pm",
  },
  {
    id: 5,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  }
];

const mappedAppointments = appointments.map(appointment => {

  return <Appointment 
    key={appointment.id}
    {...appointment}
  />
});

export default function Application(props) {
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get(`/api/days`).then((response) => {
      console.log(response.data);
      setDays([...response.data]);
    })
  },[]);

  const [day, setDay] = useState("Monday");


  return (
    <main className="layout">
      <section className="sidebar">
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {mappedAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
