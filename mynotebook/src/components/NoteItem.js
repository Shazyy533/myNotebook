import React from "react";

const NoteItem = (props) => {
  const { note } = props;
  return (
    
    <div className="card my-3 mx-5 col-md-3">
      <div className="card-body">
        <h4 className="card-title">{note.title}</h4>
        <h6 className="card-text">{note.desc}</h6>
        {/* <i className="far fa-trash-alt mx-2"></i>
        <i className="far fa-edit mx-2"></i> */}

      </div>
    </div>
  );
};

export default NoteItem;
