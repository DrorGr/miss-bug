
export class AddBug extends React.Component {

    onAddBug = () => {
        const title = prompt('What is the title?')
        const newBug = {
            title,
            description: 'Will it ever work?',
            severity: 2,
            createdAt: Date.now(),
            creator: { nickname: 'from FE' }
        }
        this.props.addBug(newBug)
    }

    render() {
        return (
            <section>
                <button onClick={this.onAddBug}>Add a new bug</button>
            </section>
        )
    }
}
