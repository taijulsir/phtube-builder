// blog page
document.getElementById('blog-container').addEventListener('click',function(){
    const newPage = 'blog.html';
    window.location.href=newPage;
});

// Load all category item
const loadData = async () =>{
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const allData = data.data;
    showTabItem(allData);
}
// show category in tab
const showTabItem = (tabItem) => {

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




const handleAllChannel = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await response.json()
    const allData = data.data;
    const cardContainer = document.getElementById('card-container');

    const sortingByView = document.getElementById('sort-view');
    const sortingData = () => {
        const sortData = allData.sort((a, b) => {
            a = a?.others?.views;
            a = parseFloat(a.replace("K", ""));

            b = b?.others?.views;
            b = parseFloat(b.replace("K", ""));
            return b - a;
        })
        cardItem(sortData);
    }
    sortingByView.addEventListener('click', sortingData);
    const cardItem = (allCardItemData) => {
        cardContainer.textContent = ""
        allCardItemData.forEach(card => {

            // show time in card
            const totalSecond = card.others.posted_date;
            const previousMinutes = totalSecond % 60;
            const minutesTotal = (totalSecond - previousMinutes) / 60;
            const previousHours = minutesTotal % 60;
            const hoursTotal = (minutesTotal - previousHours) / 60


            let time ;
            if(totalSecond.length === 0){
                time;
            }
            else{
                time = `${hoursTotal} Hours ${previousHours} Minutes ago`;
            }


            // card data
            const div = document.createElement('div');
            div.innerHTML = `
        <div id="card" class="card card-compact">
            <div class="relative">
                <figure class="w-full h-[200px]">
                    <img class="w-full h-full rounded-lg" src="${card.thumbnail}" alt="Shoes" />
                </figure>
                <div class=" ${time==undefined ? "bg-transparent border-none " : "text-white"} bg-black  opacity-70 absolute bottom-3 right-2">${time?time : ''}</div>
            </div>
            <div class="card-body">
                <div class="flex gap-4 items-center">
                    <div class="avatar">
                        <div class="w-10 rounded-full">
                            <img src="${card?.authors[0]?.profile_picture}" />
                        </div>
                    </div>
                    <div>
                        <h2 class="text-[#171717] font-bold text-lg"> ${card?.title} </h2>
                    </div>
                </div>
                <div class="flex gap-3 ml-14">
                    <div class="text-sm font-normal text-[#252525B2]">${card?.authors[0]?.profile_name}</div>
                    <span class="w-5 h-5">${card?.authors[0]?.verified? ('<img src="./images/fi_10629607.svg">') : ''}</span>
                </div>
                <p class="text-sm font-normal text-[#252525B2] ml-14">${card?.others?.views} Views</p>
            </div>
        </div>
        `;
        cardContainer.appendChild(div);
        })

        // no data found

        const noDataContainer = document.getElementById('noData-found');
        if (allCardItemData.length === 0) {
            noDataContainer.innerHTML = `
       <div class="flex justify-center items-center ">
            <div class="w-3/4 mx-auto text-center">
                <div class=" mt-10 lg:mt-28 mb-6 w-44 mx-auto">
                    <img src="/images/icon.png" alt="" />
                </div>
                <div>
                    <h2 class="font-bold text-4xl text-[#171717]">Oops!! Sorry, There is <br> no content here</h2>
                </div>
            </div>
       </div>

       `;
        }
         else {
            noDataContainer.innerHTML = ""
        }

    }
    cardItem(allData);

}

handleAllChannel(1000);

loadData();