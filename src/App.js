import './App.css';
import {handleSubmit, getAllItems} from './handles/handleSubmit';
import { useEffect, useState } from 'react';

function App() {
  const [itemName, setItemName] = useState("");
  const [allItems, setAllItems] = useState([]);

  useEffect( ()=> {

    const fetchAllItems = async()=> {
      
        // this code will run, when page loads initially
        let data = await getAllItems();
        return data;
      
    }

    fetchAllItems().then(data=> {
      setAllItems(data);
    })
    


  } , [] )

  const handleAddItem = () => {
    if (!itemName.length) return alert("Please enter something");

    let original_arr = allItems;
    original_arr.push(itemName);

    //setAllItems([...allItems,itemName]);
    setAllItems(original_arr);
    setItemName("");
    // console.log(original_arr, allItems);
    handleSubmit(original_arr);
  }

  const handleRemove = (index) => {
    
    // allItems.splice(index,1)
    const newList = allItems.filter((ele, idx) => {
      return idx !== index
    });

    setAllItems([...newList]);
    handleSubmit(newList);

  }

  const handleEdit = (index) => {

    const newItem = prompt("Enter your Text");
    allItems[index] = newItem;

    // return setAllItems([...allItems]);
    setAllItems([...allItems]);
    handleSubmit(allItems);
  }

  return (
    <div id="container">
      <h2>Shopping Cart</h2>

      <div className="Toolbox">

        {/* <label >Add items</label> */}
        <input
          placeholder='Enter Your wishlist here'
          value={itemName}
          onChange={(e) => { setItemName(e.target.value) }}
          type="text"
          onKeyDown={(e) => (e.code === 'Enter' ? handleAddItem() : "")}
        />
        <button id='addItemBtn' className="btn btn-outline-light mx-3" onClick={handleAddItem}>Add Item</button>

      </div>

      <ol>
        {allItems.map((n, index) => (
          <li id={`list-item-${index}`} className='list' key={index}>{n}
            <div className="libtn">
              <button id='editBtn' className="btn btn-success btn-sm mx-3" type="button" onClick={() => handleEdit(index)}>
                Edit
              </button>
              <button id='removeBtn' className="btn btn-danger btn-sm" type="button" onClick={() => handleRemove(index)}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ol>

    </div>
  );
}

export default App;
