import React from "react";

import PrivateHeader from "./PrivateHeader";
import NoteList from "./NoteList";
import Editor from "./Editor";

const Dashboard = () => {
  return (
    <div>
      <PrivateHeader title="Dashboard" />
      <div className="page-content">
        <div className="page-content__sidebar">
          <NoteList />
        </div>
        <div className="page-content__main">
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
