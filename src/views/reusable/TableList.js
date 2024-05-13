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
import { cilWarning, cilSearch, cilFilter, cilX, cilCloudDownload, cilCheck } from '@coreui/icons'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import axios from 'axios'
import _ from 'lodash'
import { format } from 'date-fns'
import CurrencyFormat from 'react-currency-format'
import { DateRangePicker } from 'react-date-range'
import CsvDownloader from 'react-csv-downloader'

export default function TableList({ jenisPajak, icon }) {
  const [load, setLoad] = useState(true)
  const [reklame, setReklame] = useState([])
  const [toast, addToast] = useState(0)
  const [modal, setModal] = useState(false)
  const [ketetapan, setKetetapan] = useState([])
  const [statusFilter, setStatusFilter] = useState('Semua Data')
  const [npwpdFilter, setNpwpdFilter] = useState('')
  const [countSudahBayar, setCountSudahBayar] = useState(0)
  const [countBelumBayar, setCountBelumBayar] = useState(0)
  const [countIzinKadaluarsa, setCountIzinKadaluarsa] = useState(0)
  const toaster = useRef()
  const today = new Date()
  const [selectionRange, setSelectionRange] = useState([
    {
      startDate: today,
      endDate: today,
      key: 'selection',
    },
  ])
  const [reset, setReset] = useState(true)
  const headers = {
    headers: {
      Authorization:
        'CTL1-VENDOR-APP App=integrasi-bangli,Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.q_VDxCnmfRVta1byY2S-237lnWKTwpfAd8LID70Ls_o',
    },
  }

  function fetchData(status, npwpd, date) {
    setLoad(true)
    let query =
      'https://maiharta.ddns.net:3100/http://36.88.117.202:3005/api/web/fiskus/pad/kominfo/v_profile_ketetapan'
    axios
      .get(query, headers)
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
                      } else {
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
                          status: ket.statusPembayaran,
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
                    } else {
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
                        status: ket.statusPembayaran,
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
                    } else {
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
                        status: ket.statusPembayaran,
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
                  } else {
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
                      status: ket.statusPembayaran,
                    }
                    return data.push(singular)
                  }
                }
              }
            })
          } else {
            singular = {
              nomor: 'N/A',
              npwpd: rek.npwpd,
              npwpdLama: rek.npwpdLama,
              jenis_reklame: rek.namaJenisPajakUsaha,
              lokasi_pemasangan: rek.alamatObjekPajak,
              nama_wajib_pajak: rek.namaUsaha,
              nominal: 0,
              tanggal_jatuh_tempo: 'N/A',
              periode: 'N/A',
              status: 'Belum Lunas',
            }
            return data.push(singular)
          }
        })
        if (status !== 'Semua Data') {
          setReklame(_.filter(data, { status: status }))
        } else {
          setReklame(data)
        }
        const belumBayar = _.filter(data, { status: 'Belum Lunas' })
        const sudahBayar = _.filter(data, { status: 'Sudah Lunas' })
        const izinKadaluarsa = _.filter(data, { status: 'Ijin Kadaluarsa' })
        setCountBelumBayar(belumBayar.length)
        setCountSudahBayar(sudahBayar.length)
        setCountIzinKadaluarsa(izinKadaluarsa.length)
        inpStart.setDate(inpStart.getDate() + 1)
        inpEnd.setDate(inpEnd.getDate() - 1)
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

  const tableContents = (tableData, setKetetapan, modal, setModal) => {
    if (load === true) {
      return (
        <>
          <CTableRow v-for="item in tableItems" key="load">
            <CTableDataCell></CTableDataCell>
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
            <CTableDataCell></CTableDataCell>
            {/* <CTableDataCell></CTableDataCell> */}
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
              <div>{item.npwpd}</div>
              {item.npwpdLama ? (
                <div className="small text-medium-emphasis">
                  NPWPD Lama: <span>{item.npwpdLama}</span>
                </div>
              ) : (
                ''
              )}
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.jenis_reklame}</div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.lokasi_pemasangan}</div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.nama_wajib_pajak}</div>
            </CTableDataCell>
            <CTableDataCell>
              <CurrencyFormat
                value={item.nominal}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp '}
              />
            </CTableDataCell>
            <CTableDataCell>
              {item.tanggal_jatuh_tempo !== 'N/A' ? (
                <div>{format(new Date(item.tanggal_jatuh_tempo), 'dd MMMM yyyy')}</div>
              ) : (
                'N/A'
              )}
            </CTableDataCell>
            <CTableDataCell>
              {item.periode !== 'N/A' ? (
                <div>{format(new Date(item.periode[1]), 'dd MMMM yyyy')}</div>
              ) : (
                'N/A'
              )}
            </CTableDataCell>
            <CTableDataCell>
              <div>{badgeSelector(item.status)}</div>
            </CTableDataCell>
            {/* <CTableDataCell>
              <CButton
                color="primary"
                variant="outline"
                key={index}
                onClick={() => {
                  setKetetapan(item.ketetapan)
                  setModal(!modal)
                }}
              >
                Detail
              </CButton>
            </CTableDataCell> */}
          </CTableRow>
        ))
      } else {
        return (
          <>
            <CTableRow v-for="item in tableItems" key="none">
              <CTableDataCell></CTableDataCell>
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
        <CModal
          size="xl"
          alignment="center"
          scrollable
          visible={visible}
          onClose={() => setVisible(false)}
        >
          <CModalHeader>
            <CModalTitle>Ketetapan</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell>Tipe</CTableHeaderCell>
                  <CTableHeaderCell>Lokasi</CTableHeaderCell>
                  <CTableHeaderCell>Pokok Pajak</CTableHeaderCell>
                  <CTableHeaderCell>Periode</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {(() => {
                  if (data.length === 0) {
                    return (
                      <CTableRow v-for="item in tableItems">
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell>
                          <div className="m-5 text-center">
                            <div>No data</div>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell></CTableDataCell>
                      </CTableRow>
                    )
                  } else {
                    return data.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell>
                          <div>{item.tipe}</div>
                          <div className="small text-medium-emphasis">
                            Nomor: <span>{item.nomor}</span>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item.lokasi}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item.pokokPajak}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item.periode}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item.statusPembayaran}</div>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  }
                })()}
              </CTableBody>
            </CTable>
          </CModalBody>
        </CModal>
      </>
    )
  }

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

  return (
    <>
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
          <CCol xs={12} sm={3}>
            <CWidgetStatsF
              className="mb-3"
              icon={<CIcon width={24} icon={cilX} size="xl" />}
              title={jenisPajak + ' Belum Lunas'}
              value={countBelumBayar}
              color="danger"
            />
          </CCol>
          <CCol xs={12} sm={3}>
            <CWidgetStatsF
              className="mb-3"
              icon={<CIcon width={24} icon={cilWarning} size="xl" />}
              title={jenisPajak + ' Ijin Kadaluarsa'}
              value={countIzinKadaluarsa}
              color="warning"
            />
          </CCol>
          <CCol xs={12} sm={3}>
            <CWidgetStatsF
              className="mb-3"
              icon={<CIcon width={24} icon={cilCheck} size="xl" />}
              title={jenisPajak + ' Sudah Lunas'}
              value={countSudahBayar}
              color="success"
            />
          </CCol>
          <CCol xs={12} sm={3}>
            <CWidgetStatsF
              className="mb-3"
              icon={<CIcon width={24} icon={icon} size="xl" />}
              title={'Total ' + jenisPajak}
              value={countSudahBayar + countIzinKadaluarsa + countBelumBayar}
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
                <CCol sm={7} className="d-none d-md-block" style={{ marginBottom: '2vh' }}>
                  <CButtonGroup role="group">
                    <CDropdown variant="btn-group">
                      <CButton variant="outline" color="dark" disabled>
                        {(() => {
                          if (reset) {
                            return 'Periode: Semua Periode'
                          } else {
                            let strRet =
                              'Periode: ' +
                              format(new Date(selectionRange[0].startDate), 'dd MMMM yyyy') +
                              ' - ' +
                              format(new Date(selectionRange[0].endDate), 'dd MMMM yyyy')
                            return strRet
                          }
                        })()}
                      </CButton>
                      <CDropdownToggle variant="outline" color="secondary" split />
                      <CDropdownMenu>
                        <DateRangePicker
                          onChange={(item) => {
                            setReset(false)
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
                    <CButton
                      variant="outline"
                      color="danger"
                      onClick={() => {
                        setReset(false)
                        fetchData(statusFilter, npwpdFilter, false)
                      }}
                    >
                      Filter
                    </CButton>
                    <CButton
                      variant="outline"
                      color="dark"
                      onClick={() => {
                        setReset(true)
                        let empty = [
                          {
                            startDate: today,
                            endDate: today,
                            key: 'selection',
                          },
                        ]
                        setSelectionRange(empty)
                        fetchData(statusFilter, npwpdFilter, true)
                      }}
                    >
                      Reset
                    </CButton>
                  </CButtonGroup>
                </CCol>
                <CCol sm={5} className="d-none d-md-block">
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
                <br />
              </CRow>
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
                      <CDropdownItem
                        onClick={() => {
                          setStatusFilter('Ijin Kadaluarsa')
                          fetchData('Ijin Kadaluarsa', npwpdFilter)
                        }}
                      >
                        Ijin Kadaluarsa
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </CCol>
              </CRow>
              <br />
              <CTable align="middle" className="mb-0" hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Nomor</CTableHeaderCell>
                    <CTableHeaderCell>NPWPD</CTableHeaderCell>
                    <CTableHeaderCell>Jenis</CTableHeaderCell>
                    <CTableHeaderCell>Lokasi Pemasangan</CTableHeaderCell>
                    <CTableHeaderCell>Nama Wajib Pajak</CTableHeaderCell>
                    <CTableHeaderCell>Nominal</CTableHeaderCell>
                    <CTableHeaderCell>Tanggal Jatuh Tempo</CTableHeaderCell>
                    <CTableHeaderCell>Periode</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    {/* <CTableHeaderCell></CTableHeaderCell> */}
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableContents(reklame, ketetapan, setKetetapan, modal, setModal)}
                </CTableBody>
              </CTable>
            </CCardBody>
            {DetailModal(ketetapan, modal, setModal)}
          </CCard>
        </CRow>
      </CContainer>
    </>
  )
}

TableList.propTypes = {
  jenisPajak: PropTypes.string,
  icon: PropTypes.any,
}
