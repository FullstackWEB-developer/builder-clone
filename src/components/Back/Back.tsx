import * as React from 'react'
import { Back as BackComponent } from 'dcl-ui'
import { Props } from './Back.types'

export default class Back extends React.PureComponent<Props> {
  render() {
    const { onBack, onClick, hasHistory, absolute, ...rest } = this.props
    return <BackComponent {...rest} onClick={hasHistory && !absolute ? onBack : onClick} />
  }
}
