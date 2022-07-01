import { Dispatch } from 'redux'
import { ModalProps } from 'dcl-dapps/dist/providers/ModalProvider/ModalProvider.types'
import { SaveCollectionRequestAction, saveCollectionRequest } from 'modules/collection/actions'

export type Props = ModalProps & {
  address?: string
  isLoading: boolean
  onSubmit: typeof saveCollectionRequest
  error: string | null
}

export type State = {
  collectionName: string
}

export type MapStateProps = Pick<Props, 'address' | 'isLoading' | 'error'>
export type MapDispatchProps = Pick<Props, 'onSubmit'>
export type MapDispatch = Dispatch<SaveCollectionRequestAction>
