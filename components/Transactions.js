import {formElem, formFields} from "./FormTransaction.js";

class Page {
    constructor() {
        this.create();
        this.update();
    }

    create() {
        this.elem = document.createElement('div');
        this.elem.classList.add('transactions');

        this.elem.innerHTML = `
        <header class="transactions__header">
            <a href="/#home">Home</a>
            <h1>Transactions</h1>
        </header>
        `;

        this.listElem = document.createElement('ul');
        this.listElem.classList.add('transactions__list');

        let btnAdd = document.createElement('button');
        btnAdd.classList.add('transactions__btn_add');
        btnAdd.innerHTML = 'Add';

        this.elem.append(this.listElem, btnAdd);

        btnAdd.addEventListener('click', () => {
            document.body.append(formElem);

            formFields.send.addEventListener('click', () => {
                let obj = {};

                if (formFields.name.value.length > 0) {
                    obj.name = formFields.name.value;
                }

                if (formFields.amount.value > 0) {
                    obj.amount = formFields.amount.value;
                }

                if (formFields.type.checked) {
                    obj.type = formFields.type.value;
                } else {
                    obj.type = formFields.type2.value;
                }

                if (formFields.categories.value.length > 0) {
                    obj.categories = formFields.categories.value;
                }

                if (formFields.description.value.length > 0) {
                    obj.description = formFields.description.value;
                }

                let balance = window.finance.getBalance();
                
                if ((obj.type == 'o' && balance > obj.amount) ||
                    obj.type == 'i'
                ) {
                    window.finance.add(obj);
                }
                
                formElem.remove();

                this.update();

            }, { once: true });
        });
    }

    update() {
        let data = window.finance.get('', true);
        
        localStorage.setItem('transactions', JSON.stringify(data));

        this.listElem.innerHTML = '';

        data.forEach((item) => {
            let liElem = document.createElement('li');
            liElem.classList.add('transaction');

            liElem.innerHTML = `
                <a href="/#transaction/${item.id}">
                    <div class="transaction__info">
                        <h2>${item.name}</h2>
                        <p>${item.date}</p>
                    </div>
                    <div class="transaction__amount">
                    ${item.type == 'o' ? (item.amount * -1) : item.amount}$
                    </div>
                </a>
            `;

            this.listElem.append(liElem);
        });
    }
}

export default new Page().elem;