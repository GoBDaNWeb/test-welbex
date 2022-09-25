import { makeAutoObservable } from 'mobx';

class Filter {
    sort = 'count';

    condition = 'less';

    inputValue = '';

    limit = 5;

    page = 1;

    totalPages = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setSort(sort) {
        this.sort = sort;
    }

    setCondition(condition) {
        this.condition = condition;
    }

    setInputValue(value) {
        this.inputValue = value;
    }

    setLimit(limit) {
        this.limit = limit;
    }

    setPage(page) {
        this.page = page;
    }

    setTotalPages(pages) {
        this.totalPages = pages;
    }
}

export default new Filter();
