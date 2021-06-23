

export class BugPreview extends React.Component {

    onDeletebug = (id) => {
        this.props.deleteBug(id)
    }

    render() {
        // console.log('this.props =', this.props)
        const { bug } = this.props
        // const time = bug.createdAt.toLocaleDateString()
        return (
            <tr>
                <td>{bug.title}</td>
                <td>{bug.description}</td>
                <td>{bug.createdAt}</td>
                <td>{bug.severity}</td>
                <td>{bug.creator.nickname}</td>

                <td><button onClick={() => this.onDeletebug(bug._id)}>x</button></td>

            </tr>
        )
    }
}
