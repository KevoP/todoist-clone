import React, { useState } from 'react';
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendar,
  FaRegCalendarAlt,
} from 'react-icons/fa';
import { useSelectedProjectValue } from '../../context';
import Projects from '../Projects';
import AddProject from '../AddProject';

export default () => {
  const { setSelectedProject } = useSelectedProjectValue();
  const [active, setActive] = useState('inbox');
  const [showProjects, setShowProjects] = useState(true);

  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li
          data-testid="inbox"
          className={active === 'inbox' ? 'active' : undefined}
        >
          <div
            data-testid="inbox-action"
            aria-label="Show inbox tasks"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive('inbox');
              setSelectedProject('INBOX');
            }}
            onKeyDown={() => {
              setActive('inbox');
              setSelectedProject('INBOX');
            }}
          >
            <span>
              <FaInbox />
            </span>
            Inbox
          </div>
        </li>
        <li
          data-testid="inbox"
          className={active === 'today' ? 'active' : undefined}
        >
          <div
            data-testid="inbox-action"
            aria-label="Show inbox tasks"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive('today');
              setSelectedProject('TODAY');
            }}
            onKeyDown={() => {
              setActive('today');
              setSelectedProject('TODAY');
            }}
          >
            <span>
              <FaRegCalendar />
            </span>
            Today
          </div>
        </li>
        <li
          data-testid="next_7"
          className={active === 'next_7' ? 'active' : undefined}
        >
          <div
            data-testid="next_7-action"
            aria-label="Show tasks for the next 7 days"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive('next_7');
              setSelectedProject('NEXT_7');
            }}
            onKeyDown={() => {
              setActive('next_7');
              setSelectedProject('NEXT_7');
            }}
          >
            <span>
              <FaRegCalendarAlt />
            </span>
            Next 7 Days
          </div>
        </li>
      </ul>
      <div
        role="button"
        tabIndex={0}
        className="sidebar__middle"
        onClick={() => setShowProjects(!showProjects)}
        onKeyDown={() => setShowProjects(!showProjects)}
        aria-label="Show/Hide Projects"
      >
        <span>
          <FaChevronDown
            className={!showProjects ? 'hidden-projects' : undefined}
          />
        </span>
        <h2>Projects</h2>
      </div>

      <ul className="sidebar__projects">{showProjects && <Projects />}</ul>

      {showProjects && <AddProject />}
    </div>
  );
};
