class FormTransaction {
    constructor() {
        this.create();
    }

    create() {
        this.elem = document.createElement('div');
        this.elem.classList.add('modal__form_transaction');

        /*
            name
            type: incoming, outgoing
            amount
            categories
            description
        */

        let inputName = document.createElement('input');
        inputName.setAttribute('type', 'text');
        inputName.setAttribute('name', 'name');
        inputName.setAttribute('placeholder', 'Name');

        let radioType = document.createElement('input');
        radioType.setAttribute('type', 'radio');
        radioType.setAttribute('name', 'type');
        radioType.value = 'i';

        let radioType2 = document.createElement('input');
        radioType2.setAttribute('type', 'radio');
        radioType2.setAttribute('name', 'type');
        radioType2.setAttribute('checked', 'checked');
        radioType2.value = 'o';

        let inputAmount = document.createElement('input');
        inputAmount.setAttribute('type', 'number');
        inputAmount.setAttribute('name', 'amount');
        inputAmount.value = 0;

        let inputCategories = document.createElement('input');
        inputCategories.setAttribute('type', 'text');
        inputCategories.setAttribute('name', 'categories');
        inputCategories.setAttribute('placeholder', 'Categories');

        let inputDesc = document.createElement('input');
        inputDesc.setAttribute('type', 'text');
        inputDesc.setAttribute('name', 'description');
        inputDesc.setAttribute('placeholder', 'Description');

        let btnSend = document.createElement('button');
        btnSend.innerHTML = 'Send';

        let fieldName = document.createElement('div');
        let fieldType = fieldName.cloneNode();
        let fieldAmount = fieldName.cloneNode();
        let fieldCategories = fieldName.cloneNode();
        let fieldDesc = fieldName.cloneNode();

        fieldName.append(inputName);
        fieldType.append(
            radioType, 
            ' - incoming',
            document.createElement('br'), 
            radioType2, 
            ' - outgoing'
        );
        fieldAmount.append(inputAmount);
        fieldCategories.append(inputCategories);
        fieldDesc.append(inputDesc);

        this.elem.append(
            fieldName, 
            fieldType, 
            fieldAmount,
            fieldCategories,
            fieldDesc,
            btnSend
        );

        this.fName = inputName;
        this.fType = radioType;
        this.fType2 = radioType2;
        this.fAmount = inputAmount;
        this.fCategories = inputCategories;
        this.fDesc = inputDesc;
        this.bSend = btnSend;
    }
}

let form = new FormTransaction();

let formElem = form.elem;
let formFields = {
    name: form.fName,
    type: form.fType,
    type2: form.fType2,
    amount: form.fAmount,
    categories: form.fCategories,
    description: form.fDesc,
    send: form.bSend
};

export {formElem, formFields};