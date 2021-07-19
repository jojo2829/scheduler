import React from "react";
import classnames from 'classnames';
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const { name, avatar, setInterviewer, selected } = props;

  const intListItemClass = classnames(
    "interviewers__item",
    {"interviewers__item--selected": selected}
  )

  return (
    <li className={intListItemClass} onClick={setInterviewer}>
    <img
      className="interviewers__item-image"
      src={avatar}
      alt={name}
    />
    {selected && name}
  </li>
  );
};