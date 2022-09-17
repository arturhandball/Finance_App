import Transaction from './Transaction.js';

class Transactions {
    #data = [];
    #lastId = 0;

    add(data) {
        let item = new Transaction(data);

        if (!item.get()) return;

        item.edit({ id: ++this.#lastId });

        this.#data.push(item);
    }

    edit(id, newData) {
        let item = this.#data.find(item => {
            let itemData = item.get();
            return itemData.id == id;
        });

        if (!item) return;

        item.edit(newData);
    }

    remove(id) {
        let dataTmp = this.#data.filter(item => {
            let itemData = item.get();
            return itemData.id != id;
        });

        this.#data = dataTmp;
    }

    getBalance() {
        let amount = 0;

        let data = this.get('', true);

        data.forEach(item => {
            amount += +item.amount * (item.type == 'o' ? -1 : 1);
        });

        return amount;
    }

    get(id, showData = false) {
        if (id > 0) {
            let item = this.#data.find(item => {
                let itemData = item.get();
                return itemData.id == id;
            });
    
            if (!item) return;
            return showData ? item.get() : item;
        }

        if (showData) {
            let dataTmp = this.#data.map(item => {
                return item.get();
            });
    
            if (!dataTmp) return;
            return dataTmp;
        }

        return this.#data;
    }
}

export default Transactions;