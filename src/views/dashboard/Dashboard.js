import React, { useEffect, useState, useRef } from 'react'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CContainer,
  CCardText,
  CCardTitle,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilWarning,
  cilSettings,
  cilAirplay,
  cilDrop,
  cilRoom,
  cilLightbulb,
  cilGlobeAlt,
} from '@coreui/icons'
import axios from 'axios'
import _ from 'lodash'
import { format } from 'date-fns'
import CurrencyFormat from 'react-currency-format'
import { Helmet } from 'react-helmet'
import { DateRangePicker } from 'react-date-range'
import Reklame from '../../assets/images/reklame.png'
import Semua from '../../assets/images/semua.png'
import Air from '../../assets/images/akar-icons_water.png'
import Hiburan from '../../assets/images/bx_party.png'
import Penerangan from '../../assets/images/mdi_coach-lamp.png'
import Bumi from '../../assets/images/bx_building-house.png'

const Dashboard = () => {
  const [kadalFilter, setKadalFilter] = useState('Akan Kadaluarsa')
  const [akanKadaluarsa, setAkanKadaluarsa] = useState([])
  const [sudahKadaluarsa, setSudahKadaluarsa] = useState([])
  const [load, setLoad] = useState(true)
  const toaster = useRef()
  const today = new Date()
  const oneMonthAgo = new Date(today)
  const [selectionRange, setSelectionRange] = useState([
    {
      startDate: new Date(oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 2)),
      endDate: today,
      key: 'selection',
    },
  ])
  const [reset, setReset] = useState(true)
  const [toast, addToast] = useState(0)
  //Semua
  const [semuaTarget, setSemuaTarget] = useState(0)
  const [semuaRealisasi, setSemuaRealisasi] = useState(0)
  const [semuaSisaTarget, setSemuaSisaTarget] = useState(0)
  const [semuaRealisasiHariIni, setSemuaRealisasiHariIni] = useState(0)
  //Reklame
  const [reklameTarget, setReklameTarget] = useState(0)
  const [reklameRealisasi, setReklameRealisasi] = useState(0)
  const [reklameSisaTarget, setReklameSisaTarget] = useState(0)
  const [reklameRealisasiHariIni, setReklameRealisasiHariIni] = useState(0)
  //Air Tanah
  const [airTanahTarget, setAirTanahTarget] = useState(0)
  const [airTanahRealisasi, setAirTanahRealisasi] = useState(0)
  const [airTanahSisaTarget, setAirTanahSisaTarget] = useState(0)
  const [airTanahRealisasiHariIni, setAirTanahRealisasiHariIni] = useState(0)
  //Hiburan
  const [hiburanTarget, setHiburanTarget] = useState(0)
  const [hiburanRealisasi, setHiburanRealisasi] = useState(0)
  const [hiburanSisaTarget, setHiburanSisaTarget] = useState(0)
  const [hiburanRealisasiHariIni, setHiburanRealisasiHariIni] = useState(0)
  //Penerangan Jalan
  const [peneranganJalanTarget, setPeneranganJalanTarget] = useState(0)
  const [peneranganJalanRealisasi, setPeneranganJalanRealisasi] = useState(0)
  const [peneranganJalanSisaTarget, setPeneranganJalanSisaTarget] = useState(0)
  const [peneranganJalanRealisasiHariIni, setPeneranganJalanRealisasiHariIni] = useState(0)
  //PBB
  const [bumiTarget, setBumiTarget] = useState(0)
  const [bumiRealisasi, setBumiRealisasi] = useState(0)
  const [bumiSisaTarget, setBumiSisaTarget] = useState(0)
  const [bumiRealisasiHariIni, setBumiRealisasiHariIni] = useState(0)

  function fetchData() {
    setLoad(true)
    let query =
      'http://maiharta.ddns.net:3100/http://36.94.200.157:3005/api/web/fiskus/pad/kominfo/v_profile_ketetapan'
    axios
      .get(query)
      .then((res) => {
        // Reklame
        const data = _.filter(res.data.data)
        let dataRek = []
        let targetRek = 0
        let realisasiRek = 0
        let sisaTargetRek = 0
        let realisasiHariIniRek = 0
        const inpStart = selectionRange[0].startDate
        const inpEnd = selectionRange[0].endDate
        const start = new Date(inpStart.setDate(inpStart.getDate() - 1))
        const end = new Date(inpEnd.setDate(inpEnd.getDate() + 1))
        data.map((rek) => {
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
                  if (akhir < today) {
                    singular = {
                      nomor: ket.nomor,
                      npwpd: rek.npwpd,
                      npwpdLama: rek.npwpdLama,
                      jenis_reklame: rek.namaJenisPajakUsaha,
                      jenis: rek.namaJenisPajak,
                      lokasi_pemasangan: ket.lokasi,
                      nama_wajib_pajak: rek.namaUsaha,
                      nominal: ket.pokokPajak,
                      tanggal_jatuh_tempo: ket.tanggalJatuhTempo,
                      periode: periode,
                      status: 'Sudah Kadaluarsa',
                    }
                    dataRek.push(singular)
                  } else if (awal >= start && awal < end && akhir > start && akhir <= end) {
                    singular = {
                      nomor: ket.nomor,
                      npwpd: rek.npwpd,
                      npwpdLama: rek.npwpdLama,
                      jenis_reklame: rek.namaJenisPajakUsaha,
                      jenis: rek.namaJenisPajak,
                      lokasi_pemasangan: ket.lokasi,
                      nama_wajib_pajak: rek.namaUsaha,
                      nominal: ket.pokokPajak,
                      tanggal_jatuh_tempo: ket.tanggalJatuhTempo,
                      periode: periode,
                      status: 'Akan Kadaluarsa',
                    }
                    return dataRek.push(singular)
                  } else {
                    singular = {
                      nomor: ket.nomor,
                      npwpd: rek.npwpd,
                      npwpdLama: rek.npwpdLama,
                      jenis_reklame: rek.namaJenisPajakUsaha,
                      jenis: rek.namaJenisPajak,
                      lokasi_pemasangan: ket.lokasi,
                      nama_wajib_pajak: rek.namaUsaha,
                      nominal: ket.pokokPajak,
                      tanggal_jatuh_tempo: ket.tanggalJatuhTempo,
                      periode: periode,
                      status: ket.statusPembayaran,
                    }
                    return dataRek.push(singular)
                  }
                }
              } else {
                const period = ket.periode.split(' s/d ')
                const [startDay, startMonth, startYear] = period[0].split('-')
                const [endDay, endMonth, endYear] = period[1].split('-')
                let awal = new Date(startYear + '-' + startMonth + '-' + startDay)
                let akhir = new Date(endYear + '-' + endMonth + '-' + endDay)
                const periode = [awal, akhir]
                if (akhir < today) {
                  singular = {
                    nomor: ket.nomor,
                    npwpd: rek.npwpd,
                    npwpdLama: rek.npwpdLama,
                    jenis_reklame: rek.namaJenisPajakUsaha,
                    jenis: rek.namaJenisPajak,
                    lokasi_pemasangan: ket.lokasi,
                    nama_wajib_pajak: rek.namaUsaha,
                    nominal: ket.pokokPajak,
                    tanggal_jatuh_tempo: ket.tanggalJatuhTempo,
                    periode: periode,
                    status: 'Sudah Kadaluarsa',
                  }
                  return dataRek.push(singular)
                } else if (awal >= start && awal < end && akhir > start && akhir <= end) {
                  singular = {
                    nomor: ket.nomor,
                    npwpd: rek.npwpd,
                    npwpdLama: rek.npwpdLama,
                    jenis_reklame: rek.namaJenisPajakUsaha,
                    jenis: rek.namaJenisPajak,
                    lokasi_pemasangan: ket.lokasi,
                    nama_wajib_pajak: rek.namaUsaha,
                    nominal: ket.pokokPajak,
                    tanggal_jatuh_tempo: ket.tanggalJatuhTempo,
                    periode: periode,
                    status: 'Akan Kadaluarsa',
                  }
                  return dataRek.push(singular)
                } else {
                  singular = {
                    nomor: ket.nomor,
                    npwpd: rek.npwpd,
                    npwpdLama: rek.npwpdLama,
                    jenis_reklame: rek.namaJenisPajakUsaha,
                    jenis: rek.namaJenisPajak,
                    lokasi_pemasangan: ket.lokasi,
                    nama_wajib_pajak: rek.namaUsaha,
                    nominal: ket.pokokPajak,
                    tanggal_jatuh_tempo: ket.tanggalJatuhTempo,
                    periode: periode,
                    status: ket.statusPembayaran,
                  }
                  return dataRek.push(singular)
                }
              }
            })
          } else {
            singular = {
              nomor: 'N/A',
              npwpd: rek.npwpd,
              npwpdLama: rek.npwpdLama,
              jenis_reklame: rek.namaJenisPajakUsaha,
              jenis: rek.namaJenisPajak,
              lokasi_pemasangan: rek.alamatObjekPajak,
              nama_wajib_pajak: rek.namaUsaha,
              nominal: 0,
              tanggal_jatuh_tempo: 'N/A',
              periode: 'N/A',
              status: 'Belum Lunas',
            }
            return dataRek.push(singular)
          }
        })
        const akanKadal = _.filter(dataRek, { status: 'Akan Kadaluarsa' })
        const sudahKadal = _.filter(dataRek, { status: 'Sudah Kadaluarsa' })
        inpStart.setDate(inpStart.getDate() + 1)
        inpEnd.setDate(inpEnd.getDate() - 1)
        setAkanKadaluarsa(akanKadal)
        setSudahKadaluarsa(sudahKadal)
        //semua
        dataRek.map((d) => {
          targetRek = targetRek + d.nominal
          if (d.status !== 'Belum Lunas') {
            realisasiRek = realisasiRek + d.nominal
          }
          if (new Date(d.periode[1]) === today) {
            realisasiHariIniRek = realisasiHariIniRek + d.nominal
          }
        })
        sisaTargetRek = targetRek - realisasiRek
        setSemuaTarget(targetRek)
        setSemuaRealisasi(realisasiRek)
        setSemuaSisaTarget(sisaTargetRek)
        setSemuaRealisasiHariIni(realisasiHariIniRek)
        //reklame
        const dataReklame = _.filter(dataRek, { jenis: 'Pajak Reklame' })
        let targetRekl = 0
        let realisasiRekl = 0
        let sisaTargetRekl = 0
        let realisasiHariIniRekl = 0
        dataReklame.map((d) => {
          targetRekl = targetRekl + d.nominal
          if (d.status !== 'Belum Lunas') {
            realisasiRekl = realisasiRekl + d.nominal
          }
          if (new Date(d.periode[1]) === today) {
            realisasiHariIniRekl = realisasiHariIniRekl + d.nominal
          }
        })
        sisaTargetRekl = targetRekl - realisasiRekl
        setReklameTarget(targetRekl)
        setReklameRealisasi(realisasiRekl)
        setReklameSisaTarget(sisaTargetRekl)
        setReklameRealisasiHariIni(realisasiHariIniRekl)
        //air tanah
        const dataAirTanah = _.filter(dataRek, { jenis: 'Pajak Air Tanah' })
        let targetAir = 0
        let realisasiAir = 0
        let sisaTargetAir = 0
        let realisasiHariIniAir = 0
        dataAirTanah.map((d) => {
          targetAir = targetAir + d.nominal
          if (d.status !== 'Belum Lunas') {
            realisasiAir = realisasiAir + d.nominal
          }
          if (new Date(d.periode[1]) === today) {
            realisasiHariIniAir = realisasiHariIniAir + d.nominal
          }
        })
        sisaTargetAir = targetAir - realisasiAir
        setAirTanahTarget(targetAir)
        setAirTanahRealisasi(realisasiAir)
        setAirTanahSisaTarget(sisaTargetAir)
        setAirTanahRealisasiHariIni(realisasiHariIniAir)
        //hiburan
        const dataHiburan = _.filter(dataRek, { jenis: 'Pajak Hiburan' })
        let targetHiburan = 0
        let realisasiHiburan = 0
        let sisaTargetHiburan = 0
        let realisasiHariIniHiburan = 0
        dataHiburan.map((d) => {
          targetHiburan = targetHiburan + d.nominal
          if (d.status !== 'Belum Lunas') {
            realisasiHiburan = realisasiHiburan + d.nominal
          }
          if (new Date(d.periode[1]) === today) {
            realisasiHariIniHiburan = realisasiHariIniHiburan + d.nominal
          }
        })
        sisaTargetHiburan = targetHiburan - realisasiHiburan
        setHiburanTarget(targetHiburan)
        setHiburanRealisasi(realisasiHiburan)
        setHiburanSisaTarget(sisaTargetHiburan)
        setHiburanRealisasiHariIni(realisasiHariIniHiburan)
        //penerangan jalan
        const dataPeneranganJalan = _.filter(dataRek, { jenis: 'Pajak Penerangan Jalan' })
        let targetPeneranganJalan = 0
        let realisasiPeneranganJalan = 0
        let sisaTargetPeneranganJalan = 0
        let realisasiHariIniPeneranganJalan = 0
        dataPeneranganJalan.map((d) => {
          targetPeneranganJalan = targetPeneranganJalan + d.nominal
          if (d.status !== 'Belum Lunas') {
            realisasiPeneranganJalan = realisasiPeneranganJalan + d.nominal
          }
          if (new Date(d.periode[1]) === today) {
            realisasiHariIniPeneranganJalan = realisasiHariIniPeneranganJalan + d.nominal
          }
        })
        sisaTargetPeneranganJalan = targetPeneranganJalan - realisasiPeneranganJalan
        setPeneranganJalanTarget(targetPeneranganJalan)
        setPeneranganJalanRealisasi(realisasiPeneranganJalan)
        setPeneranganJalanSisaTarget(sisaTargetPeneranganJalan)
        setPeneranganJalanRealisasiHariIni(realisasiHariIniPeneranganJalan)
        setLoad(false)
      })
      .catch((error) => {
        setLoad(false)
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

  const tableContents = (tableData) => {
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
            </CTableRow>
          </>
        )
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Helmet>
        <title>Dashboard | Aplikasi Pajak Terintegrasi Kabupaten Bangli</title>
      </Helmet>
      <CContainer>
        <CRow>
          <CCol className="titleHead">
            <h2>Dashboard</h2>
          </CCol>
        </CRow>
      </CContainer>
      <CContainer>
        <CRow>
          {/* semua */}
          <CCol md={9}>
            <CCard className="mb-4 text-white" color="danger">
              <CCardBody>
                <CCardText>
                  <CRow>
                    <CCol>
                      <h4 id="traffic" className="card-title mb-4">
                        Laporan Target dan Realisasi
                      </h4>
                    </CCol>
                  </CRow>
                  <div className="row">
                    <div style={{ display: 'flex', justifyContent: 'center' }} className="col-sm-4">
                      <img src={Semua}></img>
                    </div>
                    <div className="col-sm-8">
                      <div className="row">
                        <div className="col-sm-6">
                          <p>Total Target</p>
                          <h2>
                            <CurrencyFormat
                              value={semuaTarget}
                              displayType={'text'}
                              thousandSeparator={true}
                              // prefix={'Rp '}
                            />
                          </h2>
                        </div>
                        <div className="col-sm-6">
                          <p>Realisasi</p>
                          <h2>
                            <CurrencyFormat
                              value={semuaRealisasi}
                              displayType={'text'}
                              thousandSeparator={true}
                              // prefix={'Rp '}
                            />
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8">
                      <div className="row">
                        <div className="col-sm-6">
                          <p>Sisa Target</p>
                          <h2>
                            <CurrencyFormat
                              value={semuaSisaTarget}
                              displayType={'text'}
                              thousandSeparator={true}
                              // prefix={'Rp '}
                            />
                          </h2>
                        </div>
                        <div className="col-sm-6">
                          <p>Realisasi Hari Ini</p>
                          <h2>
                            <CurrencyFormat
                              value={semuaRealisasiHariIni}
                              displayType={'text'}
                              thousandSeparator={true}
                              // prefix={'Rp '}
                            />
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
          {/* reklame */}
          <CCol md={3}>
            <CCard className="mb-4">
              <CCardHeader style={{ backgroundColor: '#FF7A00' }} className="go-left text-white">
                &nbsp;&nbsp;<img src={Reklame}></img>&nbsp;&nbsp;Pajak Reklame
              </CCardHeader>
              <CCardBody>
                {/* <CCardTitle className="text-center">
                  <CIcon icon={cilAirplay} height={52} className="my-4 text-black" />
                </CCardTitle> */}
                <CCardText>
                  <div className="bd-example">
                    <div className="row mb-3">
                      <h6 style={{ color: '#979797' }}>Target</h6>
                      <h5 style={{ color: '#097600' }}>
                        <CurrencyFormat
                          value={reklameTarget}
                          displayType={'text'}
                          thousandSeparator={true}
                          // prefix={'Rp '}
                        />
                      </h5>
                    </div>
                    <div className="row mb-3">
                      <h6 style={{ color: '#979797' }}>Realisasi</h6>
                      <h5 style={{ color: '#097600' }}>
                        <CurrencyFormat
                          value={reklameRealisasi}
                          displayType={'text'}
                          thousandSeparator={true}
                          // prefix={'Rp '}
                        />
                      </h5>
                    </div>
                    <div className="row mb-3">
                      <h6 style={{ color: '#979797' }}>Sisa Target</h6>
                      <h5 style={{ color: '#097600' }}>
                        <CurrencyFormat
                          value={reklameSisaTarget}
                          displayType={'text'}
                          thousandSeparator={true}
                          // prefix={'Rp '}
                        />
                      </h5>
                    </div>
                    <div className="row mb-3">
                      <h6 style={{ color: '#979797' }}>Realisasi Hari Ini</h6>
                      <h5 style={{ color: '#097600' }}>
                        <CurrencyFormat
                          value={reklameRealisasiHariIni}
                          displayType={'text'}
                          thousandSeparator={true}
                          // prefix={'Rp '}
                        />
                      </h5>
                    </div>
                  </div>
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CRow>
          {/* air tanah */}
          <CCol md={3}>
            <CCard className="mb-4">
              <CCardHeader style={{ backgroundColor: '#097600' }} className="go-left text-white">
                &nbsp;&nbsp;<img src={Air}></img>&nbsp;&nbsp;Pajak Air Tanah
              </CCardHeader>
              <CCardBody>
                {/* <CCardTitle className="text-center">
                  <CIcon icon={cilAirplay} height={52} className="my-4 text-black" />
                </CCardTitle> */}
                <CCardText>
                  <div className="bd-example">
                    <div className="row mb-3">
                      <h6 style={{ color: '#979797' }}>Target</h6>
                      <h5 style={{ color: '#097600' }}>
                        <CurrencyFormat
                          value={airTanahTarget}
                          displayType={'text'}
                          thousandSeparator={true}
                          // prefix={'Rp '}
                        />
                      </h5>
                    </div>
                    <div className="row mb-3">
                      <h6 style={{ color: '#979797' }}>Realisasi</h6>
                      <h5 style={{ color: '#097600' }}>
                        <CurrencyFormat
                          value={airTanahRealisasi}
                          displayType={'text'}
                          thousandSeparator={true}
                          // prefix={'Rp '}
                        />
                      </h5>
                    </div>
                    <div className="row mb-3">
                      <h6 style={{ color: '#979797' }}>Sisa Target</h6>
                      <h5 style={{ color: '#097600' }}>
                        <CurrencyFormat
                          value={airTanahSisaTarget}
                          displayType={'text'}
                          thousandSeparator={true}
                          // prefix={'Rp '}
                        />
                      </h5>
                    </div>
                    <div className="row mb-3">
                      <h6 style={{ color: '#979797' }}>Realisasi Hari Ini</h6>
                      <h5 style={{ color: '#097600' }}>
                        <CurrencyFormat
                          value={airTanahRealisasiHariIni}
                          displayType={'text'}
                          thousandSeparator={true}
                          // prefix={'Rp '}
                        />
                      </h5>
                    </div>
                  </div>
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
          {/* hiburan */}
          <CCol md={3}>
            <CCard className="mb-4">
              <CCardHeader style={{ backgroundColor: '#E553DF' }} className="go-left text-white">
                &nbsp;&nbsp;<img src={Hiburan}></img>&nbsp;&nbsp;Pajak Hiburan
              </CCardHeader>
              <CCardBody>
                {/* <CCardTitle className="text-center">
                  <CIcon icon={cilAirplay} height={52} className="my-4 text-black" />
                </CCardTitle> */}
                <CCardText>
                  <div className="bd-example">
                    <div className="row mb-3">
                      <h6 style={{ color: '#979797' }}>Target</h6>
                      <h5 style={{ color: '#097600' }}>
                        <CurrencyFormat
                          value={hiburanTarget}
                          displayType={'text'}
                          thousandSeparator={true}
                          // prefix={'Rp '}
                        />
                      </h5>
                    </div>
                    <div className="row mb-3">
                      <h6 style={{ color: '#979797' }}>Realisasi</h6>
                      <h5 style={{ color: '#097600' }}>
                        <CurrencyFormat
                          value={hiburanRealisasi}
                          displayType={'text'}
                          thousandSeparator={true}
                          // prefix={'Rp '}
                        />
                      </h5>
                    </div>
                    <div className="row mb-3">
                      <h6 style={{ color: '#979797' }}>Sisa Target</h6>
                      <h5 style={{ color: '#097600' }}>
                        <CurrencyFormat
                          value={hiburanSisaTarget}
                          displayType={'text'}
                          thousandSeparator={true}
                          // prefix={'Rp '}
                        />
                      </h5>
                    </div>
                    <div className="row mb-3">
                      <h6 style={{ color: '#979797' }}>Realisasi Hari Ini</h6>
                      <h5 style={{ color: '#097600' }}>
                        <CurrencyFormat
                          value={hiburanRealisasiHariIni}
                          displayType={'text'}
                          thousandSeparator={true}
                          // prefix={'Rp '}
                        />
                      </h5>
                    </div>
                  </div>
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
          {/* penerangan jalan */}
          <CCol md={3}>
            <CCard className="mb-4">
              <CCardHeader style={{ backgroundColor: '#536AE5' }} className="go-left text-white">
                &nbsp;&nbsp;<img src={Penerangan}></img>&nbsp;&nbsp;Pajak Penerangan Jalan
              </CCardHeader>
              <CCardBody>
                {/* <CCardTitle className="text-center">
                  <CIcon icon={cilAirplay} height={52} className="my-4 text-black" />
                </CCardTitle> */}
                <CCardText>
                  <div className="bd-example">
                    <div className="row mb-3">
                      <h6 style={{ color: '#979797' }}>Target</h6>
                      <h5 style={{ color: '#097600' }}>
                        <CurrencyFormat
                          value={peneranganJalanTarget}
                          displayType={'text'}
                          thousandSeparator={true}
                          // prefix={'Rp '}
                        />
                      </h5>
                    </div>
                    <div className="row mb-3">
                      <h6 style={{ color: '#979797' }}>Realisasi</h6>
                      <h5 style={{ color: '#097600' }}>
                        <CurrencyFormat
                          value={peneranganJalanRealisasi}
                          displayType={'text'}
                          thousandSeparator={true}
                          // prefix={'Rp '}
                        />
                      </h5>
                    </div>
                    <div className="row mb-3">
                      <h6 style={{ color: '#979797' }}>Sisa Target</h6>
                      <h5 style={{ color: '#097600' }}>
                        <CurrencyFormat
                          value={peneranganJalanSisaTarget}
                          displayType={'text'}
                          thousandSeparator={true}
                          // prefix={'Rp '}
                        />
                      </h5>
                    </div>
                    <div className="row mb-3">
                      <h6 style={{ color: '#979797' }}>Realisasi Hari Ini</h6>
                      <h5 style={{ color: '#097600' }}>
                        <CurrencyFormat
                          value={peneranganJalanRealisasiHariIni}
                          displayType={'text'}
                          thousandSeparator={true}
                          // prefix={'Rp '}
                        />
                      </h5>
                    </div>
                  </div>
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
          {/* pbb */}
          <CCol md={3}>
            <CCard className="mb-4">
              <CCardHeader style={{ backgroundColor: '#693E2F' }} className="go-left text-white">
                &nbsp;&nbsp;<img src={Bumi}></img>&nbsp;&nbsp;Pajak Bumi Bangunan
              </CCardHeader>
              <CCardBody>
                {/* <CCardTitle className="text-center">
                  <CIcon icon={cilAirplay} height={52} className="my-4 text-black" />
                </CCardTitle> */}
                <CCardText>
                  <div className="bd-example">
                    <div className="row mb-3">
                      <h6 style={{ color: '#979797' }}>Target</h6>
                      <h5 style={{ color: '#097600' }}>
                        <CurrencyFormat
                          value={bumiTarget}
                          displayType={'text'}
                          thousandSeparator={true}
                          // prefix={'Rp '}
                        />
                      </h5>
                    </div>
                    <div className="row mb-3">
                      <h6 style={{ color: '#979797' }}>Realisasi</h6>
                      <h5 style={{ color: '#097600' }}>
                        <CurrencyFormat
                          value={bumiRealisasi}
                          displayType={'text'}
                          thousandSeparator={true}
                          // prefix={'Rp '}
                        />
                      </h5>
                    </div>
                    <div className="row mb-3">
                      <h6 style={{ color: '#979797' }}>Sisa Target</h6>
                      <h5 style={{ color: '#097600' }}>
                        <CurrencyFormat
                          value={bumiSisaTarget}
                          displayType={'text'}
                          thousandSeparator={true}
                          // prefix={'Rp '}
                        />
                      </h5>
                    </div>
                    <div className="row mb-3">
                      <h6 style={{ color: '#979797' }}>Realisasi Hari Ini</h6>
                      <h5 style={{ color: '#097600' }}>
                        <CurrencyFormat
                          value={bumiRealisasiHariIni}
                          displayType={'text'}
                          thousandSeparator={true}
                          // prefix={'Rp '}
                        />
                      </h5>
                    </div>
                  </div>
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <CContainer>
        <CRow>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0">
                    Objek Pajak {kadalFilter}
                  </h4>
                  <div className="small text-medium-emphasis">
                    {'Periode: ' +
                      format(new Date(selectionRange[0].startDate), 'dd MMMM yyyy') +
                      ' - ' +
                      format(new Date(selectionRange[0].endDate), 'dd MMMM yyyy')}
                  </div>
                </CCol>
                <CCol sm={7} className="d-none d-md-block">
                  <CButtonGroup className="float-end me-3">
                    <CButton
                      color="outline-warning"
                      key="Akan Kadaluarsa"
                      className="mx-0"
                      active={kadalFilter === 'Akan Kadaluarsa'}
                      onClick={() => {
                        setKadalFilter('Akan Kadaluarsa')
                      }}
                    >
                      Akan Kadaluarsa
                    </CButton>
                    <CButton
                      color="outline-danger"
                      key="Sudah Kadaluarsa"
                      className="mx-0"
                      active={kadalFilter === 'Sudah Kadaluarsa'}
                      onClick={() => {
                        setKadalFilter('Sudah Kadaluarsa')
                      }}
                    >
                      Sudah Kadaluarsa
                    </CButton>
                  </CButtonGroup>
                  <CButtonGroup className="float-end me-1" role="group">
                    <CDropdown variant="btn-group">
                      <CButton
                        variant="outline"
                        color="danger"
                        onClick={() => {
                          setReset(false)
                          fetchData()
                        }}
                      >
                        Filter Periode
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
                      color="dark"
                      onClick={() => {
                        setReset(true)
                        let empty = [
                          {
                            startDate: new Date(oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 2)),
                            endDate: today,
                            key: 'selection',
                          },
                        ]
                        setSelectionRange(empty)
                        fetchData()
                      }}
                    >
                      Reset
                    </CButton>
                  </CButtonGroup>
                </CCol>
              </CRow>
              <br />
              <CRow>
                <CCol>
                  <CTable align="middle" className="mb-0 border" hover responsive>
                    <CTableHead color="light">
                      <CTableRow>
                        <CTableHeaderCell>Nomor</CTableHeaderCell>
                        <CTableHeaderCell>NPWPD</CTableHeaderCell>
                        <CTableHeaderCell>Jenis</CTableHeaderCell>
                        <CTableHeaderCell>Lokasi Pemasangan</CTableHeaderCell>
                        <CTableHeaderCell>Nama Wajib Pajak</CTableHeaderCell>
                        <CTableHeaderCell>Nominal</CTableHeaderCell>
                        <CTableHeaderCell>Tanggal Jatuh Tempo</CTableHeaderCell>
                        <CTableHeaderCell>Periode</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {(() => {
                        if (kadalFilter === 'Akan Kadaluarsa') {
                          return tableContents(akanKadaluarsa)
                        } else {
                          return tableContents(sudahKadaluarsa)
                        }
                      })()}
                    </CTableBody>
                  </CTable>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CRow>
      </CContainer>
      <CToaster ref={toaster} push={toast} placement="top-end" />
    </>
  )
}

export default Dashboard
