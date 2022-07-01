import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Transaction } from 'dcl-dapps/dist/modules/transaction/types'
import { clearTransactions, ClearTransactionsAction } from 'dcl-dapps/dist/modules/transaction/actions'

export type Props = {
  isLoggedIn: boolean
  address?: string
  transactions: Transaction[]
  onClearHistory: typeof clearTransactions
  onNavigate: (path: string) => void
}

export type MapStateProps = Pick<Props, 'address' | 'transactions' | 'isLoggedIn'>
export type MapDispatchProps = Pick<Props, 'onClearHistory' | 'onNavigate'>
export type MapDispatch = Dispatch<ClearTransactionsAction | CallHistoryMethodAction>
