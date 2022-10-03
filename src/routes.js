import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//Pajak
const PBB = React.lazy(() => import('./views/pajak/Pbb'))
const Reklame = React.lazy(() => import('./views/pajak/Reklame'))
const Hiburan = React.lazy(() => import('./views/pajak/Hiburan'))
const AirTanah = React.lazy(() => import('./views/pajak/AirTanah'))
const PeneranganJalan = React.lazy(() => import('./views/pajak/PeneranganJalan'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/pajak/pbb', name: 'Pajak Bumi dan Bangunan', element: PBB },
  { path: '/pajak/reklame', name: 'Pajak Reklame', element: Reklame },
  { path: '/pajak/hiburan', name: 'Pajak Hiburan', element: Hiburan },
  { path: '/pajak/air-tanah', name: 'Pajak Air Tanah', element: AirTanah },
  { path: '/pajak/penerangan-jalan', name: 'Pajak Penerangan Jalan', element: PeneranganJalan },
]

export default routes