function loadProjects() {
  //0alert("loading");
  projects.forEach((project, i) => {
    createProject(i, card["button"], card["body"]);
  });
}

loadProjects();


function createProject(id, buttonText, cardBody) {
  var card = document.getElementById("cardTemplate").content;

  //clone the card template
  var cln = card.cloneNode(true);

  //create the custom heading and collapse id
  let headingId = "heading-" + id;
  let collapseId = "collapse-" + id;

  //set all the attributes
  cln.querySelectorAll(".card-header")[0].id = headingId;
  cln.querySelectorAll(".card-header button")[0].setAttribute("data-target", "#" + collapseId);
  cln.querySelectorAll(".card-header button")[0].setAttribute("aria-controls", collapseId);
  cln.querySelectorAll(".card-body")[0].parentElement.id = collapseId;
  cln.querySelectorAll(".card-body")[0].parentElement.setAttribute("aria-labelledby", headingId);

  //set the content
  cln.querySelectorAll(".card-header button")[0].innerHTML = buttonText;
  cln.querySelectorAll(".card-body")[0].innerHTML = cardBody;

  //add the card to the accordion
  document.getElementById("accordion").appendChild(cln);
}

function createProject0(id, content) {
  return `<div class="card">
              <div class="card-header" id="heading-${id}">
                  <h5 class="mb-0">
                      <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse-${id}" aria-expanded="false" aria-controls="collapse-${id}">Collapsible Group Item #${id}</button>
                  </h5>
              </div>
              <div id="collapse-${id}" class="collapse" aria-labelledby="heading-${id}">
                  <div class="card-body">
                      ${content}
                  </div>
              </div>
          </div>`;
}
        
// $(function(){
//     $('#projects').append($(createProject('1', "Lorem ipsum")));
//     $('#projects').append($(createProject('2', createProject(3, "Dolor sit amnet"))));
//   });