// blog page
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
    <a class="tab hover:bg-red-600 text-xl font-medium" onclick="handleAllChannel('${items.category_id}')";>${items.category}</a> 
        `;
        
        
        tabContainer.appendChild(tabDiv);
    });
}

// sort by view

 


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
    items?.forEach((channel) => {

        const totalSecond = channel.others.posted_date;
        const previousMinutes = totalSecond % 60 ;
        const minutesTotal = (totalSecond - previousMinutes) / 60;
        const previousHours = minutesTotal % 60;
        const hoursTotal = (minutesTotal - previousHours) / 60;
        
        
        let time ;
        if(totalSecond.length === 0){
            time;
        }
        else{
            time = `${hoursTotal} Hours ${previousHours} minutes ago`;
        }
        const div = document.createElement('div');
        div.classList=`card bg-base-100 shadow-xl`;
        div.innerHTML=`
            <div class="relative">
            <img class="h-[200px] w-full border border-none rounded-lg  " src="${channel.thumbnail}" alt="Youtube-Thumbnail" />
            <div class="badge  ${time==undefined ? "bg-transparent border-none" : "bg-white"} bg-black absolute  bottom-3 right-2">${time?time : ''}</div>
            </div>
            
           

        <div class="mt-5 flex items-center  gap-4 pl-3 ">
            <div class="avatar">
                <div class="w-12 rounded-full">
                    <img src="${channel.authors[0].profile_picture}" />
                
                </div>
            </div>
            <h3 class="text-2xl font-bold">${channel.title}</h3>
        </div>
        <div class=" flex gap-3 items-center">
            <p class=" ml-20 text-lg ">${channel.authors[0].profile_name}</p> 

            <span>${channel.authors[0].verified? ('<img src="./images/fi_10629607.svg" alt="">') : '' } </span>  
        </div>
        <p class=" ml-20 text-lg ">${channel.others.views} views</p>
        
  
        `;
        cardContainer.appendChild(div);
    });

 
    if(items.length === 0){
       const noDataFOundContainer = document.getElementById('noData-found');
     noDataFOundContainer.innerHTML=`
     <div class="flex justify-center items-center mb-5"><img src="images/Icon.png" alt=""></div>
     <h1 class="text-center text-3xl font-bold">Oops!! Sorry, There is no <br> content here</h1>  
     `;
    }
    else{
        const noDataFOundContainer = document.getElementById('noData-found');
        noDataFOundContainer.innerHTML ='';
    }
}



handleAllChannel(1000);

loadData();