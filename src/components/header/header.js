import Statistics from '../statistics/statistics';
import { playGm, startGm } from '../play/play';
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
            const mainPage = document.getElementById('main');
            if (e.target.id === 'liMain' && !e.target.classList.contains('decoration')) {
                document.getElementById('statistics').classList.remove('show');
                main();
            } else if (e.target.id === 'liStatistics') {
                mainPage.innerHTML = '';
                new Statistics().create();
                document.getElementById('statistics').classList.add('show');
            } else if (e.target.id !== 'liMain') {
                document.getElementById('statistics').classList.remove('show');
                mainPage.onclick = null;
                playGm(e.target.id.replace('li', ''));
            }
            const list = document.getElementById('list');
            Array.from(list.children).forEach((el) => el.classList.remove('decoration'));
            e.target.classList.add('decoration');
            document.getElementById('nav').classList.toggle('nav__show');
        }
    });
}

document.getElementById('checkbox').addEventListener('change', () => {
    const mainPage = document.getElementById('main');
    const check = document.getElementById('checkbox');
    if (mainPage.firstElementChild && mainPage.firstElementChild.id === 'category1') {
        mainPage.classList.toggle('change-background');
    }

    const start = document.getElementById('start');
    if (start) {
        if (check.checked) {
            start.classList.remove('show');
        } else {
            start.classList.add('show');
        }
    }

    if (mainPage.firstElementChild && mainPage.firstElementChild.id !== 'category1') {
        if (check.checked) {
            mainPage.classList.remove('state-play');
        } else {
            mainPage.classList.add('state-play');
        }
    }

    if (check.checked && mainPage.firstElementChild && mainPage.firstElementChild.id !== 'category1') {
        start.classList.remove('btn-started-game');
        start.addEventListener('click', startGm);
        start.innerHTML = 'Start game';
        const imgs = document.querySelectorAll('img');
        for (let i = 0, len = imgs.length; i < len; i += 1) {
            imgs[i].classList.remove('guessed');
        }
        document.getElementById('containerStars').innerHTML = '';
    }
});
