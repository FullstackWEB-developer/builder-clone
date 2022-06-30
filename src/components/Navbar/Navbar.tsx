import * as React from 'react'
import UserMenu from 'components/UserMenu'
import BaseNavbar from '../BaseNavbar'
import { Props } from './Navbar.types'

export default class Navbar extends React.PureComponent<Props> {
  render() {
    let props = this.props
    if (props.isConnected) {
      props = { ...props, rightMenu: <UserMenu /> }
    }
    return <BaseNavbar activePage="builder" {...props} />
  }
}
