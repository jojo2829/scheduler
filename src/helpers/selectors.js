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

export function getInterview(state, interview) {
  let result = {};
  let interviewer = {};

  if (!interview) {
    return null;
  }
  
  for (const key in state.interviewers) {
    if (state.interviewers[key].id === interview.interviewer) {
      interviewer = state.interviewers[key];
    }
  }

  return result = {
    student: interview.student,
    interviewer
  };
}