import { useState } from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleRemoveItem(id) {
    setItems((items) => items.filter(item => item.id !== id));
  }

  function handleClearItem() {
    const confirmed = window.confirm("Are you sure you want to delete all Items?");
    if (confirmed) setItems([]);
  }

  function handleToggleItemPacked(id) {
    setItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, packed: !item.packed }
          : item));
  }

  return (
    <>
      <div className="app">
        <Logo />
        <Form onAddItem={handleAddItem} />
        <PackingList items={items} onRemoveItem={handleRemoveItem} onToggleItemPacked={handleToggleItemPacked} onClearItem={handleClearItem} />
        <Stats items={items} />
      </div>
    </>
  );
}

function Logo() {
  return (
    <h1>🌴 Far Away 🎒</h1>
  );
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    onAddItem({
      id: Date.now(),
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
        {Array.from({ length: 20 }, (_, i) => i + 1).map
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

function PackingList({ items, onRemoveItem, onToggleItemPacked, onClearItem }) {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  if (sortBy === 'input') sortedItems = items;
  else if (sortBy === 'description') {
    sortedItems = items
      .slice()
      .sort((a, b) =>
        a.description.localeCompare(b.description));
  }
  else if (sortBy === 'packed') {
    sortedItems = items
      .slice().
      sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map(item =>
          <Item
            item={item}
            key={item.id}
            onRemoveItem={onRemoveItem}
            onToggleItemPacked={onToggleItemPacked}
          />)}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="input">Sort By Input Order</option>
          <option value="description">Sort By Description</option>
          <option value="packed">Sort By Packed Status</option>
        </select>
        <button onClick={onClearItem}>Clear List</button>
      </div>
    </div>
  );
}

function Stats({ items }) {

  if (!items.length) return (
    <p className="stats">
      <em>Start adding some items to your packing list 🚀</em>
    </p>
  );

  const numItems = items.length;
  const numPacked = items.filter(item => item.packed).length;
  const packedPercent = Math.round(numPacked / numItems * 100);

  return (
    <footer className="stats">
      <em>
        {
          (packedPercent === 100)
            ? "You got everything! Ready to go 🛫"
            : `🎒 You have ${numItems} items on your list, and you already packed ${numPacked} (${packedPercent}%)`
        }
      </em>

    </footer>
  );
}

function Item({ item, onRemoveItem, onToggleItemPacked }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItemPacked(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onRemoveItem(item.id)}>❌</button>
    </li>
  );
}

export default App
