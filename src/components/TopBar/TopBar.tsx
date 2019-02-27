import * as React from 'react'
import { Link } from 'react-router-dom'
import { Header, Grid, Icon, Button } from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'

import ShortcutTooltip from 'components/ShortcutTooltip'
import Chip from 'components/Chip'
import OwnIcon from 'components/Icon'
import { locations } from 'routing/locations'
import { Gizmo } from 'modules/editor/types'
import { Shortcut } from 'modules/keyboard/types'
import { Props } from './TopBar.types'
import './TopBar.css'

export default class TopBar extends React.PureComponent<Props> {
  handleMoveMode = () => {
    const { onSetGizmo } = this.props
    onSetGizmo(Gizmo.MOVE)
  }

  handleRotateMode = () => {
    const { onSetGizmo } = this.props
    onSetGizmo(Gizmo.ROTATE)
  }

  handleTogglePreview = () => {
    const { onTogglePreview, isPreviewing } = this.props
    onTogglePreview(!isPreviewing)
  }

  handleToggleSidebar = () => {
    const { onToggleSidebar, isSidebarOpen } = this.props
    onToggleSidebar(!isSidebarOpen)
  }

  handleAddToContestClick = () => {
    const { hasAcceptedTerms, onOpenModal } = this.props
    if (hasAcceptedTerms) {
      // Also serves as an update entry
      onOpenModal('AddToContestModal')
    } else {
      onOpenModal('ContestModal')
    }
  }

  handleTitleClick = () => {
    this.props.onOpenModal('EditProjectModal')
  }

  render() {
    const {
      currentProject,
      gizmo,
      isPreviewing,
      isSidebarOpen,
      selectedEntityId,
      onReset,
      onDelete,
      onDuplicate,
      hasSubmittedCurrentProject
    } = this.props
    return (
      <Grid className="TopBar">
        <Grid.Column mobile={4} tablet={4} computer={4} className="left-column" verticalAlign="middle">
          <Header size="medium" className="project-title-container">
            <Link className="text" to={locations.root()}>
              <Icon name="chevron left" />
            </Link>
            {currentProject ? (
              <>
                <span className="project-title" onClick={this.handleTitleClick}>
                  {currentProject.title}
                  <OwnIcon name="edit" className="edit-project-icon" />
                </span>
              </>
            ) : null}
          </Header>
        </Grid.Column>
        <Grid.Column mobile={6} tablet={6} computer={7} className="middle-column">
          <Grid.Row>
            <div className="editor-actions">
              <span className="editor-modes">
                <ShortcutTooltip shortcut={Shortcut.MOVE} position="bottom center" className="tool" popupClassName="top-bar-popup">
                  <Chip icon="move" isActive={gizmo === Gizmo.MOVE} onClick={this.handleMoveMode} />
                </ShortcutTooltip>
                <ShortcutTooltip shortcut={Shortcut.ROTATE} position="bottom center" className="tool" popupClassName="top-bar-popup">
                  <Chip icon="rotate" isActive={gizmo === Gizmo.ROTATE} onClick={this.handleRotateMode} />
                </ShortcutTooltip>
              </span>
              <ShortcutTooltip shortcut={Shortcut.RESET_ITEM} position="bottom center" className="tool" popupClassName="top-bar-popup">
                <Chip icon="undo" isDisabled={!selectedEntityId} onClick={onReset} />
              </ShortcutTooltip>
              <ShortcutTooltip shortcut={Shortcut.DUPLICATE_ITEM} position="bottom center" className="tool" popupClassName="top-bar-popup">
                <Chip icon="duplicate" isDisabled={!selectedEntityId} onClick={onDuplicate} />
              </ShortcutTooltip>
              <ShortcutTooltip shortcut={Shortcut.DELETE_ITEM} position="bottom center" className="tool" popupClassName="top-bar-popup">
                <Chip icon="delete" isDisabled={!selectedEntityId} onClick={onDelete} />
              </ShortcutTooltip>
            </div>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column mobile={6} tablet={6} computer={5} className="right-column">
          <Grid.Row>
            <ShortcutTooltip shortcut={Shortcut.PREVIEW} position="bottom center" className="tool" popupClassName="top-bar-popup">
              <Chip icon="preview" isActive={isPreviewing} onClick={this.handleTogglePreview} />
            </ShortcutTooltip>
            <ShortcutTooltip shortcut={Shortcut.TOGGLE_SIDEBAR} position="bottom center" className="tool" popupClassName="top-bar-popup">
              <Chip icon="sidebar" isActive={isSidebarOpen} onClick={this.handleToggleSidebar} />
            </ShortcutTooltip>

            <Button className="add-to-contest" size="mini" onClick={this.handleAddToContestClick}>
              {hasSubmittedCurrentProject ? t('topbar.update_contest_entry') : t('topbar.add_to_contest')}
            </Button>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    )
  }
}
