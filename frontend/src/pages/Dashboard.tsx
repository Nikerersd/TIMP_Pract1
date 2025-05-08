import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<string>('employees');
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h1 style={styles.header}>Панель управления</h1>
        
        <div style={styles.menuItems}>
          <button 
            onClick={() => setActiveSection('employees')} 
            style={{
              ...styles.menuButton,
              ...(activeSection === 'employees' && styles.activeMenuButton)
            }}
          >
            Сотрудники
          </button>
          
          <button 
            onClick={() => setActiveSection('facilities')} 
            style={{
              ...styles.menuButton,
              ...(activeSection === 'facilities' && styles.activeMenuButton)
            }}
          >
            Список объектов
          </button>
          
          <button 
            onClick={() => setActiveSection('incidents')} 
            style={{
              ...styles.menuButton,
              ...(activeSection === 'incidents' && styles.activeMenuButton)
            }}
          >
            Журнал инцидентов
          </button>
          
          <button 
            onClick={() => setActiveSection('notifications')} 
            style={{
              ...styles.menuButton,
              ...(activeSection === 'notifications' && styles.activeMenuButton)
            }}
          >
            Уведомления
          </button>
        </div>
        
        <button onClick={handleLogout} style={styles.logoutButton}>
          <span style={styles.logoutIcon}>⎋</span> Выйти
        </button>
      </div>

      <div style={styles.content}>
        {activeSection === 'employees' && (
          <div style={styles.section}>
            <h2 style={styles.sectionHeader}>Сотрудники</h2>
            {/* Содержимое раздела */}
          </div>
        )}
        
        {activeSection === 'facilities' && (
          <div style={styles.section}>
            <h2 style={styles.sectionHeader}>Список объектов</h2>
            {/* Содержимое раздела */}
          </div>
        )}
        
        {activeSection === 'incidents' && (
          <div style={styles.section}>
            <h2 style={styles.sectionHeader}>Журнал инцидентов</h2>
            {/* Содержимое раздела */}
          </div>
        )}
        
        {activeSection === 'notifications' && (
          <div style={styles.section}>
            <h2 style={styles.sectionHeader}>Уведомления</h2>
            {/* Содержимое раздела */}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    fontFamily: 'Arial, sans-serif',
  },
  sidebar: {
    width: '220px',
    backgroundColor: '#1a2a3a',
    color: 'white',
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    color: 'white',
    fontSize: '18px',
    padding: '0 20px 15px',
    margin: 0,
    borderBottom: '1px solid #2a3a4a',
    fontWeight: 'bold',
  },
  menuItems: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  menuButton: {
    backgroundColor: 'transparent',
    color: '#c0c0c0',
    border: 'none',
    textAlign: 'left',
    padding: '12px 20px',
    cursor: 'pointer',
    fontSize: '15px',
    margin: '3px 0',
    transition: 'all 0.2s',
    borderRadius: '4px',
  },
  activeMenuButton: {
    color: 'white',
    backgroundColor: '#2a4a6a',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#4a2a3a',
    color: '#ffaaaa',
    border: 'none',
    padding: '12px 20px',
    cursor: 'pointer',
    fontSize: '15px',
    margin: '15px 10px 0',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: 'bold',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  logoutIcon: {
    fontSize: '16px',
  },
  content: {
    flex: 1,
    padding: 0,
    margin: 0,
    backgroundColor: '#f8fafc',
    overflow: 'auto',
  },
  section: {
    padding: '20px',
  },
  sectionHeader: {
    fontSize: '18px',
    margin: '0 0 15px 0',
    padding: 0,
    color: '#333',
    fontWeight: 'bold',
  },
} as const;