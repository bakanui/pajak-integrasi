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

const IzinHabis = () => {
  const [load, setLoad] = useState(true)
  const [reklame, setReklame] = useState([])
  const [toast, addToast] = useState(0)
  const [modal, setModal] = useState(false)
  const [ketetapan, setKetetapan] = useState([])
  const statusFilter = 'Ijin Kadaluarsa'
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
  //data
  const [nomor, setNomor] = useState('')
  const [jenis, setJenis] = useState('')
  const [lokasi_pemasangan, setLokasiPemasangan] = useState('')
  const [nama_wajib_pajak, setNamaWajibPajak] = useState('')

  function fetchData(status, npwpd, date) {
    setLoad(true)
    let query =
      'http://maiharta.ddns.net:3100/http://36.88.117.202:3005/api/web/fiskus/pad/kominfo/v_profile_ketetapan'
    axios
      .get(query)
      .then((res) => {
        let filter = { namaJenisPajak: 'Pajak ' + jenisPajak }
        if (npwpd !== '') {
          filter = { ...filter, npwpd: npwpd }
        }
        const reklames = _.filter(res.data.data, filter)
        let data = []
        const inpStart = selectionRange[0].startDate
        const inpEnd = selectionRange[0].endDate
        const start = new Date(inpStart.setDate(inpStart.getDate() - 1))
        const end = new Date(inpEnd.setDate(inpEnd.getDate() + 1))
        reklames.map((rek) => {
          let singular = {}
          if (rek.ketetapan.length !== 0) {
            rek.ketetapan.map((ket) => {
              if (ket.periode.includes(',')) {
                const multiPeriode = ket.periode.split(', ')
                for (var i = 0; i < multiPeriode; i++) {
                  const period = multiPeriode[i].split(' s/d ')
                  const [startDay, startMonth, startYear] = period[0].split('-')
                  const [endDay, endMonth, endYear] = period[1].split('-')
                  let awal = new Date(startYear + '-' + startMonth + '-' + startDay)
                  let akhir = new Date(endYear + '-' + endMonth + '-' + endDay)
                  const periode = [awal, akhir]
                  if (date === false) {
                    if (awal >= start && awal < end && akhir > start && akhir <= end) {
                      if (akhir < today) {
                        singular = {
                          nomor: ket.nomor,
                          npwpd: rek.npwpd,
                          npwpdLama: rek.npwpdLama,
                          jenis_reklame: rek.namaJenisPajakUsaha,
                          lokasi_pemasangan: ket.lokasi,
                          nama_wajib_pajak: rek.namaUsaha,
                          nominal: ket.pokokPajak,
                          tanggal_jatuh_tempo: ket.tanggalJatuhTempo,
                          periode: periode,
                          status: 'Ijin Kadaluarsa',
                        }
                        data.push(singular)
                      }
                    }
                  } else {
                    if (akhir < today) {
                      singular = {
                        nomor: ket.nomor,
                        npwpd: rek.npwpd,
                        npwpdLama: rek.npwpdLama,
                        jenis_reklame: rek.namaJenisPajakUsaha,
                        lokasi_pemasangan: ket.lokasi,
                        nama_wajib_pajak: rek.namaUsaha,
                        nominal: ket.pokokPajak,
                        tanggal_jatuh_tempo: ket.tanggalJatuhTempo,
                        periode: periode,
                        status: 'Ijin Kadaluarsa',
                      }
                      data.push(singular)
                    }
                  }
                }
              } else {
                const period = ket.periode.split(' s/d ')
                const [startDay, startMonth, startYear] = period[0].split('-')
                const [endDay, endMonth, endYear] = period[1].split('-')
                let awal = new Date(startYear + '-' + startMonth + '-' + startDay)
                let akhir = new Date(endYear + '-' + endMonth + '-' + endDay)
                const periode = [awal, akhir]
                if (date === false) {
                  if (awal >= start && awal < end && akhir > start && akhir <= end) {
                    if (akhir < today) {
                      singular = {
                        nomor: ket.nomor,
                        npwpd: rek.npwpd,
                        npwpdLama: rek.npwpdLama,
                        jenis_reklame: rek.namaJenisPajakUsaha,
                        lokasi_pemasangan: ket.lokasi,
                        nama_wajib_pajak: rek.namaUsaha,
                        nominal: ket.pokokPajak,
                        tanggal_jatuh_tempo: ket.tanggalJatuhTempo,
                        periode: periode,
                        status: 'Ijin Kadaluarsa',
                      }
                      return data.push(singular)
                    }
                  }
                } else {
                  if (akhir < today) {
                    singular = {
                      nomor: ket.nomor,
                      npwpd: rek.npwpd,
                      npwpdLama: rek.npwpdLama,
                      jenis_reklame: rek.namaJenisPajakUsaha,
                      lokasi_pemasangan: ket.lokasi,
                      nama_wajib_pajak: rek.namaUsaha,
                      nominal: ket.pokokPajak,
                      tanggal_jatuh_tempo: ket.tanggalJatuhTempo,
                      periode: periode,
                      status: 'Ijin Kadaluarsa',
                    }
                    return data.push(singular)
                  }
                }
              }
            })
          }
        })
        const kadaluarsa = _.filter(data, { status: status })
        setReklame(kadaluarsa)
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
            <CToastHeader color="danger" closeButton>
              <CIcon className="rounded me-2" icon={cilWarning} />
              <strong className="me-auto">Terjadi kesalahan</strong>
            </CToastHeader>
            <CToastBody>{message}</CToastBody>
          </CToast>
        )
        addToast(errorToast)
      })
  }

  const submitHandler = () => {
    let formData = new FormData()
    formData.append('nomor', nomor)
    formData.append('jenis', jenis)
    formData.append('lokasi_pemasangan', lokasi_pemasangan)
    formData.append('nama_wajib_pajak', nama_wajib_pajak)
    formData.append('tanggal_rencana_dicopot', date)
    formData.append('status', 'Akan Dicabut')
    axios
      .post('http://maiharta.ddns.net:3100/http://maiharta.ddns.net:3098/reklame', formData)
      .then(() => {
        setModal(!modal)
        const errorToast = (
          <CToast title="Berhasil">
            <CToastHeader color="success" closeButton>
              <CIcon className="rounded me-2" icon={cilWarning} />
              <strong className="me-auto">Aksi berhasil!</strong>
            </CToastHeader>
            <CToastBody>Data berhasil disimpan.</CToastBody>
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
              <div className="small text-medium-emphasis">
                NPWPD: <span>{item.npwpd}</span>
              </div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.jenis_reklame}</div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.lokasi_pemasangan}</div>
            </CTableDataCell>
            <CTableDataCell>
              {item.tanggal_jatuh_tempo !== 'N/A' ? (
                <div>{format(new Date(item.tanggal_jatuh_tempo), 'dd MMMM yyyy')}</div>
              ) : (
                'N/A'
              )}
            </CTableDataCell>
            <CTableDataCell>{badgeSelector('Ijin Kadaluarsa')}</CTableDataCell>
            <CTableDataCell>
              <CButton
                className="text-white"
                color="danger"
                onClick={() => {
                  setModal(!modal)
                  setNomor(item.nomor)
                  setNamaWajibPajak(item.nama_wajib_pajak)
                  setJenis(item.jenis_reklame)
                  setLokasiPemasangan(item.lokasi_pemasangan)
                }}
              >
                Aksi
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
        <title>Reklame Izin Habis | Aplikasi Pajak Terintegrasi Kabupaten Bangli</title>
      </Helmet>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CContainer>
        <CRow>
          <CCol className="titleHead">
            <h2>{jenisPajak} dengan Izin Habis</h2>
          </CCol>
        </CRow>
      </CContainer>
      <CContainer>
        <CRow>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={5} className="d-none d-md-block">
                  <CInputGroup>
                    <CFormInput
                      placeholder="Cari NPWPD..."
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
              <br />
              <CTable align="middle" className="mb-0" hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Nomor</CTableHeaderCell>
                    <CTableHeaderCell>Nama Wajib Pajak</CTableHeaderCell>
                    <CTableHeaderCell>Jenis</CTableHeaderCell>
                    <CTableHeaderCell>Lokasi Pemasangan</CTableHeaderCell>
                    <CTableHeaderCell>Tanggal Jatuh Tempo</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>{tableContents(reklame, ketetapan, setKetetapan)}</CTableBody>
              </CTable>
            </CCardBody>
            {/* {DetailModal(modal, setModal)} */}
            <CModal visible={modal} onClose={() => setModal(false)}>
              <CModalHeader>
                <CModalTitle>Akan Dicabut</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="inputEmail3" className="col-sm-5 col-form-label">
                      Tanggal Akan Dicabut
                    </CFormLabel>
                    <CCol sm={7}>
                      <CDropdown variant="btn-group">
                        <CButton variant="outline" color="dark" disabled>
                          {format(new Date(date), 'dd MMMM yyyy')}
                        </CButton>
                        <CDropdownToggle variant="outline" color="secondary" />
                        <CDropdownMenu>
                          <Calendar onChange={(item) => setDate(item)} locale={id} date={date} />
                        </CDropdownMenu>
                      </CDropdown>
                    </CCol>
                  </CRow>
                </CForm>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setModal(false)}>
                  Batalkan
                </CButton>
                <CButton className="text-white" color="danger" onClick={() => submitHandler()}>
                  Simpan tanggal
                </CButton>
              </CModalFooter>
            </CModal>
          </CCard>
        </CRow>
      </CContainer>
    </>
  )
}

export default IzinHabis
