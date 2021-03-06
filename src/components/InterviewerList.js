import React from "react";
import "components/InterviewerList.scss";
import PropTypes from "prop-types";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;

  const mappedInterviewers = interviewers.map(interviewer => {
    return  <InterviewerListItem 
      key={interviewer.id}
      id={interviewer.id} 
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === value}
      setInterviewer={(event) => onChange(interviewer.id)}
    />
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{mappedInterviewers}</ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};