import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CBadge,
  CFormInput,
  CInputGroup,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CContainer,
  CWidgetStatsF,
  CButtonGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilWarning,
  cilSearch,
  cilFilter,
  cilX,
  cilCloudDownload,
  cilCheck,
  cilGlobeAlt,
} from '@coreui/icons'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import axios from 'axios'
import _ from 'lodash'
import { format } from 'date-fns'
import CurrencyFormat from 'react-currency-format'
import { DateRangePicker } from 'react-date-range'
import CsvDownloader from 'react-csv-downloader'
import { Helmet } from 'react-helmet'

const PBB = () => {
  const jenisPajak = 'Bumi & Bangunan'
  const [nop, setNop] = useState('')
  const [load, setLoad] = useState(true)
  const [nopFilter, setNopFilter] = useState('')
  const [reklame, setReklame] = useState([])
  const [toast, addToast] = useState(0)
  const [modal, setModal] = useState(false)
  const [ketetapan, setKetetapan] = useState([])
  const [statusFilter, setStatusFilter] = useState('Semua Data')
  const [npwpdFilter, setNpwpdFilter] = useState('')
  const [countSudahBayar, setCountSudahBayar] = useState(0)
  const [countBelumBayar, setCountBelumBayar] = useState(0)
  const toaster = useRef()

  const badgeSelector = (status) => {
    switch (status) {
      case 'Belum Lunas':
        return (
          <CBadge color="danger" shape="rounded-pill">
            Belum Lunas
          </CBadge>
        )
      case 'Sudah Lunas':
        return (
          <CBadge color="success" shape="rounded-pill">
            Sudah Lunas
          </CBadge>
        )
      case 'Ijin Kadaluarsa':
        return (
          <CBadge color="warning" shape="rounded-pill">
            Ijin Kadaluarsa
          </CBadge>
        )
      default:
        return (
          <CBadge color="secondary" shape="rounded-pill">
            {status}
          </CBadge>
        )
    }
  }

  function fetchData(nop) {
    setLoad(true)
    let query =
      'http://maiharta.ddns.net:3100/http://36.88.117.202:40200/revenue/tax/property/report/penerimaan/reportevaluasipenerimaan'
    const headers = {
      headers: {
        'cti-auth-token':
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJ1aWQiOjMsImlhdCI6MTY0Njg4Njc4N30.VoRRzR27SJTle5YgJO53K-PGwddGAZaNKdeF40NswljDnSXQ3W8YYMh4EPfRmT_nFV4yZr1dn00gxAMJTQkoqXEHhzyk0k2Wqhb2AGkedeWwIuGYCw8UJ0-2Lf_nSWimwNUR0-ZRfaIHoWcI85oKj2dTHQ73eTTkr_CjQdqDXf9P3ylWeJj00tpcRg_iWzbejZ9dNRY62qwk47bZkOZms087_0xQi9N653WAlQmCnF-oZTRAruMTDm0CjN3zqUj_yW4DkNBpsIrrADyQn-Z49kbxIKfQjZjUaKMLor6ECnadme5EB8W8mK04Hx2EMY4-IN4ceKRY1VRMCU4ho17uKA',
      },
    }
    const data = {
      98010284: '51',
      98010225: '06',
      98011120: '2022',
      98011267: '1',
      98011268: '10000',
      98011244: '01/11/2022 00:00:00 +0000',
      98011245: '01/12/2022 00:00:00 +0000',
    }
    axios
      .post(query, data, headers)
      .then((res) => {
        let ultimate = []
        res.data.data.map((r, index) => {
          let singular = {}
          singular = {
            nomor: index + 1,
            nop: r.nop,
            nmKecamatan: r.nmKecamatan,
            nmKelurahan: r.nmKelurahan,
            pbbYgHrsDibayarSppt: r.pbbYgHrsDibayarSppt,
          }
          if (r.pbbYgHrsDibayarSppt > 0) {
            singular = { ...singular, status: 'Belum Lunas' }
          } else {
            singular = { ...singular, status: 'Sudah Lunas' }
          }
          return ultimate.push(singular)
        })
        setReklame(ultimate)
        setLoad(false)
      })
      .catch((error) => {
        setLoad(false)
        const message = ''
        switch (error.message) {
          case 'Network error':
            message = 'Terjadi kesalahan pada jaringan. Silahkan cek koneksi anda.'
          default:
            message = 'Terjadi kesalahan tidak terduga. Silahkan hubungi Super Admin.'
        }
        const errorToast = (
          <CToast title="An error has occurred">
            <CToastHeader closeButton>
              <CIcon className="rounded me-2" icon={cilWarning} />
              <strong className="me-auto">An error has occurred</strong>
            </CToastHeader>
            <CToastBody>{message}</CToastBody>
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
            <CTableDataCell></CTableDataCell>
            <CTableDataCell></CTableDataCell>
          </CTableRow>
        </>
      )
    } else {
      if (tableData.length !== 0) {
        return tableData.map((item, index) => (
          <CTableRow v-for="item in tableItems" key={index}>
            <CTableDataCell>
              <div>{item.nomor}</div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.nop}</div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.nmKelurahan}</div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.nmKecamatan}</div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.pbbYgHrsDibayarSppt}</div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{badgeSelector(item.status)}</div>
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
              <CTableDataCell></CTableDataCell>
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
        <title>Bumi & Bangunan | Aplikasi Pajak Terintegrasi Kabupaten Bangli</title>
      </Helmet>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CContainer>
        <CRow>
          <CCol className="titleHead">
            <h2>Pajak {jenisPajak}</h2>
          </CCol>
        </CRow>
      </CContainer>
      <CContainer>
        <CRow>
          <CCol xs={12} sm={4}>
            <CWidgetStatsF
              className="mb-3"
              icon={<CIcon width={24} icon={cilX} size="xl" />}
              title={jenisPajak + ' Belum Lunas'}
              value={countBelumBayar}
              color="danger"
            />
          </CCol>
          <CCol xs={12} sm={4}>
            <CWidgetStatsF
              className="mb-3"
              icon={<CIcon width={24} icon={cilCheck} size="xl" />}
              title={jenisPajak + ' Sudah Lunas'}
              value={countSudahBayar}
              color="success"
            />
          </CCol>
          <CCol xs={12} sm={4}>
            <CWidgetStatsF
              className="mb-3"
              icon={<CIcon width={24} icon={cilGlobeAlt} size="xl" />}
              title={'Total ' + jenisPajak}
              value={countSudahBayar + countBelumBayar}
              color="primary"
            />
          </CCol>
        </CRow>
      </CContainer>
      <CContainer>
        <CRow>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={7} className="d-none d-md-block" style={{ marginBottom: '2vh' }}></CCol>
                <CCol sm={5} className="d-none d-md-block" style={{ marginBottom: '2vh' }}>
                  <CsvDownloader
                    filename={(() => {
                      let strRet = 'laporan_' + jenisPajak + '_' + 'semua'
                      return strRet
                    })()}
                    extension=".csv"
                    separator=";"
                    wrapColumnChar=""
                    columns={[
                      {
                        id: 'nomor',
                        displayName: 'No.',
                      },
                      {
                        id: 'nop',
                        displayName: 'NOP',
                      },
                      {
                        id: 'nmKelurahan',
                        displayName: 'Kelurahan',
                      },
                      {
                        id: 'nmKecamatan',
                        displayName: 'Kecamatan',
                      },
                      {
                        id: 'pbbYgHrsDibayarSppt',
                        displayName: 'Nominal Bayar',
                      },
                      {
                        id: 'status',
                        displayName: 'Status',
                      },
                    ]}
                    datas={reklame}
                  >
                    <CButton color="danger" className="float-end me-3 text-white">
                      <CIcon className="text-white" icon={cilCloudDownload} /> Unduh Laporan
                    </CButton>
                  </CsvDownloader>
                </CCol>
                <br />
              </CRow>
              <CRow>
                <CCol sm={5} className="d-none d-md-block">
                  <CInputGroup>
                    <CFormInput
                      placeholder="Cari NOP..."
                      className="mx-0"
                      onChange={(e) => {
                        setNopFilter(e.target.value)
                      }}
                    />
                    <CButton
                      type="button"
                      color="secondary"
                      variant="outline"
                      onClick={() => {
                        fetchData(statusFilter, nopFilter)
                      }}
                    >
                      <CIcon icon={cilSearch}></CIcon>
                    </CButton>
                  </CInputGroup>
                </CCol>
                <CCol sm={7} className="d-none d-md-block">
                  <CDropdown className="float-end me-3" variant="btn-group">
                    <CButton variant="outline" color="primary">
                      <CIcon icon={cilFilter} /> {statusFilter}
                    </CButton>
                    <CDropdownToggle variant="outline" color="primary" split />
                    <CDropdownMenu>
                      <CDropdownItem
                        onClick={() => {
                          setStatusFilter('Semua Data')
                          fetchData('Semua Data', npwpdFilter)
                        }}
                      >
                        Semua Data
                      </CDropdownItem>
                      <CDropdownItem
                        onClick={() => {
                          setStatusFilter('Belum Lunas')
                          fetchData('Belum Lunas', npwpdFilter)
                        }}
                      >
                        Belum Lunas
                      </CDropdownItem>
                      <CDropdownItem
                        onClick={() => {
                          setStatusFilter('Sudah Lunas')
                          fetchData('Sudah Lunas', npwpdFilter)
                        }}
                      >
                        Sudah Lunas
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </CCol>
              </CRow>
              <br />
              <CTable align="middle" className="mb-0" hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>No.</CTableHeaderCell>
                    <CTableHeaderCell>NOP</CTableHeaderCell>
                    <CTableHeaderCell>Kelurahan</CTableHeaderCell>
                    <CTableHeaderCell>Kecamatan</CTableHeaderCell>
                    <CTableHeaderCell>Nominal Bayar</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableContents(reklame, ketetapan, setKetetapan, modal, setModal)}
                </CTableBody>
              </CTable>
            </CCardBody>
            {/* {DetailModal(ketetapan, modal, setModal)} */}
          </CCard>
        </CRow>
      </CContainer>
    </>
  )
}

export default PBB
