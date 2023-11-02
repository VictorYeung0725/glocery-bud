import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
const List = ({ items, handleDelete, handleEdit }) => {
  console.log(items);

  return (
    <div className="grocery-container">
      {items.map((item, index) => {
        const { id, title } = item;
        return (
          <article key={id} className="grocery-item">
            <p className="title">{`${index + 1}:${title}`}</p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => handleEdit(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                //Wrong approach because this will call immediately and each time when the component render/re-render
                // onClick={handleDelete(id)}
                onClick={() => handleDelete(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
