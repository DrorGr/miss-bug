const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

import { Home } from './pages/Home.jsx'
import { BugApp } from './cmps/BugApp.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { UserLogin } from './cmps/UserLogin.jsx'
import { SignUp } from './cmps/SignUp.jsx'



// Simple React Component
export class App extends React.Component {

    render() {

        return (

            <Router>
                <AppHeader />
                <main className="app">
                    <Switch>
                        {/* <Route path="/life" render={props => <Life sayHello = {this.sayHello} />} /> */}

                        <Route component={SignUp} path={'/signup'} />
                        <Route component={UserLogin} path={'/login'} />
                        <Route component={BugApp} path={'/bug'} />
                        <Route component={Home} path={'/'} />
                    </Switch>
                </main>
                <footer>

                </footer>

            </Router>
        )
    }
}