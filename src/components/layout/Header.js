import React from 'react';
import { FaPizzaSlice } from 'react-icons/fa';

export const Header = () => (
    <header data-testid="header">
        <nav>
            <div className="logo">
                <img src="" alt=""/>
            </div>
            <div className="settings">
                <ul>
                    <li>image here</li>
                    <li><FaPizzaSlice /></li>
                </ul>
            </div>
        </nav>
    </header>
);