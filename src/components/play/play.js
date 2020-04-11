import cards from '../../data/cards';

const categories = document.getElementById('main');

class Game {
    constructor(idCategory) {
        this.idCategory = idCategory;
        this.count = 0;
        this.start = false;
        this.words = [];
        this.createWords();
    }

    createWords() {
        try {
            this.words = [];
            let category = new Array(cards[this.idCategory].length).fill(0);
            category = category.map((item, index) => index);
            while (category.length > 0) {
                const id = Math.floor(Math.random() * category.length);
                this.words.push(category[id]);
                category.splice(id, 1);
            }
        } catch (error) {
            this.message = error.message;
        }
    }

    nextWord(id) {
        try {
            this.count += 1;
            const img = document.createElement('img');
            img.className = 'star';
            img.src = './images/star-win.svg';
            document.getElementById('containerStars').append(img);
            const audio = new Audio();
            audio.src = './audio/correct.mp3';
            audio.autoplay = true;
            this.words.shift();
            if (this.words.length === 0) {
                this.endGame();
            }
            this.addStoragePlay(id);
            this.repeatWord();
        } catch (error) {
            this.message = error.message;
        }
    }

    wrong(id) {
        try {
            this.count += 1;
            const audio = new Audio();
            audio.src = './audio/error.mp3';
            audio.autoplay = true;
            const img = document.createElement('img');
            img.className = 'star';
            img.src = './images/star.svg';
            document.getElementById('containerStars').append(img);
            this.addStoragePlay(id);
            this.addStorageError(id);
        } catch (error) {
            this.message = error.message;
        }
    }

    repeatWord() {
        setTimeout(() => {
            try {
                if (this.words && this.words.length > 0) {
                    const audio = new Audio();
                    audio.src = cards[this.idCategory][this.words[0]].audio;
                    audio.autoplay = true;
                }
            } catch (error) {
                this.message = error.message;
            }
        }, 400);
    }

    endGame() {
        setTimeout(() => {
            try {
                categories.innerHTML = '';
                categories.classList.remove('state-play');
                const message = document.createElement('p');
                message.className = 'message';
                const img = document.createElement('img');
                img.className = 'end-game';
                const wrap = document.createElement('div');
                wrap.className = 'wrap';
                const audio = new Audio();
                if (this.count !== cards[this.idCategory].length) {
                    message.innerHTML = `Error count: ${this.count - cards[this.idCategory].length}`;
                    img.src = './images/failure.png';
                    audio.src = './audio/failure.mp3';
                } else {
                    message.innerHTML = 'You Won!';
                    img.src = './images/success.png';
                    audio.src = './audio/success.mp3';
                }
                audio.autoplay = true;
                wrap.append(message);
                wrap.append(img);
                categories.append(wrap);
                document.getElementById('header').classList.add('hide');
            } catch (error) {
                this.message = error.message;
            }
        }, 700);
        setTimeout(() => {
            document.getElementById('header').classList.remove('hide');
            if (document.getElementById('liMain')) document.getElementById('liMain').click();
            document.getElementById('start').classList.remove('btn-started-game');
        }, 4000);
    }

    addStoragePlay(id) {
        try {
            const word = document.getElementById(`label${id}`).innerHTML;
            const storage = localStorage.getItem(word) || false;
            if (storage) {
                const words = storage.split(',');
                words[3] = +words[3] + 1;
                localStorage.setItem(word, words.join(','));
            }
        } catch (error) {
            this.message = error.message;
        }
    }

    addStorageError(id) {
        try {
            const word = document.getElementById(`label${id}`).innerHTML;
            const storage = localStorage.getItem(word);
            const words = storage.split(',');
            words[4] = +words[4] + 1;
            localStorage.setItem(word, words.join(','));
        } catch (error) {
            this.message = error.message;
        }
    }

    addStorageTrain(id) {
        try {
            const word = document.getElementById(`label${id}`).innerHTML;
            const storage = localStorage.getItem(word);
            const words = storage.split(',');
            words[2] = +words[2] + 1;
            localStorage.setItem(word, words.join(','));
        } catch (error) {
            this.message = error.message;
        }
    }
}

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

export function play(id) {
    idCategory = id;
    game.idCategory = id;
    game.start = false;
    if (!document.getElementById('checkbox').checked) {
        categories.classList.remove('change-background');
    }
    categories.innerHTML = '';
    const containerStars = document.createElement('div');
    containerStars.className = 'container-stars';
    containerStars.id = 'containerStars';
    categories.append(containerStars);

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

categories.addEventListener('click', (e) => {
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
});

export {
    play as playG,
    startGame as startG,
};
