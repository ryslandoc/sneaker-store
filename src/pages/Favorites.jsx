import React from "react";
import {Link} from "react-router-dom";
import Card from "../components/Card";

function Favorites({items = [], onAddToFavorite}) {
    return (
        <div>
            {
                items.length > 0 ? (
                    <div className="favorite-wrapper">
                        <div className="favorite-top">
                            <Link to='/'>
                                <button className="favorite-button-back">
                                    <svg className="favorite-back-icon">
                                        <use href="/images/sprite.svg#arrow-carousel"></use>
                                    </svg>
                                </button>
                            </Link>
                            <h1 className="title">
                                Мої закладки
                            </h1>
                        </div>
                        <ul className="card-list">
                            {items.map((item) => {
                                return <Card
                                    key={item.id}
                                    {...item}
                                    favorited={true}
                                    onFavorite={onAddToFavorite}
                                    onAddButtonFavorite={(obj) => onAddToFavorite(obj)}
                                />
                            })}
                            <li className="card-item"></li>
                            <li className="card-item"></li>
                        </ul>
                    </div>
                ) : (
                    <div className="favorite-wrapper-empty">
                        <img src="/images/favorite-empty.png" alt="Смайл який плаче"/>
                        <h2 className="favorite-empty-title">Закладок немає :(</h2>
                        <span className="favorite-empty-subtitle">
                            Ви нічого не додавали до закладок
                        </span>

                        <Link to="/">
                            <button className="favorite-empty-button">
                                <svg className="favorite-button-icon">
                                    <use href="/images/sprite.svg#arrow-right"></use>
                                </svg>
                                Повернутися назад
                            </button>
                        </Link>
                    </div>
                )
            }
        </div>
    );
}

export default Favorites;