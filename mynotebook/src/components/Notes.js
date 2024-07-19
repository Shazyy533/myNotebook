import {useContext} from 'react'
import NoteContext from "../context/notes/NoteContext";
import NoteItem from './NoteItem'

const Notes = () => {
  const { note } = useContext(NoteContext); // Use useContext directly to get note

  return (
    
      <div className="row my-3">
        <h2>Your Notes :</h2>
        {note.map((note) => (
          <div key={note._id}>
            <NoteItem note={note}/>
          </div>
        ))}
      </div>
    
  )
}

export default Notes
