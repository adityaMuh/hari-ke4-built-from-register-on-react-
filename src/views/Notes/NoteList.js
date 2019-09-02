import React from 'react';


class NotesList extends React.Component {
    render() {
        return (
            <div className="list">
                {
                    this.props.notes.map((note)=> {
                        return <p key={note.id}>{note.name}</p>
                    })
                }
            </div>
        )
    }
}

export default NotesList;