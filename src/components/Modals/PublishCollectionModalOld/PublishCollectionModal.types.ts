import { Dispatch } from 'redux'
import { Wallet } from 'dcl-dapps/dist/modules/wallet/types'
import { ModalProps } from 'dcl-dapps/dist/providers/ModalProvider/ModalProvider.types'
import { publishCollectionRequest, PublishCollectionRequestAction } from 'modules/collection/actions'
import { Collection } from 'modules/collection/types'
import { Item, Rarity } from 'modules/item/types'
import { fetchRaritiesRequest, FetchRaritiesRequestAction } from 'modules/item/actions'

export type Props = ModalProps & {
  metadata: PublishCollectionModalMetadata
  wallet: Wallet | null
  collection: Collection | null
  items: Item[]
  rarities: Rarity[]
  isPublishLoading: boolean
  isFetchingItems: boolean
  isFetchingRarities: boolean
  unsyncedCollectionError: string | null
  onPublish: typeof publishCollectionRequest
  onFetchRarities: typeof fetchRaritiesRequest
}

export type State = {
  step: number
  email?: string
  emailFocus: boolean
}

export type PublishCollectionModalMetadata = {
  collectionId: string
}

export type MapStateProps = Pick<
  Props,
  'wallet' | 'collection' | 'items' | 'rarities' | 'unsyncedCollectionError' | 'isPublishLoading' | 'isFetchingItems' | 'isFetchingRarities'
>
export type MapDispatchProps = Pick<Props, 'onPublish' | 'onFetchRarities'>
export type MapDispatch = Dispatch<PublishCollectionRequestAction | FetchRaritiesRequestAction>
export type OwnProps = Pick<Props, 'metadata'>
