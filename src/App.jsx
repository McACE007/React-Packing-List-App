import { useState } from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  return (
    <>
      <div className="app">
        <Logo />
        <Form onAddItem={handleAddItem}/>
        <PackingList items={items}/>
        <Stats />
      </div>
    </>
  );
}

function Logo() {
 return (
  <h1>🌴 Far Away 🎒</h1>
 ); 
}

function Form({onAddItem}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if(!description) return;
   
    onAddItem({
      id: Data.now(),
      quantity: quantity,
      description: description,
      packed: false
    });

    setQuantity(1);
    setDescription("");
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
      <button onClick={handleSubmit}>ADD</button>
    </form>
  );
}

function PackingList({items}) {
 return (
    <div className="list">
      <ul>
        {items.map(item => <Item item={item} key={item.id} />)}
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
      <button>❌</button>
    </li>
  );
}

export default App
