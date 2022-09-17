class Transaction {
    #data;

    constructor(data) {
        if (this.#validate(data)) {
            if (!data.date) data.date = new Date().toLocaleString();
            this.#data = data;
        }
    }

    #validate(data) {
        if (typeof data != 'object' || 
            Array.isArray(data)) return false;

        if (!this.#data && 
            (
                !data.name || 
                data.name.length == 0 ||
                !data.amount || 
                isNaN(data.amount)
            )
        ) return false;

        if (this.#data) {
            if (data.name != undefined) {
                if (data.name.length == 0) {
                    return false;
                }
            }

            if (data.amount != undefined) {
                if (isNaN(data.amount) ||
                data.amount == 0) {
                    return false;
                }
            }
        }
        
        return true;
    }

    edit(newData) {
        if (!this.#validate(newData)) return;

        this.#data = {...this.#data, ...newData};
    }

    get() {
        return this.#data;
    }
}

export default Transaction;