import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilLightbulb, cilViewQuilt } from '@coreui/icons'
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
    name: 'Penerangan Jalan',
    to: '/pajak/penerangan-jalan',
    icon: <CIcon icon={cilLightbulb} customClassName="nav-icon" />,
  },
]

export default _nav
