import { useState } from 'react'
import '../App.css'
import Form from './Form.jsx'
import Logo from './Logo.jsx'
import PackingList from './PackingList.jsx'
import Stats from './Stats.jsx'

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
export default App
