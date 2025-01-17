import * as React from 'react'
import { Tabs } from 'dcl-ui'
import { t } from 'dcl-dapps/dist/modules/translation/utils'
import { Props, NavigationTab } from './Navigation.types'
import { locations } from 'routing/locations'

export default class Navigation extends React.PureComponent<Props> {
  render() {
    const { activeTab, onNavigate, isFullscreen, isCommitteeMember, children } = this.props
    return (
      <Tabs isFullscreen={isFullscreen}>
        {children}
        <Tabs.Tab active={activeTab === NavigationTab.SCENES} onClick={() => onNavigate(locations.root())}>
          {t('navigation.scenes')}
        </Tabs.Tab>
        {/* <Tabs.Tab active={activeTab === NavigationTab.LAND} onClick={() => onNavigate(locations.land())}>
          {t('navigation.land')}
        </Tabs.Tab> */}
        <Tabs.Tab active={activeTab === NavigationTab.NAMES} onClick={() => onNavigate(locations.ens())}>
          {t('navigation.names')}
        </Tabs.Tab>
        <>
          <Tabs.Tab active={activeTab === NavigationTab.COLLECTIONS} onClick={() => onNavigate(locations.collections())}>
            {t('navigation.collections')}
          </Tabs.Tab>
          {isCommitteeMember ? (
            <Tabs.Tab active={activeTab === NavigationTab.CURATION} onClick={() => onNavigate(locations.curation())}>
              {t('navigation.curation')}
            </Tabs.Tab>
          ) : null}
        </>
      </Tabs>
    )
  }
}
