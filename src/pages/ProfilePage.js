import TopAppBar from '../Components/TopAppBar'
import { Grid } from '@material-ui/core'

function ProfilePage() {
  return (
    <div>
      <TopAppBar pageTitle="Your profile" />
      <Grid container justify="space-evenly">
        <Grid item>
          <p>filler</p>
        </Grid>
      </Grid>
    </div>
  )
}

export default ProfilePage
