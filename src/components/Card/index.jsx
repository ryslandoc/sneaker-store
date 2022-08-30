import s from './Card.module.scss';
import ContentLoader from "react-content-loader"
import React from "react";

function Card({
                  id,
                  title,
                  image,
                  price,
                  onAddButtonCard,
                  onAddButtonFavorite,
                  favorited = false,
                  added = false,
                  loading = false
              }) {
    const [isAdded, setIsAdded] = React.useState(added);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    const handleAdd = () => {
        onAddButtonCard({id, title, image, price});
        setIsAdded(!isAdded);
    }

    const handleFavorite = () => {
        onAddButtonFavorite({id, title, image, price})
        setIsFavorite(!isFavorite);
    }

    return (
        <li className={s.cardItem}>
            {
                loading ? (
                    <ContentLoader
                        speed={2}
                        width={150}
                        height={200}
                        viewBox="0 0 150 200"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb">
                        <rect x="0" y="0" rx="10" ry="10" width="150" height="91"/>
                        <rect x="0" y="102" rx="3" ry="3" width="150" height="15"/>
                        <rect x="0" y="123" rx="3" ry="3" width="93" height="15"/>
                        <rect x="0" y="166" rx="8" ry="8" width="80" height="24"/>
                        <rect x="115" y="160" rx="8" ry="8" width="32" height="32"/>
                    </ContentLoader>
                ) : (
                    <React.Fragment>
                        <button className={isFavorite ? s.cardActiveFavorite : s.cardFavorite} onClick={handleFavorite}>
                            <svg className={s.favoriteIcon}>
                                <use
                                    href={isFavorite ? "/images/sprite.svg#favoriteFull" : "/images/sprite.svg#favorite"}></use>
                            </svg>
                        </button>
                        <div className={s.cardInfo}>
                            <img className={s.cardImg} src={image} alt="Фото кросівок"/>
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
                                        <use
                                            href={isAdded ? "/images/sprite.svg#checked" : "/images/sprite.svg#plus"}></use>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </React.Fragment>
                )
            }
        </li>
    );
}

export default Card;