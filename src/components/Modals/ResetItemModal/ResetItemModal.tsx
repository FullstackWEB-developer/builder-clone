import React from 'react'
import Modal from 'dcl-dapps/dist/containers/Modal'
import { Button, ModalNavigation } from 'dcl-ui'
import { T, t } from 'dcl-dapps/dist/modules/translation/utils'
import { Props } from './ResetItemModal.types'

import './ResetItemModal.css'

const ResetItemModal = ({ error, isLoading, onClose, onConfirm }: Props) => {
  return (
    <Modal className="ResetItemModal" size="tiny" onClose={onClose}>
      <ModalNavigation title={t('reset_item_modal.title')} onClose={onClose} />
      <Modal.Content>
        <T
          id="reset_item_modal.content"
          values={{
            br: (
              <>
                <br />
                <br />
              </>
            )
          }}
        />
        {error && <p className="error">{error}</p>}
      </Modal.Content>
      <Modal.Actions>
        <Button secondary onClick={onClose} disabled={isLoading}>
          {t('global.cancel')}
        </Button>
        <Button primary onClick={onConfirm} disabled={isLoading} loading={isLoading}>
          {t('global.confirm')}
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default React.memo(ResetItemModal)
