import React, { useContext, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Divider, Grid, Paper, TextField, Typography } from '@material-ui/core'
import { UserContext } from '../Helpers/UserContext'

export default function AddSponsorProfileDialog(props) {
  const handleClickOpen = () => {
    props.dialogProps.setSelectionDialogIsOpenState(true)
  }

  const handleClose = () => {
    props.dialogProps.setSelectionDialogIsOpenState(false)
  }
  const userData = useContext(UserContext).user
  const [username, setUsername] = useState(null)
  const [usernameHelperText, setUsernameHelperText] = useState(null)
  const [firstName, setFirstName] = useState(null)
  const [firstNameHelperText, setFirstNameHelperText] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [lastNameHelperText, setLastNameHelperText] = useState(null)
  const [bio, setBio] = useState(null)
  const [bioHelperText, setBioHelperText] = useState(null)

  const [isLoading, setIsLoading] = useState(false)
  const [usernameList, setUsernameList] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    setIsLoading(false)
  }, [])

  return (
    <div>
      <Dialog
        open={props.dialogProps.selectionDialogIsOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Add a sponsor?'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} justify="center">
            <Grid item xs={12}>
              <Typography>
                Enter the profile details of the sponsor you would like to
                create
              </Typography>
            </Grid>
            <Grid item container xs={6} justify="center">
              <TextField
                fullWidth
                label="Username"
                helperText={usernameHelperText}
                error={usernameHelperText}
                variant="filled"
                onChange={(event) => {
                  setUsernameHelperText(null)
                  setUsername(event.target.value)
                }}
              />
            </Grid>
            <Grid item container xs={12} spacing={2} justify="center">
              <Grid item xs={3}>
                <TextField
                  fullwidth
                  label="First name"
                  helperText={firstNameHelperText}
                  error={firstNameHelperText}
                  variant="filled"
                  onChange={(event) => {
                    setFirstNameHelperText(null)
                    setFirstName(event.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullwidth
                  label="Last name"
                  helperText={lastNameHelperText}
                  error={lastNameHelperText}
                  variant="filled"
                  onChange={(event) => {
                    setLastNameHelperText(null)
                    setLastName(event.target.value)
                  }}
                />
              </Grid>
            </Grid>
            <Grid item container xs={6}>
              <TextField
                label="Bio"
                multiline
                rows={4}
                variant="filled"
                fullWidth
                helperText={bioHelperText}
                error={bioHelperText}
                onChange={(event) => {
                  setBioHelperText(null)
                  setBio(event.target.value)
                }}
              />
            </Grid>

            <Grid item container xs={12} justify="center">
              <Grid item container justify="flex-end" xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    // username validation
                    let validationFailed = false
                    if (!username) {
                      setUsernameHelperText('Required')
                      validationFailed = true
                    } else if (
                      username.includes("'") ||
                      username.includes(' ')
                    ) {
                      setUsernameHelperText('Avoid special characters')
                      validationFailed = true
                    } else if (false) {
                      // TODO: check for username username uniquity | need api to get all usernames on the app
                      validationFailed = true
                    }

                    // first name validation
                    if (!firstName) {
                      setFirstNameHelperText('Required')
                      validationFailed = true
                    }

                    // last name validation
                    if (!lastName) {
                      setLastNameHelperText('Required')
                      validationFailed = true
                    }

                    // bio validation
                    if (!bio) {
                      setBioHelperText('Required')
                      validationFailed = true
                    }

                    if (validationFailed) return

                    let REGISTER_PROFILE_URL = `https://thuv0o9tqa.execute-api.us-east-1.amazonaws.com/dev/saveuserdetails`
                    let requestOptions = {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        Username: username,
                        Organization: userData.Organization,
                        FirstName: firstName,
                        LastName: lastName,
                        Bio: bio,
                        AccountType: 'Sponsor',
                        AccountStatus: 1,
                      }),
                    }
                    fetch(REGISTER_PROFILE_URL, requestOptions)

                    handleClose()
                  }}
                >
                  Create profile
                </Button>
              </Grid>
            </Grid>

            <Grid item container xs={12}>
              <br />
            </Grid>
            <Grid item container xs={12}>
              <br />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  )
}
