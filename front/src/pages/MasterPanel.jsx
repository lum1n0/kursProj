import React from 'react';
import MasterDashboard from '../components/MasterDashboard';
import '../assets/styles/MasterPanel.scss';

function MasterPanel() {
  return (
    <div className="master-panel">
      <h1>Панель мастера</h1>
      <MasterDashboard />
    </div>
  );
}

export default MasterPanel;