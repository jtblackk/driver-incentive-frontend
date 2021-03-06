import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Box, TableSortLabel } from '@material-ui/core'

import orderBy from 'lodash/orderBy'

require('datejs')

export default function GenericTable(props) {
  const [rows, setRows] = useState(null)

  const [columnToSort, setColumnToSort] = useState(props.initialSortedColumn)
  const [sortDirection, setSortDirection] = useState(
    props.initialSortedDirection,
  )
  function handleSort(columnName) {
    if (columnName === columnToSort) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc')
    } else {
      setSortDirection('desc')
    }

    setColumnToSort(columnName)
  }
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    let dataList = props.data
    setRows(dataList)
    setIsLoading(false)
  }, [])

  if (!isLoading) {
    return (
      <TableContainer
        style={{ maxHeight: 370, minHeight: 370 }}
        component={Paper}
      >
        <Table stickyHeader aria-label="simple table">
          {/* Table header */}
          <TableHead>
            <TableRow>
              {/* map the head cells to the table header */}
              {props.headCells.map((headCell) => (
                <TableCell
                  width={headCell.width}
                  key={headCell.id}
                  sortDirection={
                    columnToSort === headCell.id ? sortDirection : false
                  }
                >
                  <TableSortLabel
                    active={columnToSort === headCell.id}
                    direction={
                      columnToSort === headCell.id ? sortDirection : 'asc'
                    }
                    hideSortIcon={columnToSort === headCell.id ? false : true}
                    onClick={() => {
                      handleSort(headCell.id)
                    }}
                  >
                    <Box fontWeight="fontWeightBold">{headCell.label}</Box>
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table content */}
          <TableBody>
            {/* map the data to the table rows */}
            {orderBy(rows, columnToSort, sortDirection).map((row) => (
              <TableRow
                hover={true}
                key={props.tableKey}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  let selectedRow = rows.find((element) => {
                    return element[props.tableKey] === row[props.tableKey]
                  })

                  props.setSelectedRow(selectedRow)

                  props.setDialogIsOpenState(true)
                }}
              >
                {/* display the row key if requested */}
                {props.showKey ? (
                  <TableCell>{row[props.tableKey]}</TableCell>
                ) : null}

                {/* display the row cells */}
                {Object.entries(row).map((cell) => {
                  if (cell[0].toUpperCase().includes('DATE')) {
                    return (
                      <TableCell>{Date.parse(cell[1]).toUTCString()}</TableCell>
                    )
                  } else if (cell[0] !== props.tableKey) {
                    return <TableCell>{cell[1]}</TableCell>
                  } else {
                    return null
                  }
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  } else {
    // todo: handle this loading case
    return <div></div>
  }
}
