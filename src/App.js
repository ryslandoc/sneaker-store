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
    const [favorites, setFavorites] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchData() {
            const cartResponse = await axios.get('https://62f8aacee0564480352b3b8f.mockapi.io/cart');
            const favoriteResponse = await axios.get('https://62f8aacee0564480352b3b8f.mockapi.io/favorite');
            const itemsResponse = await axios.get('https://62f8aacee0564480352b3b8f.mockapi.io/items');

            setIsLoading(false);

            setCartItems(cartResponse.data);
            setFavorites(favoriteResponse.data);
            setItems(itemsResponse.data);
        }
        fetchData();
    }, []);

    const onAddToCart = (obj) => {
        if (cartItems.find(cartObj => Number(cartObj.id) === Number(obj.id))) {
            axios.delete(`https://62f8aacee0564480352b3b8f.mockapi.io/cart/${obj.id}`);
            setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
        } else {
            axios.post('https://62f8aacee0564480352b3b8f.mockapi.io/cart', obj);
            setCartItems(prev => [...prev, obj]);
        }
    }

    const onRemoveItemFromCart = (id) => {
        axios.delete(`https://62f8aacee0564480352b3b8f.mockapi.io/cart/${id}`);
        setCartItems(prev => prev.filter(item => item.id !== id));
    }

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find(favObj => favObj.id === obj.id)) {
                axios.delete(`https://62f8aacee0564480352b3b8f.mockapi.io/favorite/${obj.id}`);
            } else {
                const {data} = await axios.post('https://62f8aacee0564480352b3b8f.mockapi.io/favorite', obj);
                setFavorites(prev => [...prev, data]);
            }
        } catch (error) {
            alert('Не вийшло додати в фаворити :(')
        }
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }

    return (
        <div className="wrapper">
            {cartOpen &&
                <Drawer onClickCloseCart={() => setCartOpen(false)} items={cartItems}
                        onRemoveItem={onRemoveItemFromCart}/>
            }
            <Header onClickOpenCart={() => setCartOpen(true)}/>

            <Routes>
                <Route path="/favorites" element={
                    <Favorites items={favorites} onAddToFavorite={onAddToFavorite}/>
                }></Route>

                <Route path="/" element={
                    <Home
                        items={items}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToCart={onAddToCart}
                        onAddToFavorite={onAddToFavorite}
                        cartItems={cartItems}
                        isLoading={isLoading}
                    />
                } exact></Route>
            </Routes>
        </div>
    );
}

export default App;
