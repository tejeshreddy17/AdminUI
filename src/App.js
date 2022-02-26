import {Switch, Route} from 'react-router-dom'
import LoginPageCopy from './components/AdminUI'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={LoginPageCopy} />
  </Switch>
)

export default App
