import React, {useState, useEffect} from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";

import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState(prev => ({...prev, day}));
  const setDays = days => setState(prev => ({ ...prev, days }));
  const setAppointments = appointments => setState(prev => ({ ...prev, appointments}));

  let dailyAppointments = [];
  dailyAppointments = getAppointmentsForDay(state, state.day);

  const mappedAppointments = dailyAppointments.map(appointment => {

    return <Appointment 
      key={appointment.id}
      {...appointment}
    />
  });
  
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then((all) => {
      console.log(all);
      const [days, appointments] = all;
      setDays(days.data);
      setAppointments(appointments.data);
    })
    
  },[]);

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
            days={state.days}
            day={state.day}
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
