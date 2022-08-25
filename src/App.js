import React from "react";
import axios from "axios";
import {Routes, Route} from 'react-router-dom';
import './scss/style.scss';
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
    const [cartOpen, setCartOpen] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [favorites, setFavorites] = React.useState([]);

    React.useEffect(() => {
        axios.get('https://62f8aacee0564480352b3b8f.mockapi.io/items')
            .then(res => setItems(res.data));
        axios.get('https://62f8aacee0564480352b3b8f.mockapi.io/cart')
            .then(res => setCartItems(res.data))
        axios.get('https://62f8aacee0564480352b3b8f.mockapi.io/favorite')
            .then(res => setFavorites(res.data))
    }, []);

    const onAddToCart = (obj) => {
        axios.post('https://62f8aacee0564480352b3b8f.mockapi.io/cart', obj);
        setCartItems(prev => [...prev, obj]);
    }

    const onRemoveItemFromCart = (id) => {
        axios.delete(`https://62f8aacee0564480352b3b8f.mockapi.io/cart/${id}`);
        setFavorites(prev => prev.filter(item => item.id !== id));
    }

    const onAddToFavorite = (obj) => {
        axios.post('https://62f8aacee0564480352b3b8f.mockapi.io/favorite', obj);
        setCartItems(prev => [...prev, obj]);
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }

    return (
        <div className="wrapper">
            {cartOpen ? <Drawer
                onClickCloseCart={() => setCartOpen(false)}
                items={cartItems}
                onRemoveItem={onRemoveItemFromCart}
            /> : null}
            <Header onClickOpenCart={() => setCartOpen(true)}/>

            <Routes>
                <Route path="/favorites" element={
                    <Favorites items={favorites}/>
                }></Route>
                <Route path="/" element={
                    <Home
                        items={items}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToCart={onAddToCart}
                        onAddToFavorite={onAddToFavorite}
                    />
                } exact></Route>
            </Routes>
        </div>
    );
}

export default App;
