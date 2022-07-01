import * as React from 'react'
import { Button } from 'dcl-ui'
import { t } from 'dcl-dapps/dist/modules/translation/utils'
import { Props, DefaultProps } from './DeployContestButton.types'
import './DeployContestButton.css'

export default class DeployContestButton extends React.PureComponent<Props> {
  static defaultProps: DefaultProps = {
    onClick: () => {
      /* noop */
    }
  }

  handleClick = () => {
    const { onOpenModal } = this.props

    onOpenModal('ContestModal')
  }

  render() {
    const { isLoading } = this.props

    return (
      <span className="DeployContestButton tool">
        <span>
          <Button size="mini" onClick={this.handleClick} disabled={isLoading}>
            {t('deployment_contest_modal.action')}
          </Button>
        </span>
      </span>
    )
  }
}
