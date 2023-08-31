document.getElementById("blog-container").addEventListener('click',function(){
    const newPage = 'blog.html';
    window.location.href=newPage;
});



// Load all category item
const loadData = async () =>{
    const response = await fetch(' https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const allData = data.data;
    showTabItem(allData);
}
// show category in tab
const showTabItem = tabItem => {
    const tabContainer = document.getElementById('tab-container');
    tabItem.forEach(items => {
        const tabDiv = document.createElement('div');
        
        tabDiv.classList=`tabs tabs-boxed `;
       
        tabDiv.innerHTML =`   
    <a class="tab" onclick="handleAllChannel('${items.category_id}')">${items.category}</a> 
        `;
        
        
        tabContainer.appendChild(tabDiv);
    });
}

// load dynamic all data
const loadAllData = async() =>{
    const response = await fetch('https://openapi.programming-hero.com/api/videos/category/1000');
    const data = await response.json();
    const allData = data.data;
    showAllData(allData);
}
// show default video
const showAllData= data =>{
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent='';
    data.forEach(channel => {
     const cardDiv = document.createElement('div');
     cardDiv.classList=`card bg-base-100 shadow-xl`;
     cardDiv.innerHTML = `
     <img class="h-[200px] w-[]312px rounded-xl" src="${channel.thumbnail}" alt="Youtube-Thumbnail" />
  <div class="card-body">
            <h2 class="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
        </div>
  </div>
     
     `;
     cardContainer.appendChild(cardDiv);
    });
}
// when click tab then show this type data
const handleAllChannel = async (id) => {
   const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
   const data = await response.json();
   const allData = data.data;
   showSelectedChannel(allData);
}
const showSelectedChannel = items =>{
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent='';
    items?.forEach(channel => {
        console.log(channel)
        const div = document.createElement('div');
        div.classList=`card bg-base-100 shadow-xl`;
        div.innerHTML=`
        <img class="h-[200px] w-[]312px" src="${channel.thumbnail}" alt="Youtube-Thumbnail" />
  <div class="card-body">
            <h2 class="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
        </div>
  </div> 
        `;
        cardContainer.appendChild(div);
    });
}


// loadAllData();

loadData();