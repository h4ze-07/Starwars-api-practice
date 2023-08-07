const API = 'https://swapi.dev/api/'

const loader = document.getElementById('loader');
const cardContainer = document.querySelector('.cards');

const showLoader = () => {
    loader.classList.remove('hide')
}

const hideLoader = () => {
    loader.classList.add('hide')
}

let openData;
let openParam;

const fetchData = async (param) => {
    try {
        clearCards()
        showLoader()
        let response = await fetch(API + param);
        let data = await response.json();
        hideLoader()

        openData = data;
        openParam = param;

        let result = [openData.results];
        result.push(openParam);

        showCards(result[0], result[1])

    } catch (err) {
        alert('Something wrong: ' + err.message)
    }
}

document.getElementById('prev').addEventListener('click', async (e) => {

    const prevPage = async () => {
        
        if (openData === undefined) {
            return null;
        } else {
            if (openData.previous !== null) {
                clearCards();
                showLoader();
                let prevRes = await fetch(openData.previous);
                let prevData = await prevRes.json();
                hideLoader();
        
                openData = prevData;
        
                showCards(prevData.results, openParam);
                
            } else if (openData.previous === null) {
                return null;
            }
        }
    }
    await prevPage();
});


document.getElementById('next').addEventListener('click', async (e) => {

    const nextPage = async () => {

        if (openData === undefined) {
            return null;
        } else {
            if (openData.next !== null) {
                clearCards();
                showLoader();
                let nextRes = await fetch(openData.next);
                let nextData = await nextRes.json();
                hideLoader();
        
                openData = nextData;
        
                showCards(nextData.results, openParam);
            } else if (openData.next === null) {
                return null;
            }
        }
    };
    await nextPage();
});


const showCards = (arr, mod) => {

    let html = '';
    let moreInfo = '';

    arr.forEach((element) => {

        if (mod === 'people') {
            moreInfo = 
                `<div class="more-info hide">
                    <p>Birth year: ${element.birth_year}</p>
                    <p>Gender: ${element.gender}</p>
                    <p>Height: ${element.height}</p>
                    <p>Mass: ${element.mass}</p>
                </div>`
            
        } else if (mod === 'planets') {
            moreInfo = 
                `<div class="more-info hide">
                    <p>Climate: ${element.climate}</p>
                    <p>Population: ${element.climate}</p>
                    <p>Terrain: ${element.terrain}</p>
                    <p>Diameter: ${element.diameter}</p>
                </div>`
        } else if (mod === 'starships') {
            moreInfo = 
                `<div class="more-info hide">
                    <p>Model: ${element.model}</p>
                    <p>Cargo capacity: ${element.cargo_capacity}</p>
                    <p>Length: ${element.length}</p>
                    <p>Cost: ${element.cost_in_credits}</p>
                </div>`
        }


        html += 
            `<div class="card">
                <p class="card-title">Name:<br />${element.name}</p>
                <p class="card-num">Category: ${mod}</p>
                <button class="info">Show info:</button>
                ${moreInfo}
            </div>`
        cardContainer.insertAdjacentHTML('beforeend', html);
        html = '';
        moreInfo = '';
    });
    

    let cardList = document.querySelectorAll('.card');
    for (let index = 0; index < cardList.length; index++) {
        let moreInfoList = cardList[index].children[3]
        let showInfo = cardList[index].children[2];
        showInfo.addEventListener('click', (e) => {
            moreInfoList.classList.toggle('hide')
        })
    }
}

const clearCards = () => {
    cardContainer.innerHTML = '';
}