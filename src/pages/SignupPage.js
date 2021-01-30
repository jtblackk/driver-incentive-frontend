import TopAppBar from '../Components/TopAppBar'
import CreateAccountCard from '../Components/CreateAccountCard'
import { Grid } from '@material-ui/core'

function SignupPage() {
  return (
    <div>
      <TopAppBar pageTitle="Create an account" />
      <Grid container justify="space-evenly">
        <Grid item>
          <CreateAccountCard />
        </Grid>
      </Grid>
    </div>
  )
}

export default SignupPage
