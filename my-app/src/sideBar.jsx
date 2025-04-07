import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideBar.css';

const SideBar = () => {
  const menuItems = [
    { path: '/dashboard', icon: '/icons/phosphor-SquaresFour-Outlined.svg', label: 'Dashboard' },
    { path: '/projects', icon: '/icons/Folder.png', label: 'Projects' },
    { path: '/teams', icon: '/icons/Groups.png', label: 'Teams' },
    { path: '/analytics', icon: '/icons/Pie chart.png', label: 'Analytics' },
    { path: '/messages', icon: '/icons/Chat.png', label: 'Messages' },
    { path: '/integrations', icon: '/icons/Code.png', label: 'Integrations' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/icons/Image 1858.png" alt="Logo" className="sidebar-logo" />
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                <img 
                  src={item.icon} 
                  alt={item.label} 
                  className="nav-icon" 
                />
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <div className="upgrade-banner">
          <img src="/icons/Group.png" alt="Upgrade" className="upgrade-icon" />
          <div className="upgrade-text">
            <h2>v2.0 is available</h2>
            <button className="upgrade-button">Try now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;