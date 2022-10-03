import React from 'react'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import _ from 'lodash'
import TableList from '../reusable/TableList'
import { Helmet } from 'react-helmet'

const Reklame = () => {
  return (
    <>
      <Helmet>
        <title>Reklame | Penerimaan Pendapatan Asli Daerah Kabupaten Bangli</title>
      </Helmet>
      <TableList jenisPajak={'Reklame'} />
    </>
  )
}

export default Reklame
