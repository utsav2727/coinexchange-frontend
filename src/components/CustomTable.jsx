import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

const CustomTable = ({rows, columns}) => {


  return (
    <>
    <DataGrid
        getRowId={(item)=>item._id}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        rowSelection={false}
      />
    </>
  )
}

export default CustomTable