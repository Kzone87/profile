if (!localStorage.getItem('GPTdata')) {
    localStorage.setItem('GPTdata', {
        list: [
            {}
        ]
    })
}

let GPTdata = localStorage.getItem('GPTdata');

const saveGPTFn = () => {
    localStorage.setItem('GPTdata', GPTdata);
};