import { useState } from 'react'
import Item from './Item.jsx'

export default function PackingList({ items, onRemoveItem, onToggleItemPacked, onClearItem }) {
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

