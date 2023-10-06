document.addEventListener("DOMContentLoaded", function () {
    // Fetch the JSON data
    fetch('assets/all.json')
        .then(response => response.json())
        .then(data => {
            // Get a reference to the unordered list
            const flag = document.querySelector('#flags');
            // Iterate through each key-value pair in the JSON data
            data.forEach(item => {
                // Create a list item for each key-value pair and append it to the unordered list
                const listItem = document.createElement('li');
                listItem.className = "dropdown-item"
                listItem.innerHTML = `
                    <div class="row" onclick="changeLang('${item.cca2}', '${item.flags.png}')">
                        <div class="col-5">
                            ${item.cca2}
                        </div>
                        <div class="col-5">
                            <img src="${item.flags.png}" width="21" height="16"
                                 alt=""/>
                        </div>
                    </div>
                `;
                flag.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

//Change the header of dropdown list
function changeLang(a, b) {
    console.log('changeLang called with', a, b);
    let country = document.getElementById('country');
    let flag = document.getElementById('flg');
    country.innerHTML = a;
    flag.src = b;
    console.log('Image source updated to', b);
}
/*--------------------------------------*/
/*create a multi-card carousel by duplicating and appending elements within each carousel item. The function takes a single argument minPerSlide, that specify the minimum number of items to be displayed per slide in the carousel.*/
function multiCarouse(minPerSlide) {
    let items = document.querySelectorAll('.m-carousel .carousel-item')
    items.forEach((el) => {
        let next = el.nextElementSibling
        for (var i = 1; i < minPerSlide; i++) {
            if (!next) {
                // wrap carousel by using first child
                next = items[0]
            }
            let cloneChild = next.cloneNode(true)
            el.appendChild(cloneChild.children[0])
            next = next.nextElementSibling
        }
    })
}
/* check if  media query matches the current window's viewport */
const xlargeQuery = window.matchMedia("(min-width: 1200px)");
const largeQuery = window.matchMedia("(min-width: 992px)");
const mediumQuery = window.matchMedia("(min-width: 768px)");
const smallQuery = window.matchMedia("(max-width: 600px)");
xlargeQuery.onchange = onMediaQueryChange;
largeQuery.onchange = onMediaQueryChange;
mediumQuery.onchange = onMediaQueryChange;
smallQuery.onchange = onMediaQueryChange;

/*At each screen size, the number of cards to be displayed is specified*/
function onMediaQueryChange() {
    if (xlargeQuery.matches) {
        setData(4)
        console.log("xlargeQuery Match")
        return
    }
    if (largeQuery.matches) {
        setData(3)
        console.log("largeQuery Match")
        return
    }
    if (mediumQuery.matches) {
        setData(2)
        console.log("mediumQuery Match")
        return
    }
    if (smallQuery.matches) {
        setData(1)
        console.log("smallQuery Match")
        return
    }
}
/*------------------carousel data--------------------*/
mobileData = []
function setData(minPerSlide) {
    // Get a reference to the unordered list
    const multiCards = document.querySelector('#multi-cards');
    multiCards.innerHTML = ''
    // Iterate through each key-value pair in the JSON data
    mobileData.forEach((item, index) => {
        const details = document.createElement('div');
        details.className = "carousel-item"
        if (index === 0) {
            details.className += " active"
        }
        details.innerHTML = `
                    <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 h-fit-content d-flex justify-content-between px-3">
                        <div class="card w100 parentButton h100 card-hover">
                            <img src="${item.images[0]}"
                                 class="card-img-top h300 border-none" alt="...">
                           <button class="buttonHover bghov">Add To Card</button>
                            <div class="card-body bg-light-gray">
                                <h5 class="card-title color-black p-all-2 fw-800 text-center">${item.title}</h5>
                                <div class="ratings text-center">
                                    <i class="fa fa-star rating-color color-light-gray"></i>
                                    <i class="fa fa-star rating-color color-light-gray"></i>
                                    <i class="fa fa-star rating-color color-light-gray"></i>
                                    <i class="fa fa-star rating-color color-light-gray"></i>
                                    <i class="fa fa-star rating-color color-light-gray"></i>
                                </div>
                                <p class="card-text p-all-6 fs14 text-center">${item.price} $
                                    <del class="text-muted text-center">34.6</del>
                                </p>
                            </div>
                        </div>
                    </div>
                `
        multiCards.appendChild(details);
    });
    multiCarouse(minPerSlide)
}

document.addEventListener("DOMContentLoaded", function () {
    fetch('https://dummyjson.com/products/category/smartphones')
        .then(res => res.json())
        .then(data => {
            mobileData = data.products
            setData(4)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

});

