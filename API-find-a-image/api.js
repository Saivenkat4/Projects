const accesskey = 'ouWOoVPLZSLq0NMHYBHiVMf7HZCaNFpE3_QjBJVP8Yg';
const searchform = document.querySelector('form');
const imageContainer = document.querySelector('.images-container');
const searchInput = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.loadMoreBtn');

let page = 1;

//function to fetch images using unsplash API
const fetchImages = async (query ,pageNo) => {
try {
    if(pageNo == 1){
        imageContainer.innerHTML = '';
    }

    // console.log(query);
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=32&page=${pageNo}&client_id=${accesskey}`;

    const response = await fetch(url);
    const data = await response.json();//converting the url to json ,if not how will you extract

    // console.log(data);

    if(data.results.length > 0){

        data.results.forEach(photo => {
            //creating image div
            const imageElement = document.createElement('div');
            imageElement.classList.add('imageDiv');
            imageElement.innerHTML = `<img src = "${photo.urls.regular}"/>`;

            //creating overlay
            const overlayElement = document.createElement('div');
            overlayElement.classList.add('overlay');

            //creating overlay text
            const overlayText = document.createElement('h3');
            overlayText.innerText = `${photo.alt_description}`;

            overlayElement.appendChild(overlayText);
            imageElement.appendChild(overlayElement);
            imageContainer.appendChild(imageElement);
        });

        if(data.total_pages === pageNo){
            loadMoreBtn.style.display = "none";
        }
        else{
            loadMoreBtn.style.display = "block";
        }
    }

    else{
        imageContainer.innerHTML = `<h2>No Image found.</h2>`
    }
} 
catch (error) {
    imageContainer.innerHTML = `<h2>Fail to Fetch Images.Please try later</h2>`
}

}



//ado function
// adding Event listener to search form
searchform.addEventListener('submit', (e) => {
    e.preventDefault();//stops the autosubmition in console
    // console.log(searchInput.value);
    const inputText = searchInput.value.trim();
    //trim -> remov excess space on both sides
    if(inputText !== ''){
        page = 1;
        fetchImages(inputText,page);
    }
    else{
        imageContainer.innerHTML = `<h2>Please enter a search query.</h2>`
        if(loadMoreBtn.style.display === "block"){
            loadMoreBtn.style.display = "none";
        }
    }

});

// adding Event listener to load more button to fetch more images
loadMoreBtn.addEventListener('click', () => {
    fetchImages(searchInput.value.trim(),++page);
});