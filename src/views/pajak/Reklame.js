import React from 'react'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import _ from 'lodash'
import TableList from '../reusable/TableList'
import { Helmet } from 'react-helmet'
import { cilAirplay } from '@coreui/icons'

const Reklame = () => {
  return (
    <>
      <Helmet>
        <title>Reklame | Aplikasi Pajak Terintegrasi Kabupaten Bangli</title>
      </Helmet>
      <TableList jenisPajak={'Reklame'} icon={cilAirplay} />
    </>
  )
}

export default Reklame
