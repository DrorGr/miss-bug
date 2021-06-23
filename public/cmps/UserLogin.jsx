import { userService } from '../services/user-service.js'
const { Link } = ReactRouterDOM


export class UserLogin extends React.Component {
    state = {
        currUser: null,
        nickname: '',
        password: ''
    }

    componentDidMount() {
        const currUser = userService.getLoggedinUser()
        if (currUser) {
            this.setState({ currUser })
        }
    }

    onLogin = () => {
        const nickname = prompt('Your name please')
        const password = prompt('Your password please')
        userService.login({ nickname, password })
            .then((user) => {
                console.log('user =', user)
                this.setState({ currUser: user }, () => {
                    this.props.history.push('/bug')
                })
            })
    }

    render() {
        return (
            <div>
                <h1>Your user page</h1>

                {!this.state.currUser &&
                    <div>
                        <button onClick={this.onLogin}>Log me in</button>
                       <Link to="/signup">Sign up</Link>
                    </div>}

                {this.state.currUser &&
                    <div>
                        Hello {this.state.currUser.fullname}!  <Link to="/bug">click here to see the updated list of bugs</Link>
                    </div>}
            </div>
        )
    }
}
