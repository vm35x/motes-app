import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Session } from "meteor/session";
import { createContainer } from "meteor/react-meteor-data";

export const NoteListItem = props => {
  const className = props.note.selected ? "item item--selected" : "item";

  return (
    <div
      className={className}
      onClick={() => {
        props.Session.set("selectedNoteId", props.note._id);
      }}
    >
      <h5 className="note__title">{props.note.title || "Untitled note"}</h5>
      <p className="note__subtitle">{moment(props.note.updatedAt).format("M/DD/YY")}</p>
    </div>
  );
};

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
};

export default createContainer(() => {
  return { Session };
}, NoteListItem);
