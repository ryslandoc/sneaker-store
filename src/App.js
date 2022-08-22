import React from "react";
import axios from "axios";
import './scss/style.scss';
import Header from "./components/Header";
import Card from "./components/Card";
import Drawer from "./components/Drawer";


function App() {
    const [cartOpen, setCartOpen] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');

    React.useEffect(() => {
        axios.get('https://62f8aacee0564480352b3b8f.mockapi.io/items')
            .then(res => setItems(res.data));
        axios.get('https://62f8aacee0564480352b3b8f.mockapi.io/cart')
            .then(res => setCartItems(res.data))
    }, []);

    const onAddToCart = (obj) => {
        axios.post('https://62f8aacee0564480352b3b8f.mockapi.io/cart', obj);
        setCartItems(prev => [...prev, obj]);
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }

    const onRemoveItemFromCart = (id) => {
        axios.delete(`https://62f8aacee0564480352b3b8f.mockapi.io/cart/${id}`);
        setCartItems(prev => prev.filter(item => item.id !== id));
    }

    return (
        <div className="wrapper">
            {cartOpen ? <Drawer
                onClickCloseCart={() => setCartOpen(false)}
                items={cartItems}
                onRemoveItem={onRemoveItemFromCart}
            /> : null}
            <Header onClickOpenCart={() => setCartOpen(true)}/>
            <div className="wrapper-title-search">
                <h1 className="title">
                    {searchValue ? `Пошук по запросу: "${searchValue}"` : 'Все кроссовки'}
                </h1>
                <div className="search-input">
                    <svg className="search-icon">
                        <use href="/images/sprite.svg#search"></use>
                    </svg>
                    <input type="text" placeholder="Пошук..." value={searchValue} onChange={onChangeSearchInput}/>
                    {searchValue &&
                        <svg className="search-clear" onClick={() => setSearchValue('')}>
                            <use href="/images/sprite.svg#plus"></use>
                        </svg>
                    }
                </div>
            </div>
            <ul className="card-list">
                {items
                    .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item) => {
                        return <Card
                            key={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            onAddButtonCard={(obj) => onAddToCart(obj)}
                        />
                    })}
                <li className="card-item"></li>
                <li className="card-item"></li>
            </ul>
        </div>
    );
}

export default App;
