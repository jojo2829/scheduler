import {useState, useEffect} from "react";
import axios from "axios";
import { getSpotsForDay } from "../helpers/selectors";

export default function useApplicationData () {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({...prev, day}));
  const setDays = days => setState(prev => ({ ...prev, days }));
  const setAppointments = appointments => setState(prev => ({ ...prev, appointments}));
  const setInterviewers = interviewers => setState(prev => ({ ...prev, interviewers}));

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      setDays(days.data);
      setAppointments(appointments.data);
      setInterviewers(interviewers.data);
    })
  },[]);

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    console.log("id", id);
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios.put(
      `http://localhost:8001/api/appointments/${id}`,
      {interview}
    ).then(() => {
      setState({
        ...state,
        appointments
      })
    }).then(() => {
      const newDays = updateSpots(state.day, state.days, appointments);
      setDays(newDays);
    })
  };
  
  function cancelInterview(id, interview) {
  
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios.delete(
      `http://localhost:8001/api/appointments/${id}`,
      {interview}
    ).then(() => {
      setState({
        ...state,
        appointments
      })
    }).then(() => {
      const newDays = updateSpots(state.day, state.days, appointments)
      setDays(newDays);
    })
  };

  const updateSpots = function (dayName, days, appointments) {

    console.log("original days: ", days);
    const dayObj = days.find( day => day.name == dayName);
    console.log("dayObj: ", dayObj);

    const spots = getSpotsForDay(dayObj, appointments);
    console.log("spots: ", spots);
    const newDay = {...dayObj, spots};

    const newDays = days.map(day => day.name === dayName ? newDay : day)
    console.log("newDays: ", newDays);

    return newDays;
  };

  return { state, setDay, bookInterview, cancelInterview, updateSpots };
};

