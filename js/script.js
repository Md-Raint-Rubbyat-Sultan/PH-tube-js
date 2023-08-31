const btnContainer = document.getElementById("btnContainer");

const loadCategoryBtn = async () => {
    // fetching
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    console.log(data);
}

loadCategoryBtn();