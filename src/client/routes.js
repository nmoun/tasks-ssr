// import React from 'react'
// import Loadable from 'react-loadable'
import withAuthentication from 'enhancers/withAuthentication'
import withTransaction from 'enhancers/withTransaction'
import Reception from 'screens/modules/Reception'
import Order from 'screens/modules/Order'
import Register from 'screens/Register'
import Login from 'screens/Login'
import Home from 'screens/Home'

const routes = [
  {
    path: '/',
    exact: true,
    component: withAuthentication(Home)
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/order',
    component: withAuthentication(Order)
    // component: Loadable({
    //   loader: () => import('screens/modules/Order'),
    //   loading: function(){ return <div>Loading module...</div>},
    //   render(loaded, props){
    //     let Order = withAuthentication(loaded.default)
    //     return <Order {...props} />
    //   }
    // })
  },
  {
    path: '/reception',
    component: withAuthentication(withTransaction(Reception))
  },
]

export default routes