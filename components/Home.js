class Page {
    constructor() {
        this.create();
    }

    create() {
        this.elem = document.createElement('div');
        this.elem.classList.add('home');

        this.elem.innerHTML = `
        <div class="balance">
            <h3>Your balance</h3>
            <div class="balance__amount">$${window.finance.getBalance()}</div>
        </div>

        <a class="transactions__page" href="/#transactions">All transactions</a>
        `;
    }
}

export default new Page().elem;