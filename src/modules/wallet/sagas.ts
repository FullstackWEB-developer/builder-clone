import { all, takeEvery, put } from 'redux-saga/effects'
import { ChainId } from '@dcl/schemas'
import { ContractName } from 'decentraland-transactions'
import { createWalletSaga } from 'dcl-dapps/dist/modules/wallet/sagas'
import {
  CHANGE_ACCOUNT,
  CHANGE_NETWORK,
  CONNECT_WALLET_SUCCESS,
  ChangeAccountAction,
  ChangeNetworkAction,
  ConnectWalletSuccessAction
} from 'dcl-dapps/dist/modules/wallet/actions'
import { fetchAuthorizationsRequest } from 'dcl-dapps/dist/modules/authorization/actions'
import { Authorization } from 'dcl-dapps/dist/modules/authorization/types'
import { config } from 'config'
import { buildManaAuthorization } from 'lib/mana'
import { TRANSACTIONS_API_URL } from './utils'

const baseWalletSaga = createWalletSaga({
  CHAIN_ID: config.get('CHAIN_ID') || ChainId.ETHEREUM_MAINNET,
  POLL_INTERVAL: 0,
  TRANSACTIONS_API_URL
})

export function* walletSaga() {
  yield all([baseWalletSaga(), customWalletSaga()])
}

function* customWalletSaga() {
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleWalletChange)
  yield takeEvery(CHANGE_ACCOUNT, handleWalletChange)
  yield takeEvery(CHANGE_NETWORK, handleWalletChange)
}

function* handleWalletChange(action: ConnectWalletSuccessAction | ChangeAccountAction | ChangeNetworkAction) {
  const { wallet } = action.payload
  const chainId = wallet.networks.MATIC.chainId
  // All authorizations to be fetched must be added to the following list
  const authorizations: Authorization[] = []

  try {
    authorizations.push(buildManaAuthorization(wallet.address, chainId, ContractName.CollectionManager))

    yield put(fetchAuthorizationsRequest(authorizations))
  } catch (error) {}
}
