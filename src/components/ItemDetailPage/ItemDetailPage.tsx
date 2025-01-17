import * as React from 'react'
import { ethers } from 'ethers'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Section, Row, Narrow, Column, Header, Button, Dropdown, Icon } from 'dcl-ui'
import { t } from 'dcl-dapps/dist/modules/translation/utils'
import { Link } from 'react-router-dom'

import { locations } from 'routing/locations'
import { WearableData } from 'modules/item/types'
import { Collection } from 'modules/collection/types'
import { Item } from 'modules/item/types'
import { isThirdParty } from 'lib/urn'
import { getBodyShapes, toBodyShapeType, getMaxSupply, getMissingBodyShapeType, isFree } from 'modules/item/utils'
import { getCollectionType, isLocked as isCollectionLocked } from 'modules/collection/utils'
import Notice from 'components/Notice'
import ItemProvider from 'components/ItemProvider'
import ConfirmDelete from 'components/ConfirmDelete'
import ItemImage from 'components/ItemImage'
import ItemStatus from 'components/ItemStatus'
import LoggedInDetailPage from 'components/LoggedInDetailPage'
import NotFound from 'components/NotFound'
import Back from 'components/Back'
import { Props } from './ItemDetailPage.types'
import './ItemDetailPage.css'

const STORAGE_KEY = 'dcl-item-notice'

export default class ItemDetailPage extends React.PureComponent<Props> {
  handleEditItem = () => {
    const { item, onNavigate } = this.props
    onNavigate(locations.itemEditor({ itemId: item!.id, collectionId: item!.collectionId }))
  }

  handleDeleteItem = () => {
    const { item, onDelete } = this.props
    onDelete(item!)
  }

  handleChangeItemFile = () => {
    const { item, onOpenModal } = this.props
    onOpenModal('CreateSingleItemModal', { item, changeItemFile: true })
  }

  handleAddRepresentationToItem = () => {
    const { item, onOpenModal } = this.props
    onOpenModal('CreateSingleItemModal', { item, addRepresentation: true })
  }

  handleEditURN = () => {
    const { item, onOpenModal } = this.props
    onOpenModal('EditItemURNModal', { item })
  }

  renderPage(item: Item, collection: Collection | null) {
    const { onNavigate } = this.props
    const data = item.data as WearableData

    const missingBodyShape = getMissingBodyShapeType(item)
    const isLocked = collection && isCollectionLocked(collection)
    const hasActions = !isLocked

    return (
      <>
        <Section>
          <Row>
            <Back onClick={() => onNavigate(locations.collectionDetail(item.collectionId))} />
            <Narrow>
              <Row className="page-header">
                <Column>
                  <Row className="header-row">
                    <Header className="name" size="huge">
                      <ItemStatus item={item} />
                      {item.name}
                    </Header>
                  </Row>
                </Column>
                <Column align="right" shrink={false} grow={false}>
                  <Row className="actions">
                    <Button primary compact onClick={this.handleEditItem}>
                      {t('global.open_in_editor')}
                    </Button>

                    {hasActions ? (
                      <Dropdown
                        trigger={
                          <Button basic>
                            <Icon name="ellipsis horizontal" />
                          </Button>
                        }
                        inline
                        direction="left"
                      >
                        <Dropdown.Menu>
                          {missingBodyShape ? (
                            <Dropdown.Item
                              text={t('item_detail_page.add_representation', {
                                bodyShape: t(`body_shapes.${missingBodyShape}`).toLowerCase()
                              })}
                              onClick={this.handleAddRepresentationToItem}
                            />
                          ) : (
                            <Dropdown.Item text={t('item_detail_page.change_item_file')} onClick={this.handleChangeItemFile} />
                          )}
                          {!item.isPublished ? (
                            <ConfirmDelete
                              name={item.name}
                              onDelete={this.handleDeleteItem}
                              trigger={<Dropdown.Item text={t('global.delete')} />}
                            />
                          ) : null}
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : null}
                  </Row>
                </Column>
              </Row>
            </Narrow>
          </Row>
        </Section>
        <Narrow>
          {!collection ? <Notice storageKey={STORAGE_KEY}>{t('item_detail_page.notice')}</Notice> : null}

          <div className="item-data">
            <ItemImage item={item} hasBadge={true} />
            <div className="sections">
              {item.isPublished && (
                <Section>
                  <div className="subtitle">{t('item.blockchain_id')}</div>
                  <div className="value">{item.tokenId}</div>
                </Section>
              )}
              {data.category ? (
                <Section>
                  <div className="subtitle">{t('item.category')}</div>
                  <div className="value">{t(`${item.type}.category.${data.category}`)}</div>
                </Section>
              ) : null}
              <Section>
                <div className="subtitle">{t('item.representation')}</div>
                <div className="value">
                  {getBodyShapes(item)
                    .map(bodyShape => t(`body_shapes.${toBodyShapeType(bodyShape)}`))
                    .join(', ')}
                </div>
              </Section>
              {item.rarity ? (
                <Section>
                  <div className="subtitle">{t('item.rarity')}</div>
                  <div className="value">{item.rarity}</div>
                </Section>
              ) : null}
              {isFree(item) ? (
                <Section>
                  <div className="subtitle">{t('item.price')}</div>
                  <div className="value">{t('global.free')}</div>
                </Section>
              ) : (
                <>
                  {item.price ? (
                    <Section>
                      <div className="subtitle">{t('item.price')}</div>
                      <div className="value">{ethers.utils.formatEther(item.price)}</div>
                    </Section>
                  ) : null}
                  {item.beneficiary ? (
                    <Section>
                      <div className="subtitle">{t('item.beneficiary')}</div>
                      <div className="value">{item.beneficiary}</div>
                    </Section>
                  ) : null}
                </>
              )}
              {item.urn ? (
                <Section>
                  <div className="subtitle">{t('global.urn')}</div>
                  <div className="value urn">
                    {item.urn}

                    <div className="urn-actions">
                      {isThirdParty(item.urn) ? (
                        <span className="link" onClick={this.handleEditURN}>
                          {t('item.edit_urn')}
                        </span>
                      ) : null}
                      <CopyToClipboard text={item.urn!}>
                        <span className="link">{t('item.copy_urn')}</span>
                      </CopyToClipboard>
                    </div>
                  </div>
                </Section>
              ) : null}
              {item.isPublished && item.rarity ? (
                <Section>
                  <div className="subtitle">{t('item.supply')}</div>
                  <div className="value">
                    {item.totalSupply}/{getMaxSupply(item)}
                  </div>
                </Section>
              ) : null}
              {collection ? (
                <Section>
                  <div className="subtitle">{t('item.collection')}</div>
                  <div className="value">
                    <Link to={locations.collectionDetail(collection.id, getCollectionType(collection))}>{collection.name}</Link>
                  </div>
                </Section>
              ) : null}
            </div>
          </div>
        </Narrow>
      </>
    )
  }

  render() {
    const { itemId, isLoading, hasAccess } = this.props
    return (
      <ItemProvider id={itemId}>
        {(item, collection, isLoadingItem) => (
          <LoggedInDetailPage className="ItemDetailPage" hasNavigation={!hasAccess && !isLoading} isLoading={isLoading || isLoadingItem}>
            {hasAccess && item ? this.renderPage(item, collection) : <NotFound />}
          </LoggedInDetailPage>
        )}
      </ItemProvider>
    )
  }
}
