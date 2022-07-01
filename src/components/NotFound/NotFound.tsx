import { Center } from 'dcl-ui'
import { t } from 'dcl-dapps/dist/modules/translation/utils'

export default function NotFound() {
  return (
    <Center>
      <span className="secondary-text">{t('global.not_found')}&hellip;</span>
    </Center>
  )
}
