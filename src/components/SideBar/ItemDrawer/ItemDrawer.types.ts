import { Dispatch } from 'redux'
import { GridProps } from 'decentraland-ui'
import { Category, SidebarView } from 'modules/ui/sidebar/types'
import { Asset } from 'modules/asset/types'
import { addItem, AddItemAction, setGround, SetGroundAction } from 'modules/scene/actions'
import {
  searchAssets,
  SearchAssetsAction,
  setSidebarView,
  SetSidebarViewAction,
  SelectCategoryAction,
  selectCategory
} from 'modules/ui/sidebar/actions'
import { Project } from 'modules/project/types'

export type DefaultProps = {
  columnCount: GridProps['columns']
  onClick: (asset: Asset) => any
}

export type Props = DefaultProps & {
  categories: Category[]
  selectedCategory: string | null
  view: SidebarView
  search: string
  isLoading?: boolean
  project: Project | null
  onAddItem: typeof addItem
  onSearch: typeof searchAssets
  onSetSidebarView: typeof setSidebarView
  onSelectCategory: typeof selectCategory
  onSetGround: typeof setGround
}

export type MapStateProps = Pick<Props, 'categories' | 'selectedCategory' | 'search' | 'view' | 'isLoading' | 'project'>
export type MapDispatchProps = Pick<Props, 'onAddItem' | 'onSearch' | 'onSetSidebarView' | 'onSelectCategory' | 'onSetGround'>
export type MapDispatch = Dispatch<AddItemAction | SearchAssetsAction | SetSidebarViewAction | SelectCategoryAction | SetGroundAction>

export type State = {
  search: string
}
