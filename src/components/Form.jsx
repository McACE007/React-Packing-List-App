import { useState } from 'react'

export default function Form({ onAddItem }) {
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
