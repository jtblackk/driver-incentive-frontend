import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import MenuIcon from '@material-ui/icons/Menu'

import Grid from '@material-ui/core/Grid'

function TopAppBar(props) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between" spacing={24}>
            <Grid item>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h6">{props.pageTitle}</Typography>
            </Grid>
            <Grid item>
              <Button color="inherit">Log in</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {/* <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar> */}
    </div>
  )
}

export default TopAppBar
