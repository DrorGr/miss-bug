import { BugPreview } from './BugPreview.jsx';

export function BugList(props) {
    // console.log('props =', props)
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Created at</th>
                        <th>Severity</th>
                        <th>Created by</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {props.bugs.map(bug => <BugPreview key={bug._id} bug={bug} {...props} />)} */}
                    {props.bugs.map(bug => <BugPreview key={bug._id} bug={bug} deleteBug={props.deleteBug} />)}
                </tbody>
            </table>
        </div>
    )
}
