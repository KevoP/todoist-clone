import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useProjectsValue, useSelectedProjectValue } from '../context';
import { firebase } from '../Firebase';

export default ({ project }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  const deleteProject = (docId) => {
    firebase
      .firestore()
      .collection('projects')
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects]);
        setSelectedProject('INBOX');
      });
  };

  return (
    <>
      <span className="sidebar__dot">·</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span
        role="button"
        tabIndex={0}
        aria-label="Show/hide the confirm task deletion"
        className="sidebar__project-delete"
        data-textid="delete-project"
        onClick={() => setShowConfirm(!showConfirm)}
        onKeyDown={() => setShowConfirm(!showConfirm)}
      >
        <FaTrashAlt />
        {showConfirm && (
          <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p>Are you sure you want to delete this project?</p>
              <button
                type="button"
                tabIndex={0}
                aria-label="Confirm task deletion"
                onClick={() => deleteProject(project.docId)}
                onKeyDown={() => deleteProject(project.docId)}
              >
                Delete
              </button>
              <span
                role="button"
                aria-label="Close the task delete overlay"
                tabIndex={0}
                onKeyDown={() => setShowConfirm(!showConfirm)}
                onClick={() => setShowConfirm(!showConfirm)}
              >
                Close
              </span>
            </div>
          </div>
        )}
      </span>
    </>
  );
};
