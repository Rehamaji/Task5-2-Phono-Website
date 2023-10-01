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
                listItem.innerHTML =
               `
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
function changeLang(a,b){
    console.log('changeLang called with', a, b);
    let country=document.getElementById('country');
    let flag=document.getElementById('flg');
    country.innerHTML=a;
    flag.src=b;
    console.log('Image source updated to', b);
}
/*--------------------------------------*/
