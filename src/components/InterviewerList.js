import React from "react";
import classnames from 'classnames';
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const { interviewers, setInterviewer } = props;

  const mappedInterviewers = interviewers.map(interviewer => {
    return <li key={interviewer.id}>
      <InterviewerListItem 
        id={interviewer.id} 
        name={interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer={setInterviewer} />
    </li>
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{mappedInterviewers}</ul>
    </section>
  );
};