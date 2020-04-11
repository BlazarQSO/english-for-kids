import cards from '../../data/cards';
import { playG } from '../play/play';

const categories = document.getElementById('main');
function click(e) {
    if (e.target.tagName === 'FIGURE' || e.target.closest('figure')) {
        categories.innerHTML = '';
        const list = document.getElementById('list');
        Array.from(list.children).forEach((el) => el.classList.remove('decoration'));
        const id = (e.target.tagName === 'FIGURE')
            ? e.target.id.replace('category', '')
            : e.target.closest('figure').id.replace('category', '');
        document.getElementById(`li${id}`).classList.add('decoration');
        playG(id);
        categories.onclick = null;
    }
}

export default function main() {
    categories.innerHTML = '';
    for (let i = 1, len = cards[0].length; i <= len; i += 1) {
        const wrap = document.createElement('figure');
        wrap.id = `category${i}`;
        wrap.className = 'category';
        const img = document.createElement('img');
        img.className = 'category__img';
        img.src = cards[i][2].image;
        const label = document.createElement('figcaption');
        label.innerHTML = cards[0][i - 1];
        label.className = 'category__label';
        wrap.append(img);
        wrap.append(label);
        categories.append(wrap);
    }
    categories.onclick = click;
    if (!document.getElementById('checkbox').checked) {
        categories.classList.add('change-background');
        categories.classList.remove('state-play');
    }
}
