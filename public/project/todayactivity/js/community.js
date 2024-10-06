const $listContainer = document.querySelector('.community>.listContainer');
const $searchForm = document.querySelector('.listContainer>.searchForm');
const $searchInput = document.querySelector('.searchForm>#searchInput');
const $ratingList = document.querySelector('.listContainer>.ratingList');

const $ratingContainer = document.querySelector('.community>.ratingContainer');
const $ratings = document.querySelectorAll('.ratingContainer>p');
const $ratingName = document.querySelector('.ratingContainer>.ratingName');

// const rightGradient = (DOM) => {
//     DOM.setAttribute('style', `background: linear-gradient(
//     to right,

//     red 0%,
//     red 20%,

//     orange 20%,
//     orange 40%,

//     yellow 40%,
//     yellow 60%,

//     green 60%,
//     green 80%,

//     blue 80%,
//     blue 100%
//   );`);
// };


const reRenderRatingListFn = () => {
    // 리스트컨테이너에 존재하는 모든 요소 초기화(폼제외)
    while ($listContainer.children.length > 1) {
        $listContainer.removeChild($listContainer.children[1]);
    }

    const myLists = JSON.parse(localStorage.getItem('locations')).myLists;
    for (let myList of myLists) {
        const $ratingList = document.createElement('p');
        $ratingList.classList.add('ratingList');
        $ratingList.textContent = myList.name;
        $listContainer.appendChild($ratingList);
    };

    // 새로 생성된 레이팅리스트에 대한 클릭 이벤트핸들러
    const $ratingLists = document.querySelectorAll('.listContainer>.ratingList');
    $ratingLists.forEach(($ratingList) => {
        $ratingList.addEventListener('click', () => {
            $ratingName.textContent = `${$ratingList.textContent}`;
            const $roadConScore = document.querySelector('.roadCondition>.score');
            const $complexScore = document.querySelector('.complexity>.score');
            const $accessScore = document.querySelector('.accessibility>.score');
            const $comfortScore = document.querySelector('.comfortness>.score');

            const myLists = JSON.parse(localStorage.getItem('locations')).myLists;
            const clickedRating = myLists.find(myList => myList.name === $ratingList.textContent);

            $roadConScore.classList.remove('one', 'two', 'three', 'four', 'five');
            $complexScore.classList.remove('one', 'two', 'three', 'four', 'five');
            $accessScore.classList.remove('one', 'two', 'three', 'four', 'five');
            $comfortScore.classList.remove('one', 'two', 'three', 'four', 'five');

            $roadConScore.classList.add(`${clickedRating.roadCondition}`);
            $complexScore.classList.add(`${clickedRating.complexity}`);
            $accessScore.classList.add(`${clickedRating.accessibility}`);
            $comfortScore.classList.add(`${clickedRating.comfortness}`);
        });
    });
};

reRenderRatingListFn();


// 주소로 검색하기 이벤트핸들러
$searchForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    if (!$searchInput.value) { return alert('주소를 입력해주세요~!') };

    let data = await (await fetch(`/address?query=${encodeURIComponent($searchInput.value)}`)).json();

    // data = {
    //     "documents": [
    //         {
    //             "address": {
    //                 "address_name": "충남 천안시",
    //                 "b_code": "4413000000",
    //                 "h_code": "4413000000",
    //                 "main_address_no": "",
    //                 "mountain_yn": "N",
    //                 "region_1depth_name": "충남",
    //                 "region_2depth_name": "천안시",
    //                 "region_3depth_h_name": "",
    //                 "region_3depth_name": "",
    //                 "sub_address_no": "",
    //                 "x": "127.113911972591",
    //                 "y": "36.8150678816283"
    //             },
    //             "address_name": "충남 천안시",
    //             "address_type": "REGION",
    //             "road_address": null,
    //             "x": "127.113911972591",
    //             "y": "36.8150678816283"
    //         }
    //     ],
    //     "meta": {
    //         "is_end": true,
    //         "pageable_count": 1,
    //         "total_count": 1
    //     }
    // }// correct data

    // data = {
    //     "documents": [],
    //     "meta": {
    //         "is_end": true,
    //         "pageable_count": 0,
    //         "total_count": 0
    //     }
    // } // wrong data

    // data = {
    //     "documents": [
    //         {
    //             "address": null,
    //             "address_name": "강원특별자치도 강릉시 강동면 헌화로",
    //             "address_type": "ROAD",
    //             "road_address": {
    //                 "address_name": "강원특별자치도 강릉시 강동면 헌화로",
    //                 "building_name": "",
    //                 "main_building_no": "",
    //                 "region_1depth_name": "강원특별자치도",
    //                 "region_2depth_name": "강릉시",
    //                 "region_3depth_name": "강동면",
    //                 "road_name": "헌화로",
    //                 "sub_building_no": "",
    //                 "underground_yn": "N",
    //                 "x": "129.056623103233",
    //                 "y": "37.6587592859747",
    //                 "zone_no": ""
    //             },
    //             "x": "129.056623103233",
    //             "y": "37.6587592859747"
    //         },
    //         {
    //             "address": null,
    //             "address_name": "강원특별자치도 강릉시 옥계면 헌화로",
    //             "address_type": "ROAD",
    //             "road_address": {
    //                 "address_name": "강원특별자치도 강릉시 옥계면 헌화로",
    //                 "building_name": "",
    //                 "main_building_no": "",
    //                 "region_1depth_name": "강원특별자치도",
    //                 "region_2depth_name": "강릉시",
    //                 "region_3depth_name": "옥계면",
    //                 "road_name": "헌화로",
    //                 "sub_building_no": "",
    //                 "underground_yn": "N",
    //                 "x": "129.056623103233",
    //                 "y": "37.6587592859747",
    //                 "zone_no": ""
    //             },
    //             "x": "129.056623103233",
    //             "y": "37.6587592859747"
    //         }
    //     ],
    //     "meta": {
    //         "is_end": true,
    //         "pageable_count": 2,
    //         "total_count": 2
    //     }
    // } // many options


    // 셀렉터 초기화 및 재생성
    if (data.meta.total_count === 0) {
        const $ratingList = document.querySelector('.listContainer>.ratingList');
        const $selectors = document.querySelectorAll('.listContainer>.selector');
        $selectors.forEach($selector => $selector.remove());
        const $selector = document.createElement('p');
        $selector.classList.add('selector', 'error');
        $selector.textContent = `올바른 주소를 입력해주세요~!`;
        $listContainer.insertBefore($selector, $ratingList);
        $searchInput.value = '';
        $searchInput.focus();
    } else {
        for (i = 0; i < data.meta.total_count; i++) {
            const $ratingList = document.querySelector('.listContainer>.ratingList');
            const $selectors = document.querySelectorAll('.listContainer>.selector');
            $selectors.forEach($selector => $selector.remove());
            const $selector = document.createElement('p');
            $selector.classList.add('selector');
            $selector.id = i;
            $selector.textContent = `${data.documents[i].address_name}`;
            $listContainer.insertBefore($selector, $ratingList);
            $searchInput.value = '';
            $searchInput.focus();
        }
    }

    // 생성된셀렉터에 대한 이벤트 리스너
    const $selectors = document.querySelectorAll('.listContainer>.selector');
    $selectors.forEach(($selector) => {
        $selector.addEventListener('click', () => {
            if ($selector.classList.contains('error')) { return };
            if (confirm(`${$selector.textContent}를 저장하시겠습니까?`)) {
                const idx = parseInt($selector.id);
                const name = $selector.textContent;
                const lat = data.documents[idx].y;
                const lon = data.documents[idx].x;
                const roadCondition = "three";
                const complexity = "three";
                const accessibility = "three";
                const comfortness = "three";
                const newList = { name, lat, lon, roadCondition, complexity, accessibility, comfortness };

                locations.myLists.push(newList);
                saveLocations();
                reRenderRatingListFn();
                reRenderMyList();
            }
        });
    });
}); //searchForm EventListener

// 점수영역에 점수버튼 추가 및 클릭 이벤트 구문
$ratings.forEach(($rating, idx) => {
    if (idx !== 0) {
        for (i = 0; i < 5; i++) {
            const $a = document.createElement('a');
            $a.href = '#'
            $a.textContent = `${i + 1}`;
            $a.style.left = `${20 * i + 5}%`;
            $rating.appendChild($a);
        }
    }

    const $as = document.querySelectorAll('.ratingContainer a');
    $as.forEach(($a) => {
        $a.addEventListener('click', (evt) => {
            evt.preventDefault();

            if ($a.textContent === '1') {
                $a.parentElement.firstElementChild.classList.remove('one', 'two', 'three', 'four', 'five');
                $a.parentElement.firstElementChild.classList.add('one');
            } else if ($a.textContent === '2') {
                $a.parentElement.firstElementChild.classList.remove('one', 'two', 'three', 'four', 'five');
                $a.parentElement.firstElementChild.classList.add('two');
            } else if ($a.textContent === '3') {
                $a.parentElement.firstElementChild.classList.remove('one', 'two', 'three', 'four', 'five');
                $a.parentElement.firstElementChild.classList.add('three');
            } else if ($a.textContent === '4') {
                $a.parentElement.firstElementChild.classList.remove('one', 'two', 'three', 'four', 'five');
                $a.parentElement.firstElementChild.classList.add('four');
            } else if ($a.textContent === '5') {
                $a.parentElement.firstElementChild.classList.remove('one', 'two', 'three', 'four', 'five');
                $a.parentElement.firstElementChild.classList.add('five');
            }
        });
    });
});


//점수 저장버튼 이벤트핸들러
const $ratingButton = document.querySelector('.ratingContainer>button');
$ratingButton.addEventListener('click', () => {
    const name = $ratingButton.parentElement.firstElementChild.textContent;
    const $roadConScore = document.querySelector('.roadCondition>.score');
    const $complexScore = document.querySelector('.complexity>.score');
    const $accessScore = document.querySelector('.accessibility>.score');
    const $comfortScore = document.querySelector('.comfortness>.score');

    const roadCondition = $roadConScore.className.split(" ")[1];
    const complexity = $complexScore.className.split(" ")[1];
    const accessibility = $accessScore.className.split(" ")[1];
    const comfortness = $comfortScore.className.split(" ")[1];

    if (name === "방문지") { return };

    locations = JSON.parse(localStorage.getItem('locations'));
    const selectedIdx = locations.myLists.findIndex(myList => myList.name === name);

    const editedList = { ...locations.myLists[selectedIdx], roadCondition, complexity, accessibility, comfortness };
    locations.myLists.splice(selectedIdx, 1, editedList);

    saveLocations();

});