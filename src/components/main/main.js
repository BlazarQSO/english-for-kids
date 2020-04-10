import cards from '../../data/cards';
import play from '../play/play';

const categories = document.getElementById('main');
function click(e) {
    if (e.target.tagName === 'FIGURE') {
        categories.innerHTML = '';
        play(e.target.id.replace('category', ''));
    } else if (e.target.closest('figure')) {
        categories.innerHTML = '';
        play(e.target.closest('figure').id.replace('category', ''));
    }
    categories.removeEventListener('click', click);
}

export default function main() {
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
    categories.addEventListener('click', click);
}
