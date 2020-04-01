import React from 'react';
import { FaSpaceShuttle, FaSun, FaRegPaperPlane } from 'react-icons/fa';
import moment from 'moment';

export default ({ setTaskDate, showTaskDate, setShowTaskDate }) =>
  showTaskDate && (
    <div className="task-date" data-testid="task-date-overlay">
      <ul className="task-date__list">
        <li data-testid="task-date-today">
          <div
            role="button"
            tabIndex={0}
            aria-label="Set the task date to today"
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().format('DD/MM/YYYY'));
            }}
            onKeyDown={() => {
              setShowTaskDate(false);
              setTaskDate(moment().format('DD/MM/YYYY'));
            }}
          >
            <span>
              <FaSun />
            </span>
            <span>Today</span>
          </div>
        </li>
        <li data-testid="task-date-tomorrow">
          <div
            role="button"
            tabIndex={0}
            aria-label="Set the task date to tomorrow"
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(1, 'days').format('DD/MM/YYYY'));
            }}
            onKeyDown={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(1, 'days').format('DD/MM/YYYY'));
            }}
          >
            <span>
              <FaSpaceShuttle />
            </span>
            <span>Tomorrow</span>
          </div>
        </li>
        <li data-testid="task-date-tomorrow">
          <div
            role="button"
            tabIndex={0}
            aria-label="Set the task date to next 7 days"
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
            }}
            onKeyDown={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
            }}
          >
            <span>
              <FaRegPaperPlane />
            </span>
            <span>Next Week</span>
          </div>
        </li>
      </ul>
    </div>
  );
