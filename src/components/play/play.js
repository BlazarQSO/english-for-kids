import cards from '../../data/cards';
import Game from './game';

const categories = document.getElementById('main');
let idCardClick = 0;
let idCategory = 0;
const game = new Game(idCategory);

function mouseLive(e) {
    if (document.getElementById(e.target.id)) {
        document.getElementById(e.target.id).classList.remove('flipper-rotate');
    }
}

export function startGame() {
    game.start = true;
    game.count = 0;
    game.idCategory = idCategory;
    game.createWords();
    game.repeatWord();

    const btn = document.getElementById('start');
    btn.classList.toggle('btn-started-game');
    btn.innerHTML = 'Repeat';
    btn.removeEventListener('click', startGame);
    btn.addEventListener('click', game.repeatWord.bind(game));
}

function createBtn() {
    const startBtn = document.createElement('button');
    startBtn.className = 'play__start';
    startBtn.id = 'start';
    startBtn.innerHTML = 'Start game';
    const wrapBtn = document.createElement('div');
    wrapBtn.className = 'play__wrap';
    wrapBtn.append(startBtn);
    categories.append(wrapBtn);
    if (!document.getElementById('checkbox').checked) {
        startBtn.classList.add('show');
        categories.classList.add('state-play');
    }
    startBtn.addEventListener('click', startGame);
}

function changeCards(diffWords) {
    const EXISTENCE_OF_CATEGORIES = 13;
    if (cards.length > EXISTENCE_OF_CATEGORIES) cards.pop();
    if (diffWords !== undefined) {
        cards.push(diffWords);
    }
}

function createContainerStars() {
    if (!document.getElementById('checkbox').checked) {
        categories.classList.remove('change-background');
    }
    const containerStars = document.createElement('div');
    containerStars.className = 'container-stars';
    containerStars.id = 'containerStars';
    categories.append(containerStars);
}

function createCards(id) {
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
        img.id = `img${i}`;
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

export function play(id, diffWords) {
    try {
        categories.innerHTML = '';
        idCategory = id;
        game.idCategory = id;
        game.start = false;

        changeCards(diffWords);
        createContainerStars();
        createCards(id);
        createBtn();
    } catch (error) {
        play.errorMessage = error.message;
    }
}

function eventGame(e) {
    try {
        if (e.target.tagName === 'BUTTON' && e.target.id !== 'start') {
            idCardClick = e.target.id.replace('btn', '');
            document.getElementById(`flip${idCardClick}`).classList.toggle('flipper-rotate');
        }
        if (e.target.id
            && e.target.tagName === 'IMG'
            && e.target.classList.contains('play__img')
            && document.getElementById('checkbox').checked) {
            game.addStorageTrain(e.target.id.replace('img', ''));
            const audio = new Audio();
            audio.src = cards[idCategory][e.target.id.replace('img', '')].audio;
            audio.autoplay = true;
        }
        if (!document.getElementById('checkbox').checked
            && e.target.id
            && e.target.tagName === 'IMG'
            && game.start
            && !e.target.classList.contains('guessed')) {
            if (game.words && +e.target.id.replace('img', '') === game.words[0]) {
                e.target.classList.add('guessed');
                game.nextWord(game.words[0]);
            } else {
                game.wrong(game.words[0]);
            }
        }
    } catch (error) {
        eventGame.errorMessage = error.message;
    }
}

categories.addEventListener('click', eventGame);

export {
    play as playGm,
    startGame as startGm,
};
