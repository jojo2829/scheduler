export function getAppointmentsForDay(state, day) {
  let result = [];

  if (!state.days.length === 0) {
    return [];
  }

  const apptDate = state.days.filter(date => date.name === day);

  if (!apptDate[0]) {
    return [];
  }
  
  const apptInDay = apptDate[0].appointments;
  
  for (const index in state.appointments) {
    const appointment = state.appointments[index];
    for (const key of apptInDay) {
      if (key === appointment.id) {
        result.push(appointment);
      }
    }
  } 
  return result;
}