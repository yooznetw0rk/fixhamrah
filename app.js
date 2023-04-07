const inputElem = document.querySelector('#input');
const btnElem = document.querySelector('#getCfg');

let addreses = [
    { ip: 'mci.nazsuk.ga' },
    { ip: 'mci2.nazsuk.ga' },
    { ip: 'mci3.nazsuk.ga' }
]

let fixedCfg = [];
btnElem.addEventListener('click', () => {
    let userCfg = inputElem.value;
    let hostSeprator = (host)=> {
        let hostArr = host.split('.');
        hostArr[0] = makeid(8);
        return hostArr.join('.');
    }
    try {
        let cfgObj = JSON.parse(atob(userCfg.trim().substring(8)));
        addreses.forEach(adds => {
            let tempObj = { ...cfgObj };
            tempObj.add = adds.ip;
            tempObj.alpn = "http/1.1"
            tempObj.fp = "android"
            fixedCfg.push(tempObj);
            tempObj = '';
        });
        console.log(fixedCfg);
        let fixedCfgText = '';
        fixedCfg.forEach(cfg => {
            fixedCfgText += `vmess://${btoa(JSON.stringify(cfg))}\n\n`;
        });
        navigator.clipboard.writeText(fixedCfgText).then(() => {
            alert("کانفیگ ها با موفقیت در کلیپ بورد ذخیره شدند.")
        })

        fixedCfg = [];
        fixedCfgText = '';
    } catch (error) {
        console.log(error);
        alert("عملیات موفق نبود، به نظر میرسد لینکی که وارد کرده اید ناقص یا اشتباه است.")
    }
});
