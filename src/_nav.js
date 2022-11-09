import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAirplay,
  cilDoor,
  cilDrop,
  cilGlobeAlt,
  cilLightbulb,
  cilViewQuilt,
} from '@coreui/icons'
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
  {
    component: CNavItem,
    name: 'Reklame',
    to: '/pajak/reklame',
    icon: <CIcon icon={cilAirplay} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Air Tanah',
    to: '/pajak/air-tanah',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Hiburan',
    to: '/pajak/hiburan',
    icon: <CIcon icon={cilDoor} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Penerangan Jalan',
    to: '/pajak/penerangan-jalan',
    icon: <CIcon icon={cilLightbulb} customClassName="nav-icon" />,
  },
]

export default _nav
