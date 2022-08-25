import Card from "../components/Card";
import React from "react";

function Home({searchValue, setSearchValue, items, onChangeSearchInput, onAddToFavorite, onAddToCart}) {
    return (
        <div>
            <div className="wrapper-title-search">
                <h1 className="title">
                    {searchValue ? `Пошук по запросу: "${searchValue}"` : 'Все кроссовки'}
                </h1>
                <div className="search-input">
                    <svg className="search-icon">
                        <use href="/images/sprite.svg#search"></use>
                    </svg>
                    <input type="text" placeholder="Пошук..." value={searchValue}
                           onChange={onChangeSearchInput}/>
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
                            onAddButtonFavorite={(obj) => onAddToFavorite(obj)}
                        />
                    })}
                <li className="card-item"></li>
                <li className="card-item"></li>
            </ul>
        </div>
    );
}

export default Home;