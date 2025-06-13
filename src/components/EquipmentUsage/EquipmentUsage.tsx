import React from 'react';
import './EquipmentUsage.css';
import {
  GolangIcon,
  ChatGPTIcon,
  NodeJSIcon,
  SQLIcon,
  VueJSIcon,
  InfluxDBIcon,
  CloudflareIcon,
  PythonIcon,
  DockerIcon
} from './icons';

interface Equipment {
  name: string;
  percentage: number;
  icon: React.ReactNode;
}

const EquipmentUsage: React.FC = () => {
  const equipments: Equipment[] = [
    { name: "Golang", percentage: 80, icon: <GolangIcon /> },
    { name: "ChatGPT", percentage: 70, icon: <ChatGPTIcon /> },
    { name: "NodeJS", percentage: 60, icon: <NodeJSIcon /> },
    { name: "SQL", percentage: 60, icon: <SQLIcon /> },
    { name: "VueJS", percentage: 50, icon: <VueJSIcon /> },
    { name: "InfluxDB", percentage: 30, icon: <InfluxDBIcon /> },
    { name: "Cloudflare", percentage: 20, icon: <CloudflareIcon /> },
    { name: "Python", percentage: 15, icon: <PythonIcon /> },
    { name: "Docker", percentage: 10, icon: <DockerIcon /> }
  ];

  return (
    <section className="equipment-usage section">
      <h2>Equipment Usage</h2>
      <div className="equipment-list">
        {equipments.map((equipment, index) => (
          <div className="equipment-item" key={index}>
            <div className="equipment-info">
              <div className="equipment-icon">
                {equipment.icon}
              </div>
              <span className="equipment-name">{equipment.name}</span>
            </div>
            <div className="equipment-bar-container">
              <div 
                className="equipment-bar" 
                style={{ width: `${equipment.percentage}%` }}
              ></div>
              <span className="equipment-percentage">{equipment.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EquipmentUsage;
