import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

function App() {
  const [items, setItems] = useState('');
  const [lists, setLists] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  });

  const handleAddItems = (e) => {
    e.preventDefault();
    if (!items) {
      //display alert
      // setAlert();
      showAlert(true, 'danger', 'please entering a value');
    } else if (items && isEditing) {
      //deal with edit
      setLists(
        lists.map((item) => {
          if (item.id === editId) {
            return { ...item, title: items };
          }
          return item;
        })
      );
      setItems('');
      setEditId(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed');
    } else {
      //show alert
      showAlert(true, 'success', 'item added to the list');
      const newItem = { id: new Date().getTime().toString(), title: items };
      setLists([...lists, newItem]);
      setItems('');
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({
      show,
      msg,
      type,
    });
  };

  const handleClearAll = () => {
    showAlert(true, 'danger', 'all items has been removed');
    setLists([]);
  };

  const handleEdit = (id) => {
    console.log(id);
    showAlert(true, 'danger', 'you can edit items now');
    const specificItem = lists.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setItems(specificItem.title);
  };

  const handleDelete = (id) => {
    console.log('delete');
    showAlert(true, 'danger', 'items removed');
    setLists(lists.filter((item) => item.id !== id));
  };

  return (
    <div className="section-center">
      <form className="grocery-form" onSubmit={handleAddItems}>
        {alert.show && (
          <Alert {...alert} removeAlert={showAlert} lists={lists} />
        )}
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

      {lists.length > 0 && (
        <div className="gorcery-container">
          <List
            items={lists}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <button className="clear-btn" onClick={handleClearAll}>
            Clear items
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
