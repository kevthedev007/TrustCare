import React from 'react'
import Link from 'react-router-dom/Link'

function ErrorPage () {
    return(
        <div className="error">

        <h1 className="h1-mod">Page Not Found</h1>
        <Link to='/'>
        <p className="p-mod">Back to Home</p>
        </Link>
        </div>
    )
}

export default ErrorPage