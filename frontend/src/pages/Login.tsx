import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [nameFocused, setNameFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [buttonHovered, setButtonHovered] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8000/login", {
        name,
        password,
      })
      alert(res.data.message)
      // Перенаправление после успешного входа
    } catch (err) {
      alert("Неверные учетные данные")
    }
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Авторизация</h2>
        <div style={styles.form}>
          <label style={styles.label}>Имя</label>
          <input 
            style={{
              ...styles.input,
              ...(nameFocused && styles.inputFocus)
            }}
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Введите ваше имя"
            onFocus={() => setNameFocused(true)}
            onBlur={() => setNameFocused(false)}
          />
          
          <label style={styles.label}>Пароль</label>
          <input 
            type="password" 
            style={{
              ...styles.input,
              ...(passwordFocused && styles.inputFocus)
            }}
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Введите ваш пароль"
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
          
          <button 
            style={{
              ...styles.button,
              ...(buttonHovered && styles.buttonHover)
            }}
            onClick={handleLogin}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
          >
            Войти
          </button>
          
          <p style={styles.link}>
            Нет аккаунта? <a href="/register" style={styles.linkText}>Зарегистрироваться</a>
          </p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f5f7fa',
    margin: 0,
    padding: 0,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
    width: '100%',
    maxWidth: '480px',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '28px',
    marginBottom: '32px',
    color: '#2d3748',
    textAlign: 'center',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '8px',
    fontSize: '14px',
    color: '#4a5568',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    marginBottom: '24px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    boxSizing: 'border-box',
    fontSize: '16px',
    backgroundColor: '#f8fafc',
    color: '#1a202c',
    transition: 'all 0.2s ease',
  },
  inputFocus: {
    outline: 'none',
    borderColor: '#4299e1',
    boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.2)',
    backgroundColor: '#ffffff',
  },
  button: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#4299e1',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontWeight: '600',
    marginTop: '8px',
  },
  buttonHover: {
    backgroundColor: '#3182ce',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  link: {
    textAlign: 'center',
    marginTop: '24px',
    color: '#718096',
    fontSize: '14px',
  },
  linkText: {
    color: '#4299e1',
    textDecoration: 'none',
    fontWeight: '600',
    marginLeft: '4px',
    transition: 'color 0.2s ease',
  },
  linkTextHover: {
    color: '#3182ce',
  },
}