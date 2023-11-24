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
    displayContentChecking(data);
}

const displayContentChecking = (data) => {
    const contentContainer = document.getElementById("contentContainer")
    
    if(data.status === false){
        contentContainer.innerHTML = ""
        contentContainer.classList.remove("content-container")
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

    displayContent(data.data)
    
}

const timeConverter = (second) => {
    let minute = 0;
    let hour = 0;
    let day = 0;
    let month = 0;
    let year = 0;
    if(second){
        minute = Math.floor(second/60)
        if(minute >= 60){
            hour = Math.floor(minute/60)
            minute = minute%60
            if(hour >= 24){
                day = Math.floor(hour/24)
                hour = hour%24
                if(day >= 30){
                    month = Math.floor(day/30)
                    day = day%30
                    if(month >= 12){
                        year = Math.floor(month/12)
                        month = month%12
                    }
                }
            }
        }
    }

    return {
        minute : minute,
        hour : hour,
        day : day,
        month : month,
        year : year
    }
}


const displayContent = (data) => {
    const contentContainer = document.getElementById("contentContainer")
    contentContainer.classList.add("content-container")
    contentContainer.innerHTML = ""

    data.forEach(content => {
        const timeObj = timeConverter(content.others.posted_date)

        const div = document.createElement("div")
        div.innerHTML = `
        <div class="content">
        <div class="card border-0">
            <img class="content-img" src="${content.thumbnail}" alt="">
            <div id="postedDate" class="card-img-overlay">
                ${content.others.posted_date ? `<small class="position-absolute bottom-0 end-0 bg-black text-light rounded-2 px-2 pb-1 m-2 fw-light">${timeObj.year ? (timeObj.year + " year ago") : (timeObj.month ? (timeObj.month + " month ago") : (timeObj.day ? (timeObj.day +" day ago") : (timeObj.hour + "hrs " + timeObj.minute + " min ago")))}</small>` : ''}
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

const handleSort = async(id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json()    

    const sortedData = data.data.sort((a, b) => {
        return parseFloat(b.others.views) - parseFloat(a.others.views)
    })

    displayContent(sortedData);

}

