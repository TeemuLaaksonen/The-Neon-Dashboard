function init() {
  let contentText = document.getElementById("contentText");
  contentText.innerHTML = "Loading content from database...";
  loadContent();
}


async function loadContent() {
  let response = await fetch("http://localhost:3000/test");
  let data = await response.json();
  console.log(data);
  showContent(data);
}

function submit() {
  let link = document.getElementById("input1");
  let content = document.getElementById("input3");
  let user = document.getElementById("input2");
  let data = {
      link: link.value,
      content: content.value,
      user: user.value
  };
  console.log(data);
  saveContent(data);
}

async function saveContent(data) {
  let response = await fetch("http://localhost:3000/test", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  });
  let result = await response.json();
  console.log(result);
}


// WORK IN PROGRESS - DOES NOT COMPLETELY WORK YET
function createContentItem(data) {
  let linebreak = document.createElement("br");
  let li = document.createElement("li");
  let a = document.createElement("a");
  let p = document.createElement("p");
  let linkText = document.createTextNode("Link to content");
  let submitter = document.createTextNode("Submitted by: ");
  let li_attr = document.createAttribute("id");
  li_attr.value = data._id;
  li.setAttributeNode(li_attr);
  let content = document.createTextNode(data.content);
  let user = document.createTextNode(data.user);
  p.appendChild(a)
  a.appendChild(linkText);
  a.title = data.content;
  a.href = data.link;
  li.appendChild(content);
  li.appendChild(linebreak);
  li.appendChild(linebreak);
  li.appendChild(a);
  li.appendChild(linebreak);
  li.appendChild(submitter);
  li.appendChild(user);
  return li;
}

function showContent(data) {
  let contentList = document.getElementById("contentList");
  let contentText = document.getElementById("contentText");

  if (data.length == 0) {
      contentText.innerHTML = "The content list is empty";
      }
  else {
      data.forEach(data => {
          let li = createContentItem(data);
          contentList.appendChild(li);
      });
      contentText.innerHTML = "";
  }
}