import Card from "../components/Card";
import React from "react";

function Home({searchValue, setSearchValue, items = [], onChangeSearchInput, onAddToFavorite, onAddToCart, cartItems, isLoading,}) {
    const renderItems = () => {
        const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));
        return (isLoading ? [...Array(10)] : filteredItems).map((item, index) => {
            return <Card
                key={index}
                {...item}
                onAddButtonFavorite={obj => onAddToFavorite(obj)}
                onAddButtonCard={obj => onAddToCart(obj)}
                added={cartItems.some(obj => Number(obj.id) === Number(item.id))}
                loading={isLoading}
            />
        })
    }

    return (
        <React.Fragment>
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
                {renderItems()}
                <li className="card-item"></li>
                <li className="card-item"></li>
            </ul>
        </React.Fragment>
    );
}

export default Home;