import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilDoor } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import logoBangli from './../../assets/images/avatars/logo_bangli.png'
import emptyIcon from './../../assets/images/Vector.png'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('username')
    localStorage.removeItem('fullname')
    navigate('/login')
    window.location.reload(false)
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={emptyIcon} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Selamat Datang, {localStorage.getItem('fullname')}!
        </CDropdownHeader>
        <CDropdownDivider />
        <CDropdownItem
          href="#"
          onClick={() => {
            logout()
          }}
        >
          <CIcon icon={cilDoor} className="me-2" />
          Keluar
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
