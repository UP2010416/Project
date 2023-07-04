function pageLoaded(){
    getProductsTable();
}

window.addEventListener('load', pageLoaded);

async function getProductsTable(){
    const response = await fetch ('getProducts');
    const table = document.querySelector('.table');
    let obj;
    if (response.ok){
        obj = await response.json();
        const link1 = '<a href="update">Update</a>';
        const link2 = '<a href="delete">Delete</a>';
        for (i = 0; i < obj.length; i++){
            let record = Object.entries(obj[i]);
            let newRow = table.insertRow(-1);
            for (j = 0; j < record.length; j++){
                let newCell = newRow.insertCell(j);
                let newText = document.createTextNode(record[j][1]);
                newCell.appendChild(newText);
            }
            let actionCell = newRow.insertCell(-1);
            actionCell.innerHTML = link1 + ' ' + link2;
        }

        console.log(obj);
    } else {
        obj = [{msg : "failed to load table"}];
        console.log(obj);
    }

    console.log(Object.entries(obj[0]));
    console.log(obj[1]);
}

