import cards from '../../data/cards';

const categories = document.getElementById('main');
let idCategory = 0;
let idCard = 0;

function mouseLive(e) {
    const id = e.target.id.replace('rot', '');
    const btn = document.getElementById(`btn${id}`);
    if (btn.classList.length > 1) {
        document.getElementById(`play${id}`).classList.toggle('rotate');
        btn.classList.toggle('hidden');
        setTimeout(() => {
            const label = document.getElementById(`label${id}`);
            label.innerHTML = cards[idCategory][id].english;
            label.classList.toggle('text-rotate');
        }, 250);
    }
}

export default function play(id) {
    idCategory = id;
    for (let i = 0, len = cards[id].length; i < len; i += 1) {
        const divWrapNotRotate = document.createElement('div');
        divWrapNotRotate.id = `rot${i}`;
        divWrapNotRotate.className = 'wrap-not-rotate';
        const wrap = document.createElement('figure');
        wrap.id = `play${i}`;
        wrap.className = 'play';
        const img = document.createElement('img');
        img.className = 'play__img';
        img.src = cards[id][i].image;
        const label = document.createElement('figcaption');
        label.innerHTML = cards[id][i].english;
        label.id = `label${i}`;
        label.className = 'play__label';
        const btn = document.createElement('button');
        btn.className = 'play__btn';
        btn.id = `btn${i}`;
        wrap.append(img);
        wrap.append(label);
        wrap.append(btn);
        divWrapNotRotate.append(wrap);
        divWrapNotRotate.addEventListener('mouseleave', mouseLive);
        categories.append(divWrapNotRotate);
    }
}

categories.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        idCard = e.target.id.replace('btn', '');
        document.getElementById(`play${idCard}`).classList.toggle('rotate');
        e.target.classList.toggle('hidden');
        setTimeout(() => {
            const label = document.getElementById(`label${idCard}`);
            label.innerHTML = cards[idCategory][idCard].russian;
            label.classList.toggle('text-rotate');
        }, 250);
    }
});
