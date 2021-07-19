//returns an array of appointment objects
export function getAppointmentsForDay(state, day) {
  let result = [];

  if (state.days.length === 0) {
    return [];
  }

  const apptDate = state.days.find((date) => date.name === day);

  if (!apptDate) {
    return [];
  }

  const apptInDay = apptDate.appointments;

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

//returns interview objects
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

  return (result = {
    student: interview.student,
    interviewer,
  });
}

//returns list of interviewers for that day
export function getInterviewersForDay(state, day) {
  let result = [];

  if (!state.days.length === 0) {
    return [];
  }

  const apptDate = state.days.find((date) => date.name === day);

  if (!apptDate) {
    return [];
  }

  const interviewerArr = apptDate.interviewers;

  for (const index in state.interviewers) {
    const interviewer = state.interviewers[index];
    for (const key of interviewerArr) {
      if (key === interviewer.id) {
        result.push(interviewer);
      }
    }
  }

  return result;
}

//helper function for counting spots
export function getSpotsForDay(dayObj, appointments) {
  let spots = 0;

  for (const i of dayObj.appointments) {
    const appointment = appointments[i];

    if (!appointment.interview) {
      spots++;
    }
  }

  return spots;
}
