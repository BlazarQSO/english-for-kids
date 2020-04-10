import play from '../play/play';
import main from '../main/main';

export default function header() {
    const btn = document.getElementById('btn');
    btn.addEventListener('click', (e) => {
        btn.classList.toggle('header__click');
        document.getElementById('nav').classList.toggle('nav__show');
        e.stopPropagation();
    });

    const nav = document.getElementById('nav');
    nav.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            document.getElementById('main').innerHTML = '';
            const list = document.getElementById('list');
            Array.from(list.children).forEach((el) => el.classList.remove('decoration'));
            if (e.target.id === 'liMain') {
                main();
            } else if (e.target.id === 'liStatistics') {
                document.getElementById('statistics').classList.toggle('show');
            } else {
                play(e.target.id.replace('li', ''));
            }
            e.target.classList.add('decoration');
            document.getElementById('nav').classList.toggle('nav__show');
        }
    });
}
