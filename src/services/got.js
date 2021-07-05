export default class GotDatabase {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    #_getResource = async url => {
        const res  = await fetch(`${this._apiBase}${url}`);

        if(!res.ok) {
            throw Error(`Could not fetch ${this._apiBase}${url}. Status: ${res.status}`);
        }

        return await res.json();
    };

    #_pageIterator = async (category, count) => {
        let res = [];
        for (let i = 1; i <= count; i++) {
            const l = await this.#_getResource(`/${category}?page=${i}&pageSize=50`);
            res.push(...l);
        }

        return res;
    }

    getCharactersAll = async () => {
        const res = await this.#_pageIterator('characters', 44);
        return res.map(this.#_transformCharacterData);
    }

    getCharacter = async (id) => {
        const res = await this.#_getResource(`/characters/${id}`);
        return this.#_transformCharacterData(res);
    }

    getBooksAll = async () => {
        const res = await this.#_pageIterator('books', 2);
        return res.map(this.#_transformBookData);
    }

    getBook = async (id) => {
        const res = await this.#_getResource(`/books/${id}`);
        return this.#_transformBookData(res);
    }

    getHousesAll = async () => {
        const res = await this.#_pageIterator('houses', 2);
        return res.map(this.#_transformHouseData);
    }

    getHouse = async (id) => {
        const res = await this.#_getResource(`/houses/${id}`);
        return this.#_transformHouseData(res);
    }

    #_uniqueIdGenerator = () => {
        const now = Date.now();
        return `${now}-${Math.floor(Math.random()*now + 1)}`;
    }

    #_transformCharacterData = ({born, culture, died, gender, name, url}) => {
        return {
            name: name || "No Name",
            gender: gender || "undefined",
            born: born || "unknown",
            died: died || "unknown",
            culture: culture || "self",
            id: parseInt(url.slice(-4).match(/\d+/))
        };
    };
    #_transformBookData = ({authors, characters, country, name, numberOfPages, publisher, url}) => {
        return {
            name: name || "Book",
            authors: authors || "unknown",
            numberOfPages: numberOfPages || "undefined",
            publisher: publisher || "unknown",
            country: country || "undefined",
            characters: characters || "unknown",
            id: parseInt(url.slice(-4).match(/\d+/))
        };
    };
    #_transformHouseData = ({name, coatOfArms, region, seats, words, url}) => {
        return {
            name: name || "House",
            region: region || "unknown",
            words: words || "undefined",
            seats: seats || "unknown",
            coatOfArms: coatOfArms || "unknown",
            id: parseInt(url.slice(-4).match(/\d+/))
        };
    };
}