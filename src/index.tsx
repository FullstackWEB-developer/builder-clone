import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import axios from 'axios'

import ModalProvider from 'dcl-dapps/dist/providers/ModalProvider'
import ToastProvider from 'dcl-dapps/dist/providers/ToastProvider'
import TranslationProvider from 'dcl-dapps/dist/providers/TranslationProvider'
import WalletProvider from 'dcl-dapps/dist/providers/WalletProvider'

import { store, history } from 'modules/common/store'
import * as modals from 'components/Modals'
import * as languages from 'modules/translation/languages'
import Routes from 'routing'

import './modules/analytics/track'
import './modules/analytics/rollbar'
import './themes'
import './index.css'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

ReactDOM.render(
  <Provider store={store}>
    <DragDropContextProvider backend={HTML5Backend}>
      <TranslationProvider locales={Object.keys(languages)}>
        <WalletProvider>
          <ModalProvider components={modals}>
            <ToastProvider>
              <ConnectedRouter history={history}>
                <Routes />
              </ConnectedRouter>
            </ToastProvider>
          </ModalProvider>
        </WalletProvider>
      </TranslationProvider>
    </DragDropContextProvider>
  </Provider>,
  document.getElementById('root')
)
