import { connect } from 'react-redux'
import { getAddress } from 'dcl-dapps/dist/modules/wallet/selectors'
import { isLoadingType } from 'dcl-dapps/dist/modules/loading/selectors'
import { RootState } from 'modules/common/types'
import { getLoading, getError } from 'modules/collection/selectors'
import { SAVE_COLLECTION_REQUEST, saveCollectionRequest } from 'modules/collection/actions'
import { MapStateProps, MapDispatchProps, MapDispatch } from './CreateCollectionModal.types'
import CreateCollectionModal from './CreateCollectionModal'

const mapState = (state: RootState): MapStateProps => ({
  address: getAddress(state),
  isLoading: isLoadingType(getLoading(state), SAVE_COLLECTION_REQUEST),
  error: getError(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onSubmit: collection => dispatch(saveCollectionRequest(collection))
})

export default connect(mapState, mapDispatch)(CreateCollectionModal)
