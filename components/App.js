import Transactions from './core/Transactions.js';

class App {
    constructor() {
        window.finance = new Transactions();

        this.storage();
        
        this.routing();
        this.create();
        this.render();
    }

    storage() {
        let data = window.finance.get('', true);

        if (data && data.length > 0) return; 

        let localData = localStorage.getItem('transactions');

        if (!localData || localData.length == 0) {

            fetch('https://62a361f85bd3609cee692eea.mockapi.io/api/all')
            .then(response => response.json())
            .then(result => {
                result.forEach(item => {

                    localStorage.setItem('transactions', JSON.stringify(result));
                    this.storage();

                    location.reload();

                });
            });

            return;

        }

        localData = JSON.parse(localData);

        if (!localData || localData.length == 0) return;

        localData.forEach(item => {
            window.finance.add(item);
        });
    }

    routing() {
        const getModule = (name) => {
            return import(`./${name}.js?t=${Date.now()}`)
            .then(module => {
                if (!module.default) return;

                this.elem.innerHTML = '';
                this.elem.append(module.default);
            })
            .catch(err => {
                this.elem.innerHTML = '404 Error: Page not found';
            });
        }

        const getHash = () => {
            let hash = location.hash;
            
            if (!hash) return;

            hash = hash.slice(1);

            if (hash.includes('transaction/')) hash = 'transaction';

            if (!hash || hash.length == 0) return;

            return hash;
        }

        window.addEventListener('hashchange', () => {
            getModule(getHash());
        });

        if (!location.hash && location.pathname == "/") {
            getModule('home');
        } else {
            getModule(getHash());
        }
    }

    create() {
        this.elem = document.createElement('div');
        this.elem.classList.add('.app');
    }

    render() {
        document.querySelector('#root').append(this.elem);
    }
}

export default new App();