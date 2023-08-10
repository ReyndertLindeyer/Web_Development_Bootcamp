import React from "react";
import contacts from "../contacts";
import Card from "./Card";

function App() {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>
      <Card
        name={contacts[0].name}
        src={contacts[0].imgURL}
        phoneNumber={contacts[0].phone}
        email={contacts[0].email}
      />
      <Card
        name={contacts[1].name}
        src={contacts[1].imgURL}
        phoneNumber={contacts[1].phone}
        email={contacts[1].email}
      />
      <Card
        name={contacts[2].name}
        src={contacts[2].imgURL}
        phoneNumber={contacts[2].phone}
        email={contacts[2].email}
      />
    </div>
  );
}

export default App;
