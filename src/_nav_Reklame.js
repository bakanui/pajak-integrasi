import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilAirplay, cilViewQuilt } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilViewQuilt} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Tagihan',
  },
  {
    component: CNavItem,
    name: 'Reklame',
    to: '/pajak/reklame',
    icon: <CIcon icon={cilAirplay} customClassName="nav-icon" />,
  },
]

export default _nav
