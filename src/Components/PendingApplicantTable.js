import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

export default function PendingApplicantTable(props) {
  // console.log(props)
  const [rows, setRows] = useState(null)
  const [selectedRow, setSelectedRow] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    let application_list = props.applicants.map((applicant) => {
      return {
        // ApplicationID: applicant.ApplicationID,
        FirstName: applicant.ApplicantFirstName,
        LastName: applicant.ApplicantLastName,
        Email: applicant.ApplicantEmail,
        SubmissionDate: applicant.SubmissionDate,
      }
    })
    setRows(application_list)

    setIsLoading(false)
  }, [])

  if (!isLoading) {
    return (
      // set selected row state

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell>Application ID</TableCell> */}
              <TableCell>Email</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Submission date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                hover={true}
                key={row.Email}
                onClick={() => {
                  // console.log(row.Email)

                  let selected_user_data = props.applicants.find((element) => {
                    return element.ApplicantEmail === row.Email
                  })

                  props.setSelectedApplicantState(selected_user_data)
                  props.setDialogIsOpenState(true)
                }}
              >
                {/* <TableCell component="th" scope="row">
                  {row.ApplicationID}
                </TableCell> */}
                <TableCell>{row.Email}</TableCell>
                <TableCell>{row.FirstName}</TableCell>
                <TableCell>{row.LastName}</TableCell>
                <TableCell>{row.SubmissionDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  } else {
    // todo: handle this loading case
    return <p>boo</p>
  }
}
