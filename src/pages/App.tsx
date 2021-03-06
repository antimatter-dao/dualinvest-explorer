import { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { styled } from '@mui/material'
import Header from '../components/Header'
import Polling from '../components/essential/Polling'
import Popups from '../components/essential/Popups'
import Web3ReactManager from '../components/essential/Web3ReactManager'
import WarningModal from '../components/Modal/WarningModal'
import { ModalProvider } from 'context/ModalContext'
import Footer from 'components/Footer'
import { routes } from 'constants/routes'
import Home from './Home'
import Order from './Order'
import Product from './Product'
import Address from './Address'

const AppWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  overflowX: 'auto',
  minWidth: 300,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
    // height: '100vh'
  }
}))

const ContentWrapper = styled('div')({
  width: '100%',
  // maxHeight: '100vh',
  overflow: 'auto',
  alignItems: 'center'
})

const BodyWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: `calc(100vh - ${theme.height.header})`,
  padding: '0 0 80px',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  overflowY: 'auto',
  overflowX: 'auto',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    minHeight: `calc(100vh  - ${theme.height.mobileHeader})`
  }
}))

export default function App() {
  return (
    <Suspense fallback={null}>
      <ModalProvider>
        <AppWrapper id="app">
          <ContentWrapper>
            <Header />
            <BodyWrapper id="body">
              <Popups />
              <Polling />
              <WarningModal />
              <Web3ReactManager>
                <Switch>
                  <Route exact strict path={routes.home} component={Home} />
                  <Route exact strict path={routes.explorerOrder} component={Order} />
                  <Route exact strict path={routes.explorerProduct} component={Product} />
                  <Route exact strict path={routes.explorerAddress} component={Address} />
                  <Route path="/">
                    <Redirect to={routes.home} />
                  </Route>
                </Switch>
              </Web3ReactManager>
            </BodyWrapper>
            <Footer />
          </ContentWrapper>
        </AppWrapper>
      </ModalProvider>
    </Suspense>
  )
}
