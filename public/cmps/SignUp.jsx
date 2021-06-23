import { userService } from '../services/user-service.js'
export class SignUp extends React.Component {

    state = {
        fullname: '',
        username: '',
        password: '',
    }

    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        this.setState({ ...this.state, [field]: value })
    }

    onSignUp = () => {
        console.log('Subbmited =')
        const { fullname, username, password } = this.state

        userService.signup({ fullname, username, password })
            .then(user => {
                console.log('user after saving =', user)
            })
            .catch(err => {
                console.log('Something went wrong')
            })
    }

    render() {
        const { fullname, username, password } = this.state
        return (

            <div>
                <h1>Sign up</h1>
                <form action="" onSubmit={(ev) => {
                    ev.preventDefault()
                    this.onSignUp()
                }}>

                    <label htmlFor="fullname">Full name:</label>
                    <input type="text" id="fullname" name="fullname" value={fullname} onChange={this.handleChange} />

                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={username} onChange={this.handleChange} />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={this.handleChange} />

                    <button>Create an account</button>
                </form>

            </div>
        )
    }
}
