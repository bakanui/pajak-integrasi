import React, { useEffect, useState, useRef } from 'react'
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
  CForm,
  CFormLabel,
  CModalFooter,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilWarning,
  cilSearch,
  cilFilter,
  cilX,
  cilCloudDownload,
  cilCheck,
  cilAirplay,
} from '@coreui/icons'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import axios from 'axios'
import _ from 'lodash'
import { format } from 'date-fns'
import { Calendar } from 'react-date-range'
import CsvDownloader from 'react-csv-downloader'
import { id } from 'react-date-range/dist/locale'
import { Helmet } from 'react-helmet'
import { DateRangePicker } from 'react-date-range'

const PencabutanReklame = () => {
  const [id, setId] = useState(0)
  const [load, setLoad] = useState(true)
  const [reklame, setReklame] = useState([])
  const [toast, addToast] = useState(0)
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [file, setFile] = useState()
  const [image, setImage] = useState('')
  const [ketetapan, setKetetapan] = useState([])
  const [statusFilter, setStatusFilter] = useState('Akan Dicabut')
  const [npwpdFilter, setNpwpdFilter] = useState('')
  const toaster = useRef()
  const today = new Date()
  const [selectionRange, setSelectionRange] = useState([
    {
      startDate: today,
      endDate: today,
      key: 'selection',
    },
  ])
  const [date, setDate] = useState(today)
  const reset = true
  const jenisPajak = 'Reklame'

  function fetchData(status, npwpd, date) {
    setLoad(true)
    let query = 'https://maiharta.ddns.net:3098/reklame'
    axios
      .get(query)
      .then((res) => {
        setReklame(res.data)
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
          <CToast title="Terjadi kesalahan">
            <CToastHeader closeButton>
              <CIcon className="rounded me-2" icon={cilWarning} />
              <strong className="me-auto">Terjadi kesalahan</strong>
            </CToastHeader>
            <CToastBody>{message}</CToastBody>
          </CToast>
        )
        addToast(errorToast)
      })
  }

  useEffect(() => {
    fetchData(statusFilter, npwpdFilter, reset)
  }, [])

  const tableContents = (tableData, setKetetapan) => {
    if (load === true) {
      return (
        <>
          <CTableRow v-for="item in tableItems" key="load">
            <CTableDataCell></CTableDataCell>
            <CTableDataCell></CTableDataCell>
            <CTableDataCell></CTableDataCell>
            <CTableDataCell>
              <div className="m-5 text-center">
                <div className="spinner-border text-danger"></div>
              </div>
            </CTableDataCell>
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
              <div>{item.nama_wajib_pajak}</div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.jenis}</div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.lokasi_pemasangan}</div>
            </CTableDataCell>
            <CTableDataCell>
              {item.tanggal_rencana_dicopot !== 'N/A' ? (
                <div>{format(new Date(item.tanggal_rencana_dicopot), 'dd MMMM yyyy')}</div>
              ) : (
                'N/A'
              )}
            </CTableDataCell>
            <CTableDataCell>{badgeSelector(item.status)}</CTableDataCell>
            <CTableDataCell>
              {item.status !== 'Sudah Dicabut' ? (
                <CButton
                  className="text-white"
                  color="danger"
                  onClick={() => {
                    setId(item.id)
                    setModal2(!modal2)
                  }}
                >
                  Aksi
                </CButton>
              ) : (
                <CButton
                  className="text-white"
                  color="info"
                  onClick={() => {
                    setImage(item.url)
                    setModal(!modal)
                  }}
                >
                  Lihat
                </CButton>
              )}
            </CTableDataCell>
          </CTableRow>
        ))
      } else {
        return (
          <>
            <CTableRow v-for="item in tableItems" key="none">
              <CTableDataCell></CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>
                <div className="m-5 text-center">
                  <p>No data</p>
                </div>
              </CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell></CTableDataCell>
              {/* <CTableDataCell></CTableDataCell> */}
            </CTableRow>
          </>
        )
      }
    }
  }

  const DetailModal = (data, visible, setVisible) => {
    return (
      <>
        <CModal size="md" alignment="center" visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Ketetapan</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <CRow className="mb-3">
                <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                  Tanggal Akan Dicabut
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="email" id="inputEmail3" />
                </CCol>
              </CRow>
            </CForm>
          </CModalBody>
        </CModal>
      </>
    )
  }

  const updateHandler = () => {
    let formData = new FormData()
    formData.append('id', id)
    formData.append('status', 'Sudah Dicabut')
    formData.append('file', file)
    axios
      .post('http://maiharta.ddns.net:3100/http://maiharta.ddns.net:3098/upload', formData)
      .then((res) => {
        formData.append('url', res.url)
        axios
          .put('http://maiharta.ddns.net:3100/http://maiharta.ddns.net:3098/reklame', formData)
          .then(() => {
            setModal2(!modal2)
            fetchData(statusFilter, npwpdFilter, reset)
            const errorToast = (
              <CToast title="Berhasil">
                <CToastHeader color="success" closeButton>
                  <CIcon className="rounded me-2" icon={cilCheck} />
                  <strong className="me-auto">Aksi berhasil!</strong>
                </CToastHeader>
                <CToastBody>Data berhasil disimpan.</CToastBody>
              </CToast>
            )
            addToast(errorToast)
          })
      })
  }

  const badgeSelector = (status) => {
    switch (status) {
      case 'Ijin Kadaluarsa':
        return (
          <CBadge color="danger" shape="rounded-pill">
            Ijin Kadaluarsa
          </CBadge>
        )
      case 'Sudah Dicabut':
        return (
          <CBadge color="success" shape="rounded-pill">
            Sudah Dicabut
          </CBadge>
        )
      case 'Akan Dicabut':
        return (
          <CBadge color="info" shape="rounded-pill">
            Akan Dicabut
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

  return (
    <>
      <Helmet>
        <title>Jadwal Pencabutan Reklame | Aplikasi Pajak Terintegrasi Kabupaten Bangli</title>
      </Helmet>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CContainer>
        <CRow>
          <CCol className="titleHead">
            <h2>Jadwal Pencabutan Reklame</h2>
          </CCol>
        </CRow>
      </CContainer>
      <CContainer>
        <CRow>
          <CCard className="mb-4">
            <CCardBody>
              <div>
                <CRow>
                  <CCol sm={5} className="d-none d-md-block">
                    <CInputGroup>
                      <CFormInput
                        placeholder="Cari Nomor..."
                        className="mx-0"
                        onChange={(e) => {
                          setNpwpdFilter(e.target.value)
                        }}
                      />
                      <CButton
                        type="button"
                        color="secondary"
                        variant="outline"
                        onClick={() => {
                          fetchData(statusFilter, npwpdFilter)
                        }}
                      >
                        <CIcon icon={cilSearch}></CIcon>
                      </CButton>
                    </CInputGroup>
                  </CCol>
                  <CCol sm={7} className="d-none d-md-block">
                    <CsvDownloader
                      filename={(() => {
                        if (reset) {
                          let strRet = 'laporan_' + jenisPajak + '_' + 'semua'
                          return strRet
                        } else {
                          let strRet =
                            'laporan_' +
                            jenisPajak +
                            '_' +
                            format(new Date(selectionRange[0].startDate), 'ddMMyy') +
                            '-' +
                            format(new Date(selectionRange[0].endDate), 'ddMMyy')
                          return strRet
                        }
                      })()}
                      extension=".csv"
                      separator=";"
                      wrapColumnChar=""
                      columns={[
                        {
                          id: 'nomor',
                          displayName: 'Nomor ',
                        },
                        {
                          id: 'npwpd',
                          displayName: 'NPWPD',
                        },
                        {
                          id: 'jenis_reklame',
                          displayName: 'Jenis Objek',
                        },
                        {
                          id: 'lokasi_pemasangan',
                          displayName: 'Lokasi Pemasangan',
                        },
                        {
                          id: 'nama_wajib_pajak',
                          displayName: 'Nama Wajib Pajak',
                        },
                        {
                          id: 'nominal',
                          displayName: 'Nominal',
                        },
                        {
                          id: 'tanggal_jatuh_tempo',
                          displayName: 'Tanggal Jatuh Tempo',
                        },
                        {
                          id: 'periode',
                          displayName: 'Periode',
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
                </CRow>
                <CRow xs={{ cols: 'auto' }} className="mt-3 gap-2">
                  <CCol>
                    <CDropdown variant="btn-group">
                      <CButton variant="outline" color="dark" disabled>
                        {`${format(new Date(selectionRange[0].startDate), 'dd MMMM yyyy')} -
                      ${format(new Date(selectionRange[0].endDate), 'dd MMMM yyyy')}`}
                      </CButton>
                      <CDropdownToggle variant="outline" color="secondary" />
                      <CDropdownMenu>
                        <DateRangePicker
                          onChange={(item) => {
                            setSelectionRange([item.selection])
                          }}
                          showSelectionPreview={true}
                          showDateDisplay={true}
                          showMonthAndYearPickers={true}
                          showPreview={false}
                          moveRangeOnFirstSelection={false}
                          ranges={selectionRange}
                          direction="horizontal"
                        />
                      </CDropdownMenu>
                    </CDropdown>
                  </CCol>
                  <CCol className="px-0">
                    <CDropdown variant="btn-group">
                      <CButton variant="outline" color="dark" disabled>
                        <CIcon icon={cilFilter} /> {statusFilter}
                      </CButton>
                      <CDropdownToggle variant="outline" color="secondary" />
                      <CDropdownMenu>
                        {['Ijin Kedaluarsa', 'Ijin Dicabut', 'Akan Dicabut', 'Sudah Dicabut'].map(
                          (status) => (
                            <CDropdownItem key={status} onClick={() => setStatusFilter(status)}>
                              {status}
                            </CDropdownItem>
                          ),
                        )}
                      </CDropdownMenu>
                    </CDropdown>
                  </CCol>
                </CRow>
              </div>
              <br />
              <CTable align="middle" className="mb-0" hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Nomor</CTableHeaderCell>
                    <CTableHeaderCell>Nama Wajib Pajak</CTableHeaderCell>
                    <CTableHeaderCell>Jenis</CTableHeaderCell>
                    <CTableHeaderCell>Lokasi Pemasangan</CTableHeaderCell>
                    <CTableHeaderCell>Tanggal Pencabutan</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>{tableContents(reklame, ketetapan, setKetetapan)}</CTableBody>
              </CTable>
            </CCardBody>
            <CModal visible={modal2} onClose={() => setModal2(false)}>
              <CModalHeader>
                <CModalTitle>Sudah Dicabut</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="inputEmail3" className="col-sm-5 col-form-label">
                      Foto Bukti Pencabutan
                    </CFormLabel>
                    <CCol sm={7}>
                      <CInputGroup className="mb-3">
                        <CFormInput
                          type="file"
                          id="inputGroupFile02"
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                </CForm>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setModal2(false)}>
                  Batalkan
                </CButton>
                <CButton color="primary" onClick={() => updateHandler()}>
                  Unggah Foto
                </CButton>
              </CModalFooter>
            </CModal>
            <CModal visible={modal} onClose={() => setModal(false)}>
              <CModalHeader>
                <CModalTitle>Bukti Pencabutan</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CContainer>
                  <img style={{ width: '100%' }} src={image} />
                </CContainer>
              </CModalBody>
            </CModal>
          </CCard>
        </CRow>
      </CContainer>
    </>
  )
}

export default PencabutanReklame
