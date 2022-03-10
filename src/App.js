import {Switch, Route} from 'react-router-dom'
// import LoginPageCopy from './components/AdminUI'

import AIFalcon from './components/AiFalcone'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={AIFalcon} />
  </Switch>
)

export default App
