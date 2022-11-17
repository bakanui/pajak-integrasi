import React from 'react'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import _ from 'lodash'
import TableList from '../reusable/TableList'
import { Helmet } from 'react-helmet'
import { cilDrop } from '@coreui/icons'

const AirTanah = () => {
  return (
    <>
      <Helmet>
        <title>Air Tanah | Aplikasi Pajak Terintegrasi Kabupaten Bangli</title>
      </Helmet>
      <TableList jenisPajak={'Air Tanah'} icon={cilDrop} />
    </>
  )
}

export default AirTanah
