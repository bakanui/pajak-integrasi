import React, { useEffect, useState, useRef } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CButtonGroup,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CToast,
  CToaster,
  CToastBody,
  CToastHeader,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilWarning } from '@coreui/icons'
import { format } from 'date-fns'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import axios from 'axios'
import { Helmet } from 'react-helmet'

const PBB = () => {
  const [nop, setNop] = useState('510601000100100010')
  const [load, setLoad] = useState(true)
  const [toast, addToast] = useState(0)
  const toaster = useRef()

  function fetchData(nop, year) {
    setLoad(true)
    let query = 'http://36.94.200.157:40300/revenue/tax/property/510601000100100010/bill'
    // if (year) {
    //   query = query + '/' + year
    // }
    // let query = 'http://36.94.200.157:3005/api/web/fiskus/pad/kominfo/v_profile_ketetapan'
    const headers = {
      headers: {
        Authorization:
          'CTL1-VENDOR-APP App=integrasi-bangli,Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.q_VDxCnmfRVta1byY2S-237lnWKTwpfAd8LID70Ls_o',
      },
    }
    axios
      .get(query, headers)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        setLoad(false)
        console.log(error.message)
        const errorToast = (
          <CToast title="An error has occurred">
            <CToastHeader closeButton>
              <CIcon className="rounded me-2" icon={cilWarning} />
              <strong className="me-auto">An error has occurred</strong>
            </CToastHeader>
            <CToastBody>{error.message}</CToastBody>
          </CToast>
        )
        addToast(errorToast)
      })
  }

  useEffect(() => {
    fetchData(nop)
  }, [])

  const tableContents = (tableData, passengers, setPassengers, modal, setModal) => {
    if (load === true) {
      return (
        <>
          <CTableRow v-for="item in tableItems" key="load">
            <CTableDataCell></CTableDataCell>
            <CTableDataCell></CTableDataCell>
            <CTableDataCell>
              <div className="m-5 text-center">
                <div className="spinner-border text-danger"></div>
              </div>
            </CTableDataCell>
            <CTableDataCell></CTableDataCell>
          </CTableRow>
        </>
      )
    } else {
      if (tableData.length !== 0) {
        return tableData.map((item, index) => (
          <CTableRow v-for="item in tableItems" key={index}>
            <CTableDataCell>
              <div>{item.ShipName !== '' ? item.ShipName : 'Unnamed Ship'}</div>
              <div className="small text-medium-emphasis">
                ID: <span>{item.ScheduleID}</span> | {item.CompanyName}
              </div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.Departure}</div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.Destination}</div>
            </CTableDataCell>
            <CTableDataCell>
              <div>
                {(() => {
                  let departTime = new Date(item.DepartureDate + ' ' + item.DepartureTime)
                  let formattedTime =
                    format(new Date(departTime), 'EEEE, dd MMMM yyyy HH:mm') + ' WITA'
                  return formattedTime
                })()}
              </div>
            </CTableDataCell>
            <CTableDataCell>
              <CButton
                color="primary"
                variant="outline"
                key={index}
                onClick={() => {
                  setModal(!modal)
                  setPassengers(item.Passengers)
                }}
              >
                Passenger List
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))
      } else {
        return (
          <>
            <CTableRow v-for="item in tableItems" key="none">
              <CTableDataCell></CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>
                <div className="m-5 text-center">
                  <p>No data</p>
                </div>
              </CTableDataCell>
              <CTableDataCell></CTableDataCell>
            </CTableRow>
          </>
        )
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Air Tanah | Penerimaan Pendapatan Asli Daerah Kabupaten Bangli</title>
      </Helmet>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Tagihan PBB
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-end me-3">
                <CButton color="primary" className="mx-0">
                  Filter
                </CButton>
                <CButton color="outline-secondary" className="mx-0">
                  Reset
                </CButton>
              </CButtonGroup>
            </CCol>
          </CRow>
          <br />
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>Ship</CTableHeaderCell>
                <CTableHeaderCell>Departure</CTableHeaderCell>
                <CTableHeaderCell>Destination</CTableHeaderCell>
                <CTableHeaderCell>Departure Time</CTableHeaderCell>
                <CTableHeaderCell></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {/* {tableContents(tableData, passengers, setPassengers, modal, setModal)} */}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default PBB
