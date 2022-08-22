import {Link} from 'react-router-dom';
import s from './Header.module.scss';

function Header({onClickOpenCart}) {
    return (
        <header className={s.header}>
            <nav className={s.headerMenu}>
                <Link to="/">
                    <a className={s.headerLogo} href="#">
                        <img src="/images/logo.png" alt="Логотип компанії"/>
                        <div className={s.headerLogoText}>
                            <h3>React Sneakers</h3>
                            <span>Магазин найкращих кросівок</span>
                        </div>
                    </a>
                </Link>
            </nav>
            <ul className={s.headerList}>
                <li className={s.headerItem}>
                    <button onClick={onClickOpenCart}>
                        <svg className={s.headerIcon}>
                            <use href="/images/sprite.svg#cart"></use>
                        </svg>
                        <span>12999 грн</span>
                    </button>
                </li>
                <li className={s.headerItem}>
                    <Link to="/favorites">
                        <button>
                            <svg className={s.headerIcon}>
                                <use href="/images/sprite.svg#favorite"></use>
                            </svg>
                        </button>
                    </Link>
                </li>
                <li className={s.headerItem}>
                    <button>
                        <svg className={s.headerIcon}>
                            <use href="/images/sprite.svg#account"></use>
                        </svg>
                    </button>
                </li>
            </ul>
        </header>
    );
}

export default Header;