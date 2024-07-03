import React from 'react'
import { useNavigate } from 'react-router-dom'

const MainPage = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('authToken')
        navigate('/login')
    }

    return (
        <div>
            MainPage
            <button onClick={logout}>Sair</button>
        </div>
    )
}

export default MainPage