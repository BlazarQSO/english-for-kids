import './style/style.scss';
import main from './components/main/main';
import header from './components/header/header';

window.addEventListener('load', () => {
    main();
    header();
    const nav = document.getElementById('nav');

    document.body.addEventListener('click', (e) => {
        if (nav.classList.length > 1 && !(e.target.tagName === 'NAV' || !e.target.tagName === 'LI')) {
            nav.classList.remove('nav__show');
        }
    });
});
