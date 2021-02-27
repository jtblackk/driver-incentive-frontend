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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    let applicationList = props.applicants.map((applicant) => {
      return {
        firstName: applicant.applicantFirstName,
        lastName: applicant.applicantLastName,
        email: applicant.applicantEmail,
        submissionDate: applicant.submissionDate,
      }
    })
    setRows(applicationList)
    setIsLoading(false)
  }, [])

  if (!isLoading) {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
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
                key={row.email}
                onClick={() => {
                  let selectedUserData = props.applicants.find((element) => {
                    return element.applicantEmail === row.email
                  })

                  props.setSelectedApplicantState(selectedUserData)
                  props.setDialogIsOpenState(true)
                }}
              >
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.submissionDate}</TableCell>
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
