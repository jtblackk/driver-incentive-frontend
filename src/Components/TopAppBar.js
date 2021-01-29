import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import Grid from '@material-ui/core/Grid'

function TopAppBar(props) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-evenly" spacing={24}>
            <Grid item>
              <Typography variant="h6">{props.pageTitle}</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default TopAppBar
