import React from 'react'
import { logout } from 'service/AuthService'
import ThemedPage from 'components/layout/ThemedPage'
import TaskList from 'components/TaskList'
import Header, {ICONS as HEADER_ICONS } from 'components/Header'
import { withRouter } from 'react-router-dom'
import { fetchTasks } from 'state/actions/tasks'
import { getTasks, getIsFetching } from 'state/reducers'
import { connect } from 'react-redux'
import LoadingList from 'components/LoadingList'
import SidePanel from 'components/SidePanel'
import { ICONS } from 'components/Fab'
import TaskMenu from 'components/TaskMenu'
import { getLabel } from 'labels/LabelProvider'

class Home extends React.Component {

  constructor() {
    super()
    this.state = {
      isDisplayedSidePanel: false,
      isDisplayedMenu: false
    }
    this.logout = this.logout.bind(this)
    this.toggleSidePanel = this.toggleSidePanel.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.handleBack = this.handleBack.bind(this)
  }

  toggleSidePanel() {
    this.setState({
      isDisplayedSidePanel: !this.state.isDisplayedSidePanel,
    })
  }

  toggleMenu() {
    this.setState({
      isDisplayedMenu: !this.state.isDisplayedMenu,
    })
  }

  handleBack(){
    if(this.state.isDisplayedMenu){
      this.toggleMenu()
    } else {
      this.toggleSidePanel()
    }
  }

  logout() {
    logout().then(() => {
      this.props.history.replace('/')
    })
  }

  componentDidMount(){
    if(this.props.tasks.length === 0)
      this.props.fetchTasks()
  }

  render() {
    const { isFetching, tasks } = this.props
    const leftIcon = this.state.isDisplayedSidePanel ?
      HEADER_ICONS.LEFT : this.state.isDisplayedMenu ? HEADER_ICONS.RIGHT : HEADER_ICONS.MENU
    return (<ThemedPage fab={true} handleClickFab={this.toggleMenu} fabIcon={ICONS.PLUS}>
      <Header
        title={getLabel('home.title')}
        leftIcon={leftIcon}
        handleClickLeft={this.handleBack}
        rightText={getLabel('home.reload')}
        handleClickRight={this.props.fetchTasks} />
      <AppSidePanel
        logout={this.logout}
        isDisplayed={this.state.isDisplayedSidePanel} />
      <TaskMenu isDisplayed={this.state.isDisplayedMenu} />
      <div>
        {
          isFetching ? <LoadingList /> : <TaskList tasks={tasks}/>
        }
      </div>
    </ThemedPage>)
  }
}

const mapStateToProps = (state) => ({
  tasks: getTasks(state),
  isFetching: getIsFetching(state)
})

export default withRouter(connect(
  mapStateToProps,
  { fetchTasks }
)(Home))

function AppSidePanel(props) {
  let entries = [
    {
      label: getLabel('home.logout'),
      handleClickEntry: props.logout
    }
  ]

  let newProps = { ...props, entries }

  return <SidePanel {...newProps} />
}
