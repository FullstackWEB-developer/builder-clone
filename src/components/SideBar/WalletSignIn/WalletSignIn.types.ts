import { Dispatch } from 'redux'
import { SignInProps } from 'dcl-ui'
import { ConnectWalletRequestAction } from 'dcl-dapps/dist/modules/wallet/actions'
import { openModal, OpenModalAction } from 'modules/modal/actions'

export type Props = SignInProps & {
  hasTranslations?: boolean
  onOpenModal: typeof openModal
}

export type State = {
  hasError: boolean
}

export type MapStateProps = Pick<Props, 'isConnecting' | 'hasError'>
export type MapDispatchProps = Pick<Props, 'onOpenModal'>
export type MapDispatch = Dispatch<ConnectWalletRequestAction | OpenModalAction>
