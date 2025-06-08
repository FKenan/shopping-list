import { useState } from "react";

const data = [
  { id: 1, title: "Yumurta", quantity: 10, completed: true },
  { id: 2, title: "Ekmek", quantity: 2, completed: true },
  { id: 3, title: "Süt", quantity: 1, completed: false },
  { id: 4, title: "Et", quantity: 1, completed: false },
  { id: 5, title: "Zeytin", quantity: 2, completed: true },
];

function App() {
  const [items, setItems] = useState(data);
  function handleAddItem(item) {
    setItems((items) => [...items, item]); // [{ id: 1, title: "Yumurta", quantity: 10, completed: true } gibi ...items itemstaki verileri verir, {item yani bizim nesnemiz}]
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  // ...item = { id: 1, title: "Yumurta", quantity: 10, completed: true } demektir
  // ...items = { id: 1, title: "Yumurta", quantity: 10, completed: true }, { id: 2, title: "Ekmek", quantity: 2, completed: true }, ... demektir.
  function handleUpdateItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    ); // ...item nesneyi verir completed'i sona ekleyerek önceki completed i ezeriz
  }

  function handleClearList() {
    const onay = window.confirm(
      "Listedeki tüm ürünleri silmek istediğinizden eminmisiniz?"
    ); // onay verilirse true verilmezse false döner.
    if (onay) {
     setItems([]);
    }
  }

  return (
    <div>
      <Header />
      <Form handleAddItem={handleAddItem} handleClearList={handleClearList} />
      <List
        items={items}
        handleDeleteItem={handleDeleteItem}
        handleUpdateItem={handleUpdateItem}
      />
      <Summary items={items} />
    </div>
  );
}

function Header() {
  return <h2>🛒Shopping List</h2>;
}

// {} içinde tek tek parametreleri yazabiliriz yada direk props parametresininden alabiliriz
function Form({ handleAddItem, handleClearList }) {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleFormSubmit(e) {
    e.preventDefault(); // sayfa yenilenmesini engeller. !!!
    if (title) {
      const item = {
        id: Date.now(),
        title: title,
        quantity: quantity,
        completed: false,
      };

      handleAddItem(item);

      setTitle("");
      setQuantity(1);
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Ürün adı giriniz"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 10 }, (v, i) => i + 1).map((num) => (
          <option key={num}>{num}</option>
        ))}
        {/* birden ona kadar yazar */}
      </select>
      <button type="submit">Ekle</button>
      <button type="button" onClick={handleClearList}>
        Temizle
      </button>{" "}
      {/* fonksiyon parametre almıyorsa direk ismi yazılır.alıyorsa ()=> ile birlikte kullanılır*/}
    </form>
  );
}

function List({ items, handleDeleteItem, handleUpdateItem }) {
  return (
    <>
      {items.length > 0 ? (
        <div className="list">
          <ul>
            {items.map((item) => (
              <Item
                item={item}
                key={item.id}
                handleDeleteItem={handleDeleteItem}
                handleUpdateItem={handleUpdateItem}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div>Sepette ürün yok!</div>
      )}
    </>
  );
}
// props parametresiyle elemanlara ulaşabiliriz. yada {} içinde tek tek tanımlarız.
function Item(props) {
  return (
    <li>
      <input
        type="checkbox"
        checked={props.item.completed}
        onChange={() => props.handleUpdateItem(props.item.id)}
      />
      <span
        style={props.item.completed ? { textDecoration: "line-through" } : {}}
      >
        {props.item.quantity}
        {props.item.title}{" "}
      </span>
      <button onClick={() => props.handleDeleteItem(props.item.id)}>X</button>
    </li>
  );
}

function Summary({ items }) {
  const itemCount = items.length;
  const completedItemsCount = items.filter(
    (item) => item.completed === true
  ).length;

  if (itemCount === 0) {
    return (
      <footer>
        <p>Alışveriş listenizi hazırlamaya başlayablirsiniz!</p>
      </footer>
    );
  } else {
    return (
      <footer className="summary">
        {itemCount === completedItemsCount ? (
          <p>Alışverişi tamamladınız</p>
        ) : (
          <p>
            Alışveriş sitenizdeki {itemCount} üründen {completedItemsCount}{" "}
            tanesini tamamladınız!
          </p>
        )}
      </footer>
    );
  }
}
export default App;
