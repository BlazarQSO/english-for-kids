import cards from '../../data/cards';

const categories = document.getElementById('main');
let idCard = 0;

function mouseLive(e) {
    document.getElementById(e.target.id).classList.remove('flipper-rotate');
}

export default function play(id) {
    for (let i = 0, len = cards[id].length; i < len; i += 1) {
        const container = document.createElement('figure');
        container.id = `rot${i}`;
        container.className = 'container';

        const flipper = document.createElement('div');
        flipper.id = `flip${i}`;
        flipper.className = 'flipper';

        const front = document.createElement('div');
        front.id = `play${i}`;
        front.className = 'front';

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

        const back = document.createElement('div');
        back.id = `back${i}`;
        back.className = 'back';

        const imgBack = document.createElement('img');
        imgBack.className = 'play__img';
        imgBack.src = cards[id][i].image;
        const labelBack = document.createElement('figcaption');
        labelBack.innerHTML = cards[id][i].russian;
        labelBack.id = `label${i}`;
        labelBack.className = 'play__label';

        front.append(img);
        front.append(label);
        front.append(btn);
        back.append(imgBack);
        back.append(labelBack);
        flipper.append(front);
        flipper.append(back);
        flipper.addEventListener('mouseleave', mouseLive);
        container.append(flipper);
        categories.append(container);
    }
}

categories.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        idCard = e.target.id.replace('btn', '');
        document.getElementById(`flip${idCard}`).classList.toggle('flipper-rotate');
    }
});
