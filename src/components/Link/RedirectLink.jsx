import React from 'react'
import { Link } from 'react-router-dom';

const RedirectLink = ({ path, label, level = 'title-sm' }) => {
    return (
        <Link
            to={path}
            level={level}
            style={{ textDecoration: 'none', color: '#227fdd' }}
        >
            {label}
        </Link>
    )
}

export default RedirectLink