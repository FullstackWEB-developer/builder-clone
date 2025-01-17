import { Dispatch } from 'react'
import { Authorization } from 'dcl-dapps/dist/modules/authorization/types'
import { Wallet } from 'dcl-dapps/dist/modules/wallet/types'
import { OpenModalAction } from 'modules/modal/actions'
import { Collection } from 'modules/collection/types'
import { Item, SyncStatus } from 'modules/item/types'
import { FetchCollectionCurationRequestAction } from 'modules/curations/collectionCuration/actions'

export type Props = {
  wallet: Wallet
  collection: Collection
  items: Item[]
  authorizations: Authorization[]
  status: SyncStatus
  hasPendingCuration: boolean
  onPublish: () => void
  onPush: () => void
  onInit: () => void
}

export type OwnProps = Pick<Props, 'collection'>
export type MapStateProps = Pick<Props, 'wallet' | 'items' | 'authorizations' | 'status' | 'hasPendingCuration'>
export type MapDispatchProps = Pick<Props, 'onPublish' | 'onPush' | 'onInit'>
export type MapDispatch = Dispatch<OpenModalAction | FetchCollectionCurationRequestAction>
