import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

function App() {
  const [items, setItems] = useState('');
  const [lists, setLists] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  const handleAddItems = (e) => {
    e.preventDefault();
    setLists((prev) => [...prev, items]);
    setAlert(true);
  };

  return (
    <div className="section-center">
      <form className="grocery-form" onSubmit={handleAddItems}>
        {alert.show && <Alert />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            className="grocery"
            type="text"
            placeholder="e.g. eggs"
            value={items}
            onChange={(e) => setItems(e.target.value)}
          ></input>
          <button type="submit" className="submit-btn">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>

      <div className="gorcery-container">
        {lists.map((list, index) => {
          console.log(list);
          return <List key={index} list={list} />;
        })}
        <button className="clear-btn">Clear items</button>
      </div>
    </div>
  );
}

export default App;
