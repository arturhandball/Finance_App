import {formElem, formFields} from "./FormTransaction.js";

class Page {
    constructor() {
        this.create();
    }

    create() {
        let id = location.hash;
        id = id.split('/');
        id = id.pop();

        let data = window.finance.get(id, true);

        this.elem = document.createElement('div');
        this.elem.classList.add('transaction');

        if (!data) {
            this.elem.innerHTML = 'Ooops! This page is empty';
            return;
        }

        this.elem.innerHTML = `
        <header class="transactions__header">
            <a href="/#transactions">Back</a>
            <h1>${data.date}</h1>
        </header>
        <div class="transaction__page">
        `;

        if (data.categories) this.elem.innerHTML += `
        <div class="transaction__categories">${data.categories}</div>
        `;

        if (data.name) this.elem.innerHTML += `
        <div class="transaction__name">${data.name}</div>
        `;

        if (data.amount) this.elem.innerHTML += `
        <div class="transaction__amount">${data.amount}</div>
        `;

        if (data.description) this.elem.innerHTML += `
        <div class="transaction__description">${data.description}</div>
        `;

        this.elem.innerHTML += `</div>`;


        let btnsElem = document.createElement('div');
        btnsElem.classList.add('transaction__btns');

        let btnEdit = document.createElement('button');
        btnEdit.classList.add('transaction__btn_edit');
        btnEdit.innerHTML = 'Edit';

        let btnRemove = document.createElement('button');
        btnRemove.classList.add('transaction__btn_remove');
        btnRemove.innerHTML = 'X';

        btnsElem.append(btnEdit, btnRemove);
        this.elem.append(btnsElem);

        btnEdit.addEventListener('click', () => {
            formFields.name.value = data.name;
            formFields.amount.value = data.amount;
            formFields.categories.value = data.categories;
            formFields.description.value = data.description;
            
            if (data.type == 'i') formFields.type.checked = true;
            else formFields.type2.checked = true;

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

                window.finance.edit(data.id, obj);

                let dataAll = window.finance.get('', true);        
                localStorage.setItem('transactions', JSON.stringify(dataAll));
                
                formElem.remove();

                location.reload();
            }, { once: true });
        });

        btnRemove.addEventListener('click', () => {
            window.finance.remove(data.id);
            location.href = '/#transactions';
        });
    }
}

export default new Page().elem;