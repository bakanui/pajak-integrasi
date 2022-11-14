import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import airtanah from '../_nav_Air_Tanah'
import hiburan from '../_nav_Hiburan'
import pbb from '../_nav_Pbb'
import peneranganjalan from '../_nav_Penerangan_Jalan'
import reklame from '../_nav_Reklame'
import satpolpp from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const navGetter = (username) => {
    switch (username) {
      case 'admin_pbb':
        return <AppSidebarNav items={pbb} />
      case 'admin_Reklame':
        return <AppSidebarNav items={reklame} />
      case 'admin_air_tanah':
        return <AppSidebarNav items={airtanah} />
      case 'admin_hiburan':
        return <AppSidebarNav items={hiburan} />
      case 'admin_penerangan_jalan':
        return <AppSidebarNav items={peneranganjalan} />
      case 'admin_satpol_pp':
        return <AppSidebarNav items={satpolpp} />
      default:
        return <></>
    }
  }
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full disIcon" icon={logoNegative} height={40} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>{navGetter(localStorage.getItem('username'))}</SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
