import * as React from 'react'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import { ModalNavigation } from 'decentraland-ui/dist/components/ModalNavigation/ModalNavigation'
import {
  Navbar as NavbarComponent,
  NavbarI18N
} from 'decentraland-ui/dist/components/Navbar/Navbar'
import { getChainName } from '@dcl/schemas/dist/dapps/chain-id'
import { ChainProvider, Modal } from 'decentraland-dapps/dist/containers'
import { NavbarProps } from 'decentraland-dapps/dist/containers/Navbar/Navbar.types'
import { T } from 'decentraland-dapps/dist/modules/translation/utils'
import UserMenu from 'components/UserMenu'
// import { Props } from './Navbar.types'

export default class BaseNavbar extends React.PureComponent<NavbarProps> {
  getTranslations = (): NavbarI18N | undefined => {
    if (!this.props.hasTranslations) {
      return undefined
    }
    return {
      menu: {
        marketplace: <T id="@dapps.navbar.menu.marketplace" />,
        events: <T id="@dapps.navbar.menu.events" />,
        agora: <T id="@dapps.navbar.menu.agora" />,
        dao: <T id="@dapps.navbar.menu.dao" />,
        docs: <T id="@dapps.navbar.menu.docs" />,
        blog: <T id="@dapps.navbar.menu.blog" />,
        builder: <T id="@dapps.navbar.menu.builder" />
      },
      account: {
        connecting: <T id="@dapps.navbar.account.connecting" />,
        signIn: <T id="@dapps.navbar.account.signIn" />
      }
    }
  }

  handleSwitchNetwork = () => {
    this.props.onSwitchNetwork(this.props.appChainId)
  }

  handleSignOut = () => {
    this.props.onSignOut()
  }

  render() {
    const {
      appChainId,
      hasAcceptedNetworkPartialSupport,
      onAcceptNetworkPartialSupport
    } = this.props
    const expectedChainName = getChainName(appChainId)
    return (
      <>
        <NavbarComponent {...this.props} i18n={this.getTranslations()} />
        <ChainProvider>
          {({ chainId, isUnsupported, isPartiallySupported }) =>
            isUnsupported ? (
              <Modal open size="tiny">
                <ModalNavigation
                  title={<T id="@dapps.navbar.wrong_network.header" />}
                />
                <Modal.Content>
                  {!getChainName(chainId!) ? (
                    <T
                      id="@dapps.navbar.wrong_network.message_unknown_network"
                      values={{
                        expectedChainName: <b>{expectedChainName}</b>
                      }}
                    />
                  ) : (
                    <T
                      id="@dapps.navbar.wrong_network.message"
                      values={{
                        currentChainName: <b>{getChainName(chainId!)}</b>,
                        expectedChainName: <b>{expectedChainName}</b>
                      }}
                    />
                  )}
                </Modal.Content>
                <Modal.Actions>
                  <Button primary onClick={this.handleSwitchNetwork}>
                    <T
                      id="@dapps.navbar.wrong_network.switch_button"
                      values={{
                        chainName: <b>{expectedChainName}</b>
                      }}
                    />
                  </Button>
                </Modal.Actions>
              </Modal>
            ) : isPartiallySupported ? (
              <Modal open={!hasAcceptedNetworkPartialSupport} size="small">
                <ModalNavigation
                  title={
                    <T id="@dapps.navbar.partially_supported_network.header" />
                  }
                />
                <Modal.Content>
                  <T
                    id="@dapps.navbar.partially_supported_network.message"
                    values={{
                      currentChainName: <b>{getChainName(chainId!)}</b>,
                      expectedChainName: <b>{expectedChainName}</b>
                    }}
                  />
                </Modal.Content>
                <Modal.Actions>
                  <Button primary onClick={this.handleSwitchNetwork}>
                    <T
                      id="@dapps.navbar.wrong_network.switch_button"
                      values={{
                        chainName: <b>{expectedChainName}</b>
                      }}
                    />
                  </Button>
                  <Button secondary onClick={onAcceptNetworkPartialSupport}>
                    <T
                      id="@dapps.navbar.partially_supported_network.continue_button"
                      values={{
                        chainName: <b>{getChainName(chainId!)}</b>
                      }}
                    />
                  </Button>
                </Modal.Actions>
              </Modal>
            ) : null
          }
        </ChainProvider>
      </>
    )
  }
}

