import { ModalProps } from 'dcl-dapps/dist/providers/ModalProvider/ModalProvider.types'
import { DecodedURN, URN, URNType } from 'lib/urn'

export type State = {
  newURNSection: string
}

export type Props = ModalProps & {
  elementName: string
  urn: URN
  isLoading: boolean
  error: string | null
  onBuildURN: (decodedURN: DecodedURN<URNType.COLLECTIONS_THIRDPARTY>, newURNSection: string) => string
  onSave: (newURN: string) => void
}
