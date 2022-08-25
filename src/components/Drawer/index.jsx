import s from './Drawer.module.scss';

function Drawer({onClickCloseCart, items = [], onRemoveItem}) {
    return (
        <div className={s.drawerOverlay}>
            <div className={s.drawer}>
                <div className={s.drawerTop}>
                    <h2>Кошик</h2>
                    <button className={s.closeCart} onClick={onClickCloseCart}>
                        <svg className={s.closeCartIcon}>
                            <use href="/images/sprite.svg#plus"></use>
                        </svg>
                    </button>
                </div>

                {items.length > 0 ? (
                    <div className={s.wrapperCartContains}>
                        <ul className={s.wrapperCartItems}>
                            {items.map(item => {
                                return <li className={s.wrapperCartItem}>
                                    <img className="cart-item-img" width={70} height={55}
                                         src={item.image} alt="Фото кросівок"/>
                                    <div className={s.cartItemInfo}>
                                        <p className={s.cartItemTitle}>
                                            {item.title}
                                        </p>
                                        <span>{item.price} грн</span>
                                    </div>
                                    <button className={s.cartItemButton} onClick={() => onRemoveItem(item.id)}>
                                        <svg className={s.cartItemIcon}>
                                            <use href="/images/sprite.svg#plus"></use>
                                        </svg>
                                    </button>
                                </li>
                            })}
                        </ul>
                        <div className={s.cartTotalBlock}>
                            <ul className={s.cartTotalList}>
                                <li>
                                    <span className={s.totalText}>Разом:</span>
                                    <div></div>
                                    <span className={s.totalPrice}>12999 грн.</span>
                                </li>
                                <li>
                                    <span className={s.totalText}>Податок 5%:</span>
                                    <div></div>
                                    <span className={s.totalPrice}>1023 грн.</span>
                                </li>
                            </ul>

                            <button className={s.cartCheckout}>
                                Оформити замовлення
                                <svg className={s.cartCheckoutIcon}>
                                    <use href="/images/sprite.svg#arrow-right"></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={s.wrapperCartEmptyContains}>
                        <div className={s.wrapperCartEmpty}>
                            <img width={120} height={120} src="/images/empty-box.png" alt="Пуста коробка"/>
                            <h2 className={s.titleCartEmpty}>
                                Кошик порожній
                            </h2>
                            <span className={s.subtitleCartEmpty}>
                                Додайте хоча б одну пару кросівок, щоб зробити замовлення.
                            </span>
                            <button className={s.buttonCartEmpty} onClick={onClickCloseCart}>
                                <svg className={s.cartEmptyIcon}>
                                    <use href="/images/sprite.svg#arrow-right"></use>
                                </svg>
                                Повернутися назад
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Drawer;