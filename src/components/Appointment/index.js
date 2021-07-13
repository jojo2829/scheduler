import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => {transition(SHOW)})
      .catch(error => transition(ERROR_SAVE, true));
  }

  function destroy() {
    transition(DELETING);
    props
     .cancelInterview(props.id)
     .then(() => transition(EMPTY))
     .catch(error => transition(ERROR_DELETE, true));
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
            save(name, interviewer)
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
            save(name, interviewer)
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
          onConfirm={() => destroy()}
        />
      )}
      {mode === ERROR_SAVE && <Error message={"Unable to Save"} onClose={() => back()} /> }
      {mode === ERROR_DELETE && <Error message={"Unable to Delete"} onClose={() => back()} /> }
    </article>
  )
};