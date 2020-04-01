import React from 'react';
import { firebase } from '../Firebase';

export default ({ id }) => {
  const archiveTask = () => {
    firebase.firestore().collection('tasks').doc(id).update({
      archived: true,
    });
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Archive this task"
      className="checkbox-holder"
      data-testid="checkbox-action"
      onClick={() => archiveTask()}
      onKeyDown={() => archiveTask()}
    >
      <span className="checkbox" />
    </div>
  );
};
