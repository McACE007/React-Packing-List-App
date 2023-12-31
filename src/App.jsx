import { useState } from 'react'
import './App.css'

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

function App() {
  return (
    <>
      <div className="app">
        <Logo />
        <Form />
        <PackingList />
        <Stats />
      </div>
    </>
  )
}

function Logo() {
 return (
  <h1>🌴 Far Away 🎒</h1>
 ); 
}

function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(5);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form className="add-form">
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={e => setQuantity(e.target.value * 1)}>
        {Array.from({length: 20}, (_, i) => i + 1).map
          (num =>  
            <option 
            value={num}>{num}
            </option>)}
      </select>
      <input 
        type="text" 
        placeholder="Item..." 
        value={description} 
        onChange={e => setDescription(e.target.value)}
      />
      <button onSubmit={handleSubmit}>ADD</button>
    </form>
  );
}

function PackingList() {
 return (
    <div className="list">
      <ul>
        {initialItems.map(item => <Item item={item} key={item.id} />)}
      </ul>
    </div>
 ); 
}

function Stats() {
  return (
    <footer className="stats">
      <em>🎒 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}

function Item({item}) {
  return (
    <li>
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick>❌</button>
    </li>
  );
}

export default App
