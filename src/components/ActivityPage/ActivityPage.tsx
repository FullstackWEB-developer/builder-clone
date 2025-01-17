import React, { useCallback, useState } from 'react'
import { Page, Header, Button, Modal } from 'dcl-ui'
import { t } from 'dcl-dapps/dist/modules/translation/utils'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import Navigation from 'components/Navigation'
import SignInRequired from 'components/SignInRequired'
import Transaction from './Transaction'
import { Props } from './ActivityPage.types'
import './ActivityPage.css'

const ActivityPage = (props: Props) => {
  const { address, transactions, onClearHistory, isLoggedIn } = props

  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleClear = useCallback(() => {
    if (address) {
      onClearHistory(address)
    }
    setShowConfirmation(false)
  }, [address, onClearHistory])

  const handleConfirm = useCallback(() => setShowConfirmation(true), [setShowConfirmation])
  const handleCancel = useCallback(() => setShowConfirmation(false), [setShowConfirmation])

  let content = null

  if (!isLoggedIn) {
    content = <SignInRequired />
  } else if (transactions.length === 0) {
    content = (
      <div className="center">
        <p>{t('activity_page.empty')}</p>
      </div>
    )
  } else {
    content = (
      <>
        <div className="history-header">
          <div className="left">
            <Header sub>{t('activity_page.latest_activity')}</Header>
          </div>
          <div className="right">
            <Button basic onClick={handleConfirm}>
              {t('activity_page.clear_history')}
            </Button>
          </div>
        </div>
        <div className="transactions">{transactions.map(tx => <Transaction tx={tx} key={tx.hash} />).reverse()}</div>
      </>
    )
  }

  return (
    <>
      <Navbar isFullscreen />
      <Navigation />
      <Page className="ActivityPage">{content}</Page>
      <Modal size="tiny" open={showConfirmation}>
        <Modal.Header>{t('activity_page.clear_history_modal.title')}</Modal.Header>
        <Modal.Content>{t('activity_page.clear_history_modal.text')}</Modal.Content>
        <Modal.Actions>
          <Button onClick={handleCancel}>{t('global.cancel')}</Button>
          <Button primary onClick={handleClear}>
            {t('global.proceed')}
          </Button>
        </Modal.Actions>
      </Modal>
      <Footer />
    </>
  )
}

export default React.memo(ActivityPage)
