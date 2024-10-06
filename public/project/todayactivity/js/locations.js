const resetLocations = () => {
    localStorage.setItem('locations', JSON.stringify({
        cities: [
            { name: 'Seoul', krName: '서울', lat: '37.565701', lon: '126.976202' },
            { name: 'GyeongGi', krName: '경기', lat: '37.284096', lon: '127.032042' },
            { name: 'GangWon', krName: '강원', lat: '37.885322', lon: '127.729996' },
            { name: 'ChungNam', krName: '충남', lat: '36.657649', lon: '126.673361' },
            { name: 'ChungBuk', krName: '충북', lat: '36.635280', lon: '127.491589' },
            { name: 'JeonNam', krName: '전남', lat: '34.815551', lon: '126.463224' },
            { name: 'JeonBuk', krName: '전북', lat: '35.819964', lon: '127.108099' },
            { name: 'GyeongNam', krName: '경남', lat: '35.237559', lon: '128.692020' },
            { name: 'GyeongBuk', krName: '경북', lat: '36.575249', lon: '128.505761' },
            { name: 'Jeju', krName: '제주', lat: '33.489075', lon: '126.498833' },
        ],
        myLists: [
            { name: '헌화로', lat: '37.652636833172956', lon: '129.05059860474657', roadCondition: 'three', complexity: 'three', accessibility: 'three', comfortness: 'three' },
            { name: '충주호 전망대', lat: '36.9729490498282', lon: '127.98105541538627', roadCondition: 'three', complexity: 'three', accessibility: 'three', comfortness: 'three'},
            { name: '동해고속도로', lat: '37.61608728995176', lon: '129.06056762466696', roadCondition: 'three', complexity: 'three', accessibility: 'three', comfortness: 'three' },
            { name: '삽교호', lat: '36.901141772473025', lon: '126.91032157185685', roadCondition: 'three', complexity: 'three', accessibility: 'three', comfortness: 'three'},
            { name: '대부도', lat: '37.28194057429627', lon: '126.56932998608943', roadCondition: 'three', complexity: 'three', accessibility: 'three', comfortness: 'three' },
            { name: '대청호 화남대교', lat: '36.43248916071283', lon: '127.55286525711851', roadCondition: 'three', complexity: 'three', accessibility: 'three', comfortness: 'three' },
        ]
    }));
};

if (!localStorage.locations) {
    resetLocations();
}

let locations = JSON.parse(localStorage.getItem('locations'));

const saveLocations = () => {
    localStorage.setItem('locations', JSON.stringify(locations));
};
