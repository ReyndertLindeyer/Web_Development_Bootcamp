import React from "react";
import Term from "./Term";
import emojipedia from "../emojipedia";

function createTerm(emote) {
  return (
    <Term
      key={emote.id}
      emoji={emote.emoji}
      name={emote.name}
      meaning={emote.meaning}
    />
  );
}

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">{emojipedia.map(createTerm)}</dl>
    </div>
  );
}

export default App;
