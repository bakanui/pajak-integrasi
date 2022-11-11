import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilGlobeAlt, cilViewQuilt } from '@coreui/icons'
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
    name: 'PBB',
    to: '/pajak/pbb',
    icon: <CIcon icon={cilGlobeAlt} customClassName="nav-icon" />,
  },
]

export default _nav
