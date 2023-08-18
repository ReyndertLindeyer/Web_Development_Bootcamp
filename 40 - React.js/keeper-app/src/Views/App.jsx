import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes"

/*
function createNotes(noteInfo){
  return(
    <Note 
    key={noteInfo.key}
    title={noteInfo.title}
    content={noteInfo.content}
     />
  )
}
*/

function App() {
  return (
    <div>
      <Header />
      {notes.map(noteItem => <Note 
        key={noteItem.key}
        title={noteItem.title}
        content={noteItem.content}
        />)}
      <Footer />
      
    </div>
  );
}

export default App;