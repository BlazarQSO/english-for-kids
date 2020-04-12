import cards from '../../data/cards';
import { playGm } from '../play/play';

export default class Statistics {
    constructor() {
        this.data = [];
    }

    create(parse) {
        if (!parse) {
            this.parseStorage();
        }
        const tbody = document.getElementById('tbody');
        tbody.innerHTML = '';
        const fragmentTable = new DocumentFragment();
        for (let i = 0, len = this.data.length; i < len; i += 1) {
            const row = document.createElement('tr');
            const tdCategory = document.createElement('td');
            tdCategory.setAttribute('data-col', 'Category:');
            const english = document.createElement('td');
            english.setAttribute('data-col', 'Word:');
            const russian = document.createElement('td');
            russian.setAttribute('data-col', 'Translate:');
            const train = document.createElement('td');
            train.setAttribute('data-col', 'Train:');
            const play = document.createElement('td');
            play.setAttribute('data-col', 'Play:');
            const count = document.createElement('td');
            count.setAttribute('data-col', 'Error:');
            const percent = document.createElement('td');
            percent.setAttribute('data-col', '%:');
            [
                tdCategory.innerHTML,
                english.innerHTML,
                russian.innerHTML,
                train.innerHTML,
                play.innerHTML,
                count.innerHTML,
                percent.innerHTML,
            ] = this.data[i];
            row.append(tdCategory);
            row.append(english);
            row.append(russian);
            row.append(train);
            row.append(play);
            row.append(count);
            row.append(percent);
            fragmentTable.append(row);
        }
        tbody.append(fragmentTable);
    }

    parseStorage() {
        this.data = [];
        for (let i = 1, len = cards[0].length; i <= len; i += 1) {
            for (let j = 0, { length } = cards[i]; j < length; j += 1) {
                const wordStat = [];
                const stat = localStorage.getItem(cards[i][j].english)
                    || `${cards[i][j].english},${cards[i][j].russian},0,0,0,0`;
                localStorage.setItem(cards[i][j].english, stat);
                wordStat.push(cards[0][i - 1]);
                wordStat.push(...stat.split(','));
                this.data.push(wordStat);
            }
        }
    }

    sortAlphabet(id, inverse) {
        this.parseStorage();
        if (inverse) {
            this.data.sort((a, b) => (a[id] > b[id] ? 1 : -1));
        } else {
            this.data.sort((a, b) => (a[id] < b[id] ? 1 : -1));
        }
        this.create(true);
    }

    sortNamber(id, inverse) {
        this.parseStorage();
        if (inverse) {
            this.data.sort((a, b) => b[id] - a[id]);
        } else {
            this.data.sort((a, b) => a[id] - b[id]);
        }
        this.create(true);
    }

    repeat() {
        const PERCENT_COL = 6;
        this.sortNamber(PERCENT_COL, true);
        const newCategory = [];
        const LIST_DIFF_CARDS = 8;
        for (let i = 0; i < LIST_DIFF_CARDS; i += 1) {
            if (this.data[i][PERCENT_COL] > 0) {
                const c = cards.find((row) => row.find((elem) => elem.english === this.data[i][1]));
                const wrd = c.find((elem) => elem.english === this.data[i][1]);
                const cloneWord = {
                    english: wrd.english, russian: wrd.russian, image: wrd.image, audio: wrd.audio,
                };
                newCategory.push(cloneWord);
            } else {
                i = 8;
            }
        }
        document.getElementById('statistics').classList.remove('show');
        document.getElementById('liStatistics').classList.remove('decoration');
        if (newCategory.length !== 0) {
            document.getElementById('main').onclick = null;
            playGm(cards.length, newCategory);
        }
    }

    reset() {
        for (let i = 0; i < this.data.length; i += 1) {
            this.data[i][3] = 0;
            this.data[i][4] = 0;
            this.data[i][5] = 0;
            this.data[i][6] = 0;
            localStorage.removeItem(this.data[i][1]);
        }
        this.create();
    }
}

const statistics = new Statistics();
statistics.parseStorage();

document.getElementById('statistics').addEventListener('click', (e) => {
    if (e.target.tagName === 'TH') {
        const inverse = e.target.classList.contains('inverse-sort');
        if (e.target.id.slice(0, 3) === 'num') {
            document.getElementById(e.target.id).classList.toggle('inverse-sort');
            statistics.sortNamber(+e.target.id.replace('num', ''), inverse);
        } else {
            document.getElementById(e.target.id).classList.toggle('inverse-sort');
            statistics.sortAlphabet(+e.target.id.replace('alph', ''), inverse);
        }
        const headers = document.querySelectorAll('th');
        Array.from(headers).forEach((item) => {
            item.classList.remove('inverse-sort-click');
            if (item.id !== e.target.id) {
                item.classList.remove('inverse-sort');
            }
        });
        document.getElementById(e.target.id).classList.add('inverse-sort-click');
    }
});

document.getElementById('reset').addEventListener('click', statistics.reset.bind(statistics));
document.getElementById('repeat').addEventListener('click', statistics.repeat.bind(statistics));
