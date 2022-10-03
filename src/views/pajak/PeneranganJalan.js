import React from 'react'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import _ from 'lodash'
import TableList from '../reusable/TableList'
import { Helmet } from 'react-helmet'
import { cilLightbulb } from '@coreui/icons'

const PeneranganJalan = () => {
  return (
    <>
      <Helmet>
        <title>Penerangan Jalan | Penerimaan Pendapatan Asli Daerah Kabupaten Bangli</title>
      </Helmet>
      <TableList jenisPajak={'Penerangan Jalan'} icon={cilLightbulb} />
    </>
  )
}

export default PeneranganJalan
