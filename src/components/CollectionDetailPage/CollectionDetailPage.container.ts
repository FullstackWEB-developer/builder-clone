import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { isLoadingType } from 'dcl-dapps/dist/modules/loading/selectors'
import { getData as getWallet } from 'dcl-dapps/dist/modules/wallet/selectors'
import { RootState } from 'modules/common/types'
import { getCollectionId } from 'modules/location/selectors'
import { getCollection, isOnSaleLoading, getLoading as getLoadingCollection } from 'modules/collection/selectors'
import { FETCH_COLLECTIONS_REQUEST, DELETE_COLLECTION_REQUEST } from 'modules/collection/actions'
import { openModal } from 'modules/modal/actions'
import { MapStateProps, MapDispatchProps, MapDispatch } from './CollectionDetailPage.types'
import CollectionDetailPage from './CollectionDetailPage'

const mapState = (state: RootState): MapStateProps => {
  const collectionId = getCollectionId(state) || ''
  const collection = getCollection(state, collectionId)

  return {
    wallet: getWallet(state)!,
    collection,
    isOnSaleLoading: isOnSaleLoading(state),
    isLoading:
      isLoadingType(getLoadingCollection(state), FETCH_COLLECTIONS_REQUEST) ||
      isLoadingType(getLoadingCollection(state), DELETE_COLLECTION_REQUEST)
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onNavigate: path => dispatch(push(path)),
  onOpenModal: (name, metadata) => dispatch(openModal(name, metadata))
})

export default connect(mapState, mapDispatch)(CollectionDetailPage)
