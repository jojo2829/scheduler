import { useState, useEffect } from "react";
import axios from "axios";
import { getSpotsForDay } from "../helpers/selectors";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  const setDays = (days) => setState((prev) => ({ ...prev, days }));
  const setAppointments = (appointments) =>
    setState((prev) => ({ ...prev, appointments }));
  const setInterviewers = (interviewers) =>
    setState((prev) => ({ ...prev, interviewers }));

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      setDays(days.data);
      setAppointments(appointments.data);
      setInterviewers(interviewers.data);
    });
  }, []);

  //when an appointment is saved, updates the appointment list
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments,
        });
      })
      .then(() => {
        const newDays = updateSpots(state.day, state.days, appointments);
        setDays(newDays);
      });
  }

  //when an appointment is deleted, updates the appointment list
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments,
        });
      })
      .then(() => {
        const newDays = updateSpots(state.day, state.days, appointments);
        setDays(newDays);
      });
  }

  //updates spots remaining after book/delete appointment
  const updateSpots = function (dayName, days, appointments) {
    const dayObj = days.find((day) => day.name === dayName);

    const spots = getSpotsForDay(dayObj, appointments);
    const newDay = { ...dayObj, spots };

    const newDays = days.map((day) => (day.name === dayName ? newDay : day));

    return newDays;
  };

  return { state, setDay, bookInterview, cancelInterview, updateSpots };
}
