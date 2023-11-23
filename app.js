const categories = async() => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json()
    showCategoriesBtn(data.data);
}

const showCategoriesBtn = (data) => {
    const categoriesContainer = document.getElementById("categoriesContainer");
    categoriesContainer.innerHTML = data.map(category => {
        return `<input type="radio" class="btn-check" name="btnradio" id="btnradio${category.category_id}" autocomplete="off" ${category.category === "All" ? "checked" : ""} >
                <label onclick="handleCategory(${category.category_id})" class="btn btn-outline-danger" for="btnradio${category.category_id}">${category.category}</label>
                `
    }).join("")
}

const handleCategory = async(id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json()
    displayContent(data);
}

const displayContent = (data) => {
    console.log(data.status);
    const contentContainer = document.getElementById("contentContainer")
    contentContainer.innerHTML = ""
    contentContainer.classList.remove("content-container")
    if(data.status === false){
        const div = document.createElement("div")
        
        div.innerHTML = `
        <div class="no-content-message-container">
            <img src="images/Icon.png" alt="">
            <h1>Oops!! Sorry,<br>There is no content here</h1>
        </div>
        `
        contentContainer.appendChild(div)
        return
    }
    contentContainer.classList.add("content-container")
    data.data.forEach(content => {
        console.log(content);
        const div = document.createElement("div")
        div.innerHTML = `
        <div class="content">
        <div class="card border-0">
            <img class="content-img" src="${content.thumbnail}" alt="">
            <div class="card-img-overlay">
                <small class="position-absolute bottom-0 end-0 bg-black text-light rounded-2 px-2 pb-1 m-2 fw-light">some text</small>
            </div>
        </div>
        <div>
            <div class="d-flex mt-3 gap-2">
                <img class="profile-img" src="${content.authors[0].profile_picture}" alt="">
                <div>
                    <h6 class="fw-bold">${content.title}</h6>
                    <small>${content.authors[0].profile_name}</small>${content.authors[0].verified === true ? '<i class="fa fa-check-circle ms-2" style="color: #014dd0;"></i>' : "" }<br>
                    <small>${content.others.views} views</small>
                </div>
            </div>
        </div>
    </div>
        `
        contentContainer.appendChild(div)
    });
}

categories()
handleCategory("1000")
