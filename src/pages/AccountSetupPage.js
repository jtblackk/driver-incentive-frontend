import TopAppBar from '../Components/TopAppBar'
import AccountSetupCard from '../Components/AccountSetupCard'
import { Grid } from '@material-ui/core'

function AccountSetupPage() {
  return (
    <div>
      <TopAppBar pageTitle="Configure your account" />
      <Grid container justify="space-evenly">
        <Grid item>
          <AccountSetupCard accountEmail="again@gmail.com" />
        </Grid>
      </Grid>
    </div>
  )
}

export default AccountSetupPage
