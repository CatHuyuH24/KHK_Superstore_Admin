class Paging {
    constructor(query) {
        this.page = parseInt(query.page, 10);
        this.limit = parseInt(query.limit, 10);
        this.preCursor=0;
        this.nextCursor=0;
    }

    // Gán total và tính toán nextCursor
   

    setPreCursor(preCursor) {
        this.preCursor = preCursor;
    }

    setNextCursor(nextCursor) {
        this.nextCursor = nextCursor;
    }

    Fullfill(){
        if (this.page<=0){
            this.page=1;
        }
        if (this.page.limit<=0){
            this.page.limit=5;
        }
    }
}

module.exports = Paging;