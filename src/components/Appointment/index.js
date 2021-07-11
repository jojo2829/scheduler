import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log("interview: ", interview)
    return interview;
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={(name, interviewer) => {
            transition(SAVING);
            props.bookInterview(props.id, save(name, interviewer)).then(() => {transition(SHOW)})
          }}
        />
      )}    
      {mode === EDIT && (
        <Form
          currentStudent={props.interview.student}
          currentInterviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={(name, interviewer) => {
            transition(SAVING);
            props.bookInterview(props.id, save(name, interviewer)).then(() => transition(SHOW))
          }}
        />
      )}
      {mode === SAVING && <Status message={"Saving.."} />}
      {mode === DELETING && <Status message={"Deleting.."} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CONFIRM && (
        <Confirm 
          onCancel={() => back()}
          onConfirm={() => {
            transition(DELETING);
            props.cancelInterview(props.id).then(() => transition(EMPTY))
          }}
        />
      )}
    </article>
  )
};