const btnContainer = document.getElementById("btnContainer");
const cardContainer = document.getElementById("cardContainer");
let cardData;

// millisecond to hour, minute, second
const milliToHour = (time) => {
    if (time) {
        console.log(time)
        let second = Math.floor(time / 1000);
        let minute = Math.floor(second / 60);
        let hour = Math.floor(minute / 60);

        second = second % 60;
        minute = minute % 60;
        hour = hour % 24;

        const newTime = `${hour.toString().padStart(2, "0")}hrs ${minute.toString().padStart(2, "0")}min ago`;
        return newTime;
    } else {
        return "";
    }
}


// loading categories btn
const loadCategoryBtn = async () => {
    // fetching
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    displayCategoryBtn(data?.data);
}

// loading card data
const loadCardData = async (id) => {
    // fetching
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    // setting card data
    cardData = data?.data;
    // display cards
    displayCards(data?.data);
}

// sort btn
const handelSortBtn = () => {
    const mainData = cardData;
    // sorting data
    const newData = mainData.sort((a, b) => {
        const numAText = a?.others?.views;
        const numBText = b?.others?.views;
        const numA = parseFloat(numAText.slice(0, numAText.length - 1));
        const numB = parseFloat(numBText.slice(0, numBText.length - 1));

        return numA - numB;
    });
    displayCards(newData);
}

// display category tbn
const displayCategoryBtn = (categories) => {
    categories.forEach(categoryType => {
        const { category, category_id } = categoryType;
        const div = document.createElement("div");
        div.innerHTML = `
            <button onclick="loadCardData('${category_id}')" class="btn btnFocused">${category}</button>
        `;
        btnContainer.appendChild(div);
    });
}

// display cards
const displayCards = (cardsData) => {
    // console.log(cardsData);
    cardContainer.textContent = "";
    if (cardsData.length > 0) {
        cardsData.forEach(data => {
            const { category_id, thumbnail, title, authors, others } = data;

            // calculate time
            const time = milliToHour(others?.posted_date);
            // console.log(time);

            // creating card
            const div = document.createElement("div");
            div.classList = "card card-compact";
            div.innerHTML = `
        <div class="relative">
            <figure>
                <img src="${thumbnail}" alt="Shoes" class="h-52 w-full rounded-b-xl rounded-l-xl" />
            </figure>
            <div class="${others?.posted_date ? "block" : "hidden"} absolute bottom-4 right-4">
                <p class="bg-minutes text-white p-1 rounded">${time}</p>
            </div>
        </div>
        <div class="card-body">
            <div class="flex items-start">
                <img src="${authors[0]?.profile_picture}" alt="${authors[0]?.profile_name}" class="w-10 h-10 me-3 rounded-full">
                <div>
                    <h2 class="card-title text-textClr font-bold">${title}</h2>
                    <p class="my-2 text-textMute flex items-center">
                        ${authors[0]?.profile_name}
                        <span class="ms-2 ${authors[0]?.verified ? "block" : "hidden"}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-blue-700">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" ></path>
                            </svg>
                        </span>
                    </p>
                    <p class="text-textMute">${others?.views} views</p>
                </div>
            </div>
        </div>
        `;
            cardContainer.appendChild(div);
        });
    } else {
        cardContainer.innerHTML = `
            <div class="card card-compact col-span-1 md:col-span-2 lg:col-span-4">
                <figure>
                    <img src="/assets/Icon.png" alt="Shoes" />
                </figure>
                <h2 class="text-center text-textClr font-bold text-4xl my-8">Oops!! Sorry, There is no content here</h2>
            </div>
        `
    }
}

loadCategoryBtn();
loadCardData("1000");