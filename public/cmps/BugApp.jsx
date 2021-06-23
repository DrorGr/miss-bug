
import { bugService } from '../services/bug-service.js'
import { userService } from '../services/user-service.js'

import { BugList } from './BugList.jsx'
import { AddBug } from './AddBug.jsx'
import { UserLogin } from './UserLogin.jsx'


export class BugApp extends React.Component {
    state = {
        bugs: null,
        currUser: userService.getLoggedinUser()
    }

    componentDidMount() {
        const { currUser } = this.state
        if (!currUser) {
            this.props.history.push('/login')
            return
        }
        bugService.query()
            .then(bugs => {
                console.log('Bugs from server =', bugs)
                this.setState({ bugs })
            })
    }

    addBug = (newBug) => {
        console.log('BugApp to add new bug =', newBug)
        bugService.save(newBug)
            .then(newBug => this.setState({ bugs: [newBug, ...this.state.bugs] }))
    }

    deleteBug = (id) => {
        bugService.remove(id)
            .then(() => {
                let { bugs } = this.state
                bugs = bugs.filter(bug => bug._id !== id)
                this.setState({ bugs })
            })
    }

    onLogOut = () => {
        userService.logout()
        this.setState({ ...this.state, currUser: null })
    }

    render() {
        console.log('this.state.currUser =', this.state.currUser)
        const { bugs } = this.state
        if (!bugs) return <div>Loading....</div>
        return (<React.Fragment>
            <section>
                <h1>Bug report</h1>
                {this.state.currUser &&
                    <React.Fragment>
                        <p>Hello {this.state.currUser.fullname}</p>
                        <button onClick={this.onLogOut}>Log me out</button>
                    </React.Fragment>}
            </section>
            <section>
                {/* {!this.state.currUser && <UserLogin updateUser={this.updateUser} />} */}
                <AddBug addBug={this.addBug} />
                <BugList bugs={bugs} deleteBug={this.deleteBug} isOwner={this.isOwner} />
            </section>
        </React.Fragment>

        )
    }
}
