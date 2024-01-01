export default function Item({ item, onRemoveItem, onToggleItemPacked }) {
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
