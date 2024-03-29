import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CRow,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
  CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCheckCircle, cilWarning } from '@coreui/icons'
import login from '../../../assets/images/Frame.png'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const toaster = useRef()
  const [toast, addToast] = useState(0)
  const errorToast = (
    <CToast title="Terjadi kesalahan">
      <CToastHeader color="danger" closeButton>
        <CIcon className="rounded me-2" icon={cilWarning} />
        <strong className="me-auto">Terjadi kesalahan</strong>
      </CToastHeader>
      <CToastBody>Username atau Password anda salah. Silahkan cek kembali.</CToastBody>
    </CToast>
  )
  const successToast = (
    <CToast title="Login berhasil">
      <CToastHeader color="success" closeButton>
        <CIcon className="rounded me-2" icon={cilCheckCircle} />
        <strong className="me-auto">Login berhasil</strong>
      </CToastHeader>
      <CToastBody>Authentikasi berhasil. Selamat datang.</CToastBody>
    </CToast>
  )
  const submitHandler = () => {
    if (password === 'Password123') {
      switch (username) {
        case 'admin_pbb':
          localStorage.setItem('username', username)
          localStorage.setItem('fullname', 'Admin PBB')
          localStorage.setItem('isLoggedIn', true)
          addToast(successToast)
          navigate('/')
          break
        case 'super_admin':
          localStorage.setItem('username', username)
          localStorage.setItem('fullname', 'Super Admin')
          localStorage.setItem('isLoggedIn', true)
          addToast(successToast)
          navigate('/')
          break
        case 'admin_reklame':
          localStorage.setItem('username', username)
          localStorage.setItem('fullname', 'Admin Reklame')
          localStorage.setItem('isLoggedIn', true)
          navigate('/')
          break
        case 'admin_air_tanah':
          localStorage.setItem('username', username)
          localStorage.setItem('fullname', 'Admin Air Tanah')
          localStorage.setItem('isLoggedIn', true)
          addToast(successToast)
          navigate('/')
          break
        case 'admin_hiburan':
          localStorage.setItem('username', username)
          localStorage.setItem('fullname', 'Admin Hiburan')
          localStorage.setItem('isLoggedIn', true)
          addToast(successToast)
          navigate('/')
          break
        case 'admin_penerangan_jalan':
          localStorage.setItem('username', username)
          localStorage.setItem('fullname', 'Admin Penerangan Jalan')
          localStorage.setItem('isLoggedIn', true)
          addToast(successToast)
          navigate('/')
          break
        case 'admin_satpol_pp':
          localStorage.setItem('username', username)
          localStorage.setItem('fullname', 'Admin Satpol PP')
          localStorage.setItem('isLoggedIn', true)
          addToast(successToast)
          navigate('/')
          break
        default:
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

  const isLoggedIn = localStorage.getItem('isLoggedIn')

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate('/dashboard')
    }
  })
  return (
    <div className="bg-login min-vh-100 d-flex flex-row align-items-center no-scroll">
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <div className="login no-scroll"></div>
      <CContainer>
        <CRow>
          <CCol className="upper-login center-it" md={6} style={{ zIndex: 2 }}>
            <h6 className="text-white">Selamat datang di</h6>
            <h3 className="text-white">Aplikasi Pajak Terintegrasi</h3>
            <h4 className="text-white">Kabupaten Bangli</h4>
            <img className="image-upper" src={login}></img>
          </CCol>
          <CCol md={6} className="login-right-side">
            <div className="p-4">
              <div>
                <CForm>
                  <h3 className="mb-5 center-it">Masuk ke akun Anda</h3>
                  <div className="mb-3">
                    <CFormLabel>Username</CFormLabel>
                    <CFormInput
                      // size="lg"
                      placeholder="Masukkan username Anda..."
                      autoComplete="username"
                      onChange={(e) => {
                        setUsername(e.target.value)
                      }}
                    />
                  </div>
                  <div className="mb-5">
                    <CFormLabel>Password</CFormLabel>
                    <CFormInput
                      // size="lg"
                      type="password"
                      placeholder="Masukkan password Anda..."
                      autoComplete="current-password"
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
                    />
                  </div>
                  <div>
                    <div className="d-grid">
                      <CButton
                        color="danger"
                        className="px-4 text-white"
                        onClick={() => {
                          submitHandler()
                          window.location.reload(false)
                        }}
                      >
                        Masuk
                      </CButton>
                    </div>
                  </div>
                </CForm>
              </div>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
