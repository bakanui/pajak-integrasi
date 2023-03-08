import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import { CSpinner } from '@coreui/react'
import Protected from './Protected'

const loading = <CSpinner color="danger" />

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const isLoggedIn = localStorage.getItem('isLoggedIn')

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route
              path="*"
              element={
                <Protected isLoggedIn={isLoggedIn}>
                  <DefaultLayout />
                </Protected>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
