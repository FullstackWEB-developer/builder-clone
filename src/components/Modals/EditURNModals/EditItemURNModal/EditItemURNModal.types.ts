import { Dispatch } from 'redux'
import { ModalProps } from 'dcl-dapps/dist/providers/ModalProvider/ModalProvider.types'
import { DecodedURN, URN, URNType } from 'lib/urn'
import { saveItemRequest, SaveItemRequestAction } from 'modules/item/actions'
import { Item } from 'modules/item/types'

export type Props = ModalProps & {
  elementName: string
  urn: URN
  isLoading: boolean
  metadata: EditURNModalMetadata
  error: string | null
  onSave: (urn: string) => ReturnType<typeof saveItemRequest>
  onBuildURN: (decodedURN: DecodedURN<URNType.COLLECTIONS_THIRDPARTY>, tokenId: string) => string
}

export type EditURNModalMetadata = {
  item: Item
}

export type OwnProps = Pick<Props, 'metadata'>
export type MapStateProps = Pick<Props, 'elementName' | 'urn' | 'isLoading' | 'error'>
export type MapDispatchProps = Pick<Props, 'onSave' | 'onBuildURN'>
export type MapDispatch = Dispatch<SaveItemRequestAction>
