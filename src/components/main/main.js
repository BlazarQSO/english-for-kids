import cards from '../../data/cards';

export default function main() {
    const categories = document.getElementById('main');
    for (let i = 1, len = cards[0].length; i <= len; i += 1) {
        const wrap = document.createElement('div');
        wrap.id = i;
        wrap.className = 'category';
        const img = document.createElement('img');
        img.className = 'category__img';
        img.src = cards[i][2].image;
        const label = document.createElement('label');
        label.innerHTML = cards[0][i - 1];
        label.className = 'category__label';
        wrap.append(img);
        wrap.append(label);
        categories.append(wrap);
    }
}
