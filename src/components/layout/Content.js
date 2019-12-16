import React from 'react';
import { Sidebar } from './Sidebar';
import { Tasks } from '../Tasks';

export const Content = () => (
    <div className="main">
        <Sidebar />
        <Tasks />
    </div>
);