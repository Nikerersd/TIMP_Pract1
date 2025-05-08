import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  role: string;
}

interface Facility {
    id: number;
    name: string;
    location: string;
  }
  

export default function Dashboard() {
    const [activeSection, setActiveSection] = useState<string>('employees');
    const [users, setUsers] = useState<User[]>([]);
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [newEmployeeName, setNewEmployeeName] = useState('');
    const [newEmployeePassword, setNewEmployeePassword] = useState('');
    const [newFacilityName, setNewFacilityName] = useState('');
    const [newFacilityLocation, setNewFacilityLocation] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (activeSection === 'employees') {
          fetchEmployees();
        } else if (activeSection === 'facilities') {
          fetchFacilities();
        }
      }, [activeSection]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users/employees');
      setUsers(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке сотрудников:', error);
    }
  };

  const fetchFacilities = async () => {
    try {
      const response = await axios.get('http://localhost:8000/facilities');
      setFacilities(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке объектов:', error);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleAddEmployee = async () => {
    if (!newEmployeeName.trim() || !newEmployeePassword.trim()) {
      alert('Заполните все поля');
      return;
    }

    try {
      await axios.post('http://localhost:8000/users', {
        name: newEmployeeName,
        password: newEmployeePassword,
        role: 'employee'
      });
      setNewEmployeeName('');
      setNewEmployeePassword('');
      fetchEmployees();
      alert('Сотрудник успешно добавлен');
    } catch (error) {
      console.error('Ошибка при добавлении сотрудника:', error);
      alert('Ошибка при добавлении сотрудника');
    }
  };

  const handleAddFacility = async () => {
    if (!newFacilityName.trim() || !newFacilityLocation.trim()) {
      alert('Заполните все поля');
      return;
    }

    try {
      await axios.post('http://localhost:8000/facilities', {
        name: newFacilityName,
        location: newFacilityLocation
      });
      setNewFacilityName('');
      setNewFacilityLocation('');
      fetchFacilities();
      alert('Объект успешно добавлен');
    } catch (error) {
      console.error('Ошибка при добавлении объекта:', error);
      alert('Ошибка при добавлении объекта');
    }
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
            
            <div style={styles.addEmployeeForm}>
                <div style={styles.inputContainer}>
                    <label style={styles.inputLabel}>Имя сотрудника</label>
                    <input
                    type="text"
                    placeholder="Введите имя"
                    value={newEmployeeName}
                    onChange={(e) => setNewEmployeeName(e.target.value)}
                    style={styles.inputField}
                    />
                </div>
                
                <div style={styles.inputContainer}>
                    <label style={styles.inputLabel}>Пароль</label>
                    <input
                    type="password"
                    placeholder="Введите пароль"
                    value={newEmployeePassword}
                    onChange={(e) => setNewEmployeePassword(e.target.value)}
                    style={styles.inputField}
                    />
                </div>
                
                <button 
                    onClick={handleAddEmployee}
                    style={styles.addButton}
                >
                    Добавить сотрудника
                </button>
                </div>
            
            <div style={styles.employeeList}>
              <h3 style={styles.listHeader}>Список сотрудников</h3>
              {users.length > 0 ? (
                <ul style={styles.list}>
                  {users.map(user => (
                    <li key={user.id} style={styles.listItem}>
                        <span style={styles.name}>{user.name}</span>
                        <span style={styles.roleBadge}>{user.role}</span>
                    </li>
                    ))}
                </ul>
              ) : (
                <p style={styles.noEmployees}>Нет сотрудников</p>
              )}
            </div>
          </div>
        )}
        
        {activeSection === 'facilities' && (
            <div style={styles.section}>
                <h2 style={styles.sectionHeader}>Список объектов</h2>
                
                <div style={styles.addForm}>
                <div style={styles.inputContainer}>
                    <label style={styles.inputLabel}>Название объекта</label>
                    <input
                    type="text"
                    value={newFacilityName}
                    onChange={(e) => setNewFacilityName(e.target.value)}
                    placeholder="Введите название"
                    style={styles.inputField}
                    />
                </div>
                
                <div style={styles.inputContainer}>
                    <label style={styles.inputLabel}>Местоположение</label>
                    <input
                    type="text"
                    value={newFacilityLocation}
                    onChange={(e) => setNewFacilityLocation(e.target.value)}
                    placeholder="Введите местоположение"
                    style={styles.inputField}
                    />
                </div>
                
                <button 
                    onClick={handleAddFacility}
                    style={styles.addButton}
                >
                    Добавить объект
                </button>
                </div>
                
                <div style={styles.listContainer}>
                <h3 style={styles.listHeader}>Список объектов</h3>
                {facilities.length > 0 ? (
                    <div style={styles.tableContainer}>
                    <div style={styles.tableHeader}>
                        <div style={{...styles.tableCell, flex: 2}}>Название</div>
                        <div style={styles.tableCell}>Местоположение</div>
                    </div>
                    {facilities.map(facility => (
                        <div key={facility.id} style={styles.tableRow}>
                        <div style={{...styles.tableCell, flex: 2, fontWeight: '500'}}>{facility.name}</div>
                        <div style={styles.tableCell}>{facility.location}</div>
                        </div>
                    ))}
                    </div>
                ) : (
                    <p style={styles.noData}>Нет добавленных объектов</p>
                )}
                </div>
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
  addEmployeeForm: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  input: {
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid #cbd5e0',
    fontSize: '14px',
    width: '100%',
    marginBottom: '12px',
    '&:focus': {
      outline: 'none',
      borderColor: '#3182ce',
      boxShadow: '0 0 0 3px rgba(49, 130, 206, 0.2)',
    }
  },
  addButton: {
    width: '100%',
    padding: '12px',
    fontSize: '15px',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#4299e1',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#3182ce',
      transform: 'translateY(-1px)',
    },
    '&:active': {
      transform: 'translateY(0)',
    }
  },
  employeeList: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    marginTop: '20px',
  },
  listHeader: {
    margin: '0 0 20px 0',
    fontSize: '18px',
    color: '#2d3748',
    fontWeight: '600',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '10px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'grid',
    gap: '12px',
  },
  listItem: {
    backgroundColor: '#f8fafc',
    padding: '12px 16px',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #e2e8f0',
  },
  roleBadge: {
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600',
  },
  noEmployees: {
    color: '#666',
    textAlign: 'center',
    padding: '20px',
  },
  name: {
    color: '#1a365d',
    fontSize: '15px',
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: '16px',
  },
  inputLabel: {
    display: 'block',
    marginBottom: '6px',
    fontSize: '14px',
    color: '#4a5568',
    fontWeight: '500',
  },
  inputField: {
    width: '100%',
    padding: '12px 14px',
    fontSize: '15px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#ffffff', // Белый фон вместо светло-серого
    color: '#2d3748', // Темно-серый цвет текста
    transition: 'all 0.2s ease',
    outline: 'none',
    '&:focus': {
      borderColor: '#4299e1',
      boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.2)',
      backgroundColor: '#ffffff',
    },
    '&:hover': {
      borderColor: '#cbd5e0',
    }
  },
  addForm: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  facilitiesList: {
    marginTop: '16px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
  },
  th: {
    textAlign: 'left',
    padding: '12px',
    backgroundColor: '#f7fafc',
    borderBottom: '1px solid #e2e8f0',
    color: '#4a5568',
    fontWeight: '600',
  },
  tr: {
    borderBottom: '1px solid #edf2f7',
    '&:hover': {
      backgroundColor: '#f8fafc',
    }
  },
  td: {
    padding: '12px',
    color: '#2d3748',
  },
  noData: {
    textAlign: 'center',
    color: '#718096',
    padding: '20px',
  },
  label: {
    fontSize: '14px',
    color: '#4a5568',
    fontWeight: '500',
  },
  listContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  tableContainer: {
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    overflow: 'hidden',
  },
  tableHeader: {
    display: 'flex',
    backgroundColor: '#f7fafc',
    padding: '12px 16px',
    borderBottom: '1px solid #e2e8f0',
    fontWeight: '600',
    color: '#4a5568',
  },
  tableRow: {
    display: 'flex',
    padding: '12px 16px',
    borderBottom: '1px solid #edf2f7',
    '&:hover': {
      backgroundColor: '#f8fafc',
    },
    '&:last-child': {
      borderBottom: 'none',
    }
  },
  tableCell: {
    flex: 1,
    padding: '4px 0',
    color: '#2d3748',
  },
} as const;