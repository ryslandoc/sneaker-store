import s from './Card.module.scss';
import React from "react";

function Card({title, image, price, onAddButtonCard}) {
    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(false);

    const handleAdd = () => {
        onAddButtonCard({title, image, price});
        setIsAdded(!isAdded);
    }
    const handleFavorite = () => {
        setIsFavorite(!isFavorite);
    }

    return (
        <li className={s.cardItem}>
            <button className={isFavorite ? s.cardActiveFavorite : s.cardFavorite} onClick={handleFavorite}>
                <svg className={s.favoriteIcon}>
                    <use href={isFavorite ? "/images/sprite.svg#favoriteFull" : "/images/sprite.svg#favorite"}></use>
                </svg>
            </button>
            <div className={s.cardInfo}>
                <img className={s.cardImg} src={image} alt="sneakers"/>
                <h4 className={s.cardTitle}>
                    {title}
                </h4>
                <div className={s.cardSubInfo}>
                    <div className={s.cardPrice}>
                        <span>Ціна:</span>
                        <p>{price}</p>
                    </div>
                    <button className={isAdded ? s.cardAddActive : s.cardAddCart} onClick={handleAdd}>
                        <svg className={s.addIcon}>
                            <use href={isAdded ? "/images/sprite.svg#checked" : "/images/sprite.svg#plus"}></use>
                        </svg>
                    </button>
                </div>
            </div>
        </li>
    );
}

export default Card;