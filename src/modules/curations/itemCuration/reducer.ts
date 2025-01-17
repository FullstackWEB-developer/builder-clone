import { loadingReducer, LoadingState } from 'dcl-dapps/dist/modules/loading/reducer'
import {
  DeployBatchedThirdPartyItemsSuccessAction,
  DEPLOY_BATCHED_THIRD_PARTY_ITEMS_SUCCESS,
  PublishAndPushChangesThirdPartyItemsFailureAction,
  PublishAndPushChangesThirdPartyItemsRequestAction,
  PublishAndPushChangesThirdPartyItemsSuccessAction,
  PublishThirdPartyItemsFailureAction,
  PublishThirdPartyItemsRequestAction,
  PublishThirdPartyItemsSuccessAction,
  PUBLISH_AND_PUSH_CHANGES_THIRD_PARTY_ITEMS_FAILURE,
  PUBLISH_AND_PUSH_CHANGES_THIRD_PARTY_ITEMS_REQUEST,
  PUBLISH_AND_PUSH_CHANGES_THIRD_PARTY_ITEMS_SUCCESS,
  PUBLISH_THIRD_PARTY_ITEMS_FAILURE,
  PUBLISH_THIRD_PARTY_ITEMS_REQUEST,
  PUBLISH_THIRD_PARTY_ITEMS_SUCCESS,
  PushChangesThirdPartyItemsFailureAction,
  PushChangesThirdPartyItemsRequestAction,
  PushChangesThirdPartyItemsSuccessAction,
  PUSH_CHANGES_THIRD_PARTY_ITEMS_FAILURE,
  PUSH_CHANGES_THIRD_PARTY_ITEMS_REQUEST,
  PUSH_CHANGES_THIRD_PARTY_ITEMS_SUCCESS
} from 'modules/thirdParty/actions'
import {
  FETCH_ITEM_CURATIONS_REQUEST,
  FETCH_ITEM_CURATIONS_SUCCESS,
  FETCH_ITEM_CURATIONS_FAILURE,
  FetchItemCurationsRequestAction,
  FetchItemCurationsFailureAction,
  FetchItemCurationsSuccessAction,
  FETCH_ITEM_CURATION_SUCCESS,
  FetchItemCurationSuccessAction,
  FETCH_ITEM_CURATION_REQUEST,
  FetchItemCurationFailureAction,
  FetchItemCurationRequestAction,
  FETCH_ITEM_CURATION_FAILURE
} from './actions'
import { ItemCuration } from './types'

export type ItemCurationState = {
  data: Record<string, ItemCuration[]>
  loading: LoadingState
  error: string | null
}

export const INITIAL_STATE: ItemCurationState = {
  data: {},
  loading: [],
  error: null
}

type CurationReducerAction =
  | FetchItemCurationRequestAction
  | FetchItemCurationSuccessAction
  | FetchItemCurationFailureAction
  | FetchItemCurationsRequestAction
  | FetchItemCurationsSuccessAction
  | FetchItemCurationsFailureAction
  | PublishThirdPartyItemsRequestAction
  | PublishThirdPartyItemsSuccessAction
  | PublishThirdPartyItemsFailureAction
  | PushChangesThirdPartyItemsRequestAction
  | PushChangesThirdPartyItemsSuccessAction
  | PushChangesThirdPartyItemsFailureAction
  | PublishAndPushChangesThirdPartyItemsRequestAction
  | PublishAndPushChangesThirdPartyItemsSuccessAction
  | PublishAndPushChangesThirdPartyItemsFailureAction
  | DeployBatchedThirdPartyItemsSuccessAction

export function itemCurationReducer(state: ItemCurationState = INITIAL_STATE, action: CurationReducerAction): ItemCurationState {
  switch (action.type) {
    case PUBLISH_THIRD_PARTY_ITEMS_REQUEST:
    case PUSH_CHANGES_THIRD_PARTY_ITEMS_REQUEST:
    case PUBLISH_AND_PUSH_CHANGES_THIRD_PARTY_ITEMS_REQUEST:
    case FETCH_ITEM_CURATION_REQUEST:
    case FETCH_ITEM_CURATIONS_REQUEST:
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    case FETCH_ITEM_CURATION_SUCCESS: {
      const { collectionId, itemCuration } = action.payload
      const oldCurations = state.data[collectionId]?.filter(c => c.itemId !== itemCuration?.itemId) || []

      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        data: {
          ...state.data,
          [collectionId]: [...oldCurations, itemCuration]
        },
        error: null
      }
    }
    case DEPLOY_BATCHED_THIRD_PARTY_ITEMS_SUCCESS: {
      const { collection, itemCurations } = action.payload

      return {
        ...state,
        data: {
          ...state.data,
          [collection.id]: [...itemCurations]
        }
      }
    }
    case FETCH_ITEM_CURATIONS_SUCCESS: {
      const { itemCurations, collectionId } = action.payload
      const currentItemCurations = state.data[collectionId]
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        data: {
          ...state.data,
          [collectionId]: currentItemCurations
            ? [
                ...currentItemCurations.filter(itemCuration => !itemCurations.find(curation => curation.itemId === itemCuration.itemId)),
                ...itemCurations
              ]
            : itemCurations
        },
        error: null
      }
    }
    case PUBLISH_THIRD_PARTY_ITEMS_SUCCESS: {
      const { itemCurations, collectionId } = action.payload
      const oldItemCurations = state.data[collectionId]
      const mergedItemCurations = oldItemCurations ? [...oldItemCurations, ...itemCurations] : [...itemCurations]
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        data: {
          ...state.data,
          [collectionId]: mergedItemCurations
        },
        error: null
      }
    }
    case PUSH_CHANGES_THIRD_PARTY_ITEMS_SUCCESS:
    case PUBLISH_AND_PUSH_CHANGES_THIRD_PARTY_ITEMS_SUCCESS: {
      const { itemCurations: newItemCurations, collectionId } = action.payload
      const oldItemCurations = state.data[collectionId]
      const newCurationsItemIds = newItemCurations.map(newItemCuration => newItemCuration.itemId)
      const oldCurationsNotIncludedInNewOnes = oldItemCurations.filter(
        oldItemCuration => !newCurationsItemIds.includes(oldItemCuration.itemId)
      )

      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        data: {
          ...state.data,
          [collectionId]: [...oldCurationsNotIncludedInNewOnes, ...newItemCurations]
        },
        error: null
      }
    }
    case PUBLISH_AND_PUSH_CHANGES_THIRD_PARTY_ITEMS_FAILURE:
    case PUBLISH_THIRD_PARTY_ITEMS_FAILURE:
    case PUSH_CHANGES_THIRD_PARTY_ITEMS_FAILURE:
    case FETCH_ITEM_CURATIONS_FAILURE:
    case FETCH_ITEM_CURATION_FAILURE:
      const { error } = action.payload

      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error
      }
    default:
      return state
  }
}
