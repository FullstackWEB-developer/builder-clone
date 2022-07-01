import React from 'react'
import { T, t } from 'dcl-dapps/dist/modules/translation/utils'
import { Button, Modal } from 'dcl-ui'
import { Props } from './ConfirmApprovalModal.types'
import Profile from 'components/Profile'
import './ConfirmApprovalModal.css'


const ConfirmApprovalModal = ({ open, assignee, onConfirm, onClose }: Props) => {
  return (
    <Modal size="tiny" className="ConfirmApprovalModal" open={open}>
      <Modal.Header>{t('curation_page.confirm_not_assigned_curation_modal.title')}</Modal.Header>
      <Modal.Content>
        <div className="message-container">
          <T
            id={'curation_page.confirm_not_assigned_curation_modal.body'}
            values={{
              assignee: (
                <strong>
                  <Profile textOnly address={assignee} />
                </strong>
              )
            }}
          />
        </div>
        <span>
          <T id="curation_page.confirm_not_assigned_curation_modal.confirm_footer" />
        </span>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>{t('global.cancel')}</Button>
        <Button primary onClick={onConfirm}>
          {t('curation_page.confirm_not_assigned_curation_modal.confirm_button')}
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default React.memo(ConfirmApprovalModal)
