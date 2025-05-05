import React from 'react';
import MasterDashboard from '../components/MasterComponents/MasterDashboard.jsx';
import '../assets/styles/MasterPanel.scss';
import Header from "../components/Templates/Header.jsx";

function MasterPanel() {
  return (
    <div className="master-panel">
        <Header/>
      <MasterDashboard />
    </div>
  );
}

export default MasterPanel;