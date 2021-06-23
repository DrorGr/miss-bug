const { NavLink } = ReactRouterDOM

export class AppHeader extends React.Component {
    render() {
        return (
            <header>
                <nav>
                    <ul>
                        <li>
                        <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                        <NavLink to="/bug">Bug List</NavLink>
                        </li>
                        <li>
                        <NavLink to="/login">Login Page</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}
