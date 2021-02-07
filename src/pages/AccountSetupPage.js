import TopAppBar from '../Components/TopAppBar'
import AccountSetupCard from '../Components/AccountSetupCard'
import { Grid } from '@material-ui/core'

function AccountSetupPage() {
  return (
    <div>
      <TopAppBar pageTitle="Create an account" />
      <Grid container justify="space-evenly">
        <Grid item>
          <AccountSetupCard />
        </Grid>
      </Grid>
    </div>
  )
}

export default AccountSetupPage
