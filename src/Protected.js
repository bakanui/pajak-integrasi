import { Navigate } from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'

const Protected = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default Protected

Protected.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.any,
}
