import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilWarning } from '@coreui/icons'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const toaster = useRef()
  const [toast, addToast] = useState(0)
  const submitHandler = () => {
    if (password === 'Password123') {
      switch (username) {
        case 'admin_pbb':
          localStorage.setItem('username', username)
          localStorage.setItem('fullname', 'Admin PBB')
          localStorage.setItem('isLoggedIn', true)
          navigate('/dashboard')
          break
        case 'admin_Reklame':
          localStorage.setItem('username', username)
          localStorage.setItem('fullname', 'Admin Reklame')
          localStorage.setItem('isLoggedIn', true)
          navigate('/dashboard')
          break
        case 'admin_air_tanah':
          localStorage.setItem('username', username)
          localStorage.setItem('fullname', 'Admin Air Tanah')
          localStorage.setItem('isLoggedIn', true)
          navigate('/dashboard')
          break
        case 'admin_hiburan':
          localStorage.setItem('username', username)
          localStorage.setItem('fullname', 'Admin Hiburan')
          localStorage.setItem('isLoggedIn', true)
          navigate('/dashboard')
          break
        case 'admin_penerangan_jalan':
          localStorage.setItem('username', username)
          localStorage.setItem('fullname', 'Admin Penerangan Jalan')
          localStorage.setItem('isLoggedIn', true)
          navigate('/dashboard')
          break
        case 'admin_satpol_pp':
          localStorage.setItem('username', username)
          localStorage.setItem('fullname', 'Admin Satpol PP')
          localStorage.setItem('isLoggedIn', true)
          navigate('/dashboard')
          break
        default:
          const errorToast = (
            <CToast title="Terjadi kesalahan">
              <CToastHeader color="danger" closeButton>
                <CIcon className="rounded me-2" icon={cilWarning} />
                <strong className="me-auto">Terjadi kesalahan</strong>
              </CToastHeader>
              <CToastBody>Username atau Password anda salah. Silahkan cek kembali.</CToastBody>
            </CToast>
          )
          addToast(errorToast)
          break
      }
    } else {
      const errorToast = (
        <CToast title="Terjadi kesalahan">
          <CToastHeader color="danger" closeButton>
            <CIcon className="rounded me-2" icon={cilWarning} />
            <strong className="me-auto">Terjadi kesalahan</strong>
          </CToastHeader>
          <CToastBody>Username atau Password anda salah. Silahkan cek kembali.</CToastBody>
        </CToast>
      )
      addToast(errorToast)
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Masuk menggunakan akun anda</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Masukkan username anda..."
                        autoComplete="username"
                        onChange={(e) => {
                          setUsername(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Masukkan password anda..."
                        autoComplete="current-password"
                        onChange={(e) => {
                          setPassword(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="danger"
                          className="px-4 text-white"
                          onClick={() => {
                            submitHandler()
                          }}
                        >
                          Masuk
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
