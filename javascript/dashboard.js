function init() {
    let dataText = document.getElementById("dataText");
    dataText.innerHTML = "Loading data...";
    loadData();
}

async function loadData() {
    let response = await fetch("http://localhost:3000/data");
    let data = await response.json();
    console.log(data);
    showData(data);
}

function createDataListItem(data) {
    // luodaan uusi LI-elementti
    let li = document.createElement('li')

      // luodaan uusi id-attribuutti
    let li_attr = document.createAttribute('id')

      // kiinnitetään tehtävän/todon id:n arvo luotuun attribuuttiin 
    li_attr.value= data._id

      // kiinnitetään attribuutti LI-elementtiin
    li.setAttributeNode(li_attr)

      // luodaan uusi tekstisolmu, joka sisältää tehtävän/todon tekstin
    let text = document.createTextNode(data.text)

      // lisätään teksti LI-elementtiin
    li.appendChild(text)

      // luodaan uusi SPAN-elementti, käytännössä x-kirjan, jotta tehtävä saadaan poistettua
    let span = document.createElement('span')

      // luodaan uusi class-attribuutti
    let span_attr = document.createAttribute('class')

      // kiinnitetään attribuuttiin delete-arvo, ts. class="delete", jotta saadaan tyylit tähän kiinni
    span_attr.value = 'delete'

      // kiinnitetään SPAN-elementtiin yo. attribuutti
    span.setAttributeNode(span_attr)

      // luodaan tekstisolmu arvolla x
    let x = document.createTextNode(' x ')

      // kiinnitetään x-tekstisolmu SPAN-elementtiin (näkyville)
    span.appendChild(x)

      // määritetään SPAN-elementin onclick-tapahtuma kutsumaan removeTodo-funkiota
    span.onclick = function() { removeData(data._id) }

      // lisätään SPAN-elementti LI-elementtin
    li.appendChild(span)

      // palautetaan luotu LI-elementti
      // on siis muotoa: <li id="mongoIDXXXXX">Muista soittaa...<span class="remove">x</span></li>
    return li
}

function showData(data) {
    let todosList = document.getElementById("dataList");
    let infoText = document.getElementById("dataText");

    // In case empty
    if (data.length === 0) {
        infoText.innerHTML = "No data to show...";
    }
    else {
        data.forEach(data => {
            let li = createDataListItem(data);
            dataList.appendChild(li)
        });
        infoText.innerHTML = "";
    }
}

async function addData() {
    let newData1 = document.getElementById("newData").elements[0].value;
    let newData2 = document.getElementById("newData").elements[1].value;
    let newData3 = document.getElementById("newData").elements[2].value;
    const data = { "user": newData1, "url": newData2, "content": newData3};
    const response = await fetch("http://localhost:3000/data", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    let storedData = await response.json();
    let dataList = document.getElementById("dataList");
    let li = createDataListItem(storedData);
    dataList.appendChild(li);

    let infoText = document.getElementById("dataText");
    infoText.innerHTML = "";
    newData.value = "";
}

async function removeData(id) {
    const response = await fetch('http://localhost:3000/data/'+id, {
        method: 'DELETE'
    })
    let responseJson = await response.json()
    let li = document.getElementById(id)
    li.parentNode.removeChild(li)

    let dataList = document.getElementById('dataList')
    if (!dataList.hasChildNodes()) {
        let infoText = document.getElementById('dataText')
        infoText.innerHTML = 'No data to show'
    }
}