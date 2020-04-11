import cards from '../../data/cards';

export default class Statistics {
    constructor() {
        this.data = [];
    }

    create(sort) {
        if (!sort) {
            this.parseStorage();
        }
        const tbody = document.getElementById('tbody');
        tbody.innerHTML = '';
        const fragmentTable = new DocumentFragment();
        for (let i = 0, len = this.data.length; i < len; i += 1) {
            const row = document.createElement('tr');
            const tdCategory = document.createElement('td');
            const english = document.createElement('td');
            const russian = document.createElement('td');
            const train = document.createElement('td');
            const play = document.createElement('td');
            const count = document.createElement('td');
            const percent = document.createElement('td');
            [
                tdCategory.innerHTML,
                english.innerHTML,
                russian.innerHTML,
                train.innerHTML,
                play.innerHTML,
                count.innerHTML,
                percent.innerHTML,
            ] = this.data[i];
            // constp=(+this.data[i][5])?Math.ceil((100 * this.data[i][5]) / this.data[i][4]) : 0;
            // percent.innerHTML = p;
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
        if (inverse) {
            this.data.sort((a, b) => (a[id] < b[id] ? 1 : -1));
        } else {
            this.data.sort((a, b) => (a[id] > b[id] ? 1 : -1));
        }
        this.create(true);
    }

    sortNamber(id, inverse) {
        if (inverse) {
            this.data.sort((a, b) => b[id] - a[id]);
        } else {
            this.data.sort((a, b) => a[id] - b[id]);
        }
        // if (id === 6) {
        //     this.data.sort((a, b) => (a[5] / a[4]) - (b[5] / b[4] ? 1 : -1));
        // }
        this.create(true);
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
            if (item.id !== e.target.id) {
                item.classList.remove('inverse-sort');
            }
        });
    }
});
