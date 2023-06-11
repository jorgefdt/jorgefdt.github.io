function loadProjects() {
  projects.forEach((project, i) => createProject(i, project));
}

loadProjects();


// Assume the template structure is valid.
function createProject(id, projectData) {
  var projectNode = cloneTemplate("project-template");

  // Configure project from project data.
  projectNode.querySelectorAll(".j-project-title")[0].innerHTML = projectData.name;
  projectNode.querySelectorAll(".j-project-desc")[0].innerHTML = projectData.description;
  const projMediaNode = projectNode.querySelectorAll(".j-project-media")[0];

  // Pick one of the following two options and comment the other out.
  addFirstMediaNode(projectData.media, projMediaNode);
  // addMediaNodesAsCarousel(projectData.media, projMediaNode);

  // Add project to the container.
  document.getElementById("projects-container").appendChild(projectNode);
}


// Creates DOM node for only the first media data and adds it to projectNode.
function addFirstMediaNode(mediaDatas, projMediaNode) {
  if (mediaDatas.length > 0) {
    const mediaData = mediaDatas[0];
    const node = createMediaNode(mediaData);
    if (node) {
      projMediaNode.appendChild(node);
    } else {
      console.warn("Could not create node for mediaData: " + mediaData);
    }
  }
}

// Creates DOM node for each media data and add them to a carousel in projectNode.
function addMediaNodesAsCarousel(mediaDatas, projMediaNode) {
  const carouselNode = cloneTemplate("carusel-media-template");
  if (!carouselNode) {
    console.warn("Could not find carousel at '#carusel-media-template'");
    return;
  }
  var ulNode = carouselNode.querySelectorAll(".uk-slideshow-items")[0];
  if (!ulNode) {
    console.warn("Could not find ulNode at '.uk-slideshow-items'");
    return;
  }

  // Add each media node as a page (an <li>) in the carousel.
  mediaDatas.forEach(mediaData => {
    var node = createMediaNode(mediaData);
    if (node) {
      var liNode = document.createElement("li");
      ulNode.appendChild(liNode);
      liNode.appendChild(node);
    } else {
      console.warn("Could not create node for mediaData: " + mediaData);
    }
  });

  // Add carousel to media node.
  projMediaNode.appendChild(carouselNode);

  /*
      <ul class="uk-slideshow-items">

        <li>
          <img src="projects/tooling.png" alt="" uk-cover>
          <div class="uk-position-bottom uk-text-center">
            <h3 class="uk-margin-remove">Overlay Bottom</h3>
            <p class="uk-margin-remove">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </li>
        <li>
          <img src="projects/sensor-devices-screen.png" alt="" uk-cover>
        </li>
        <li>
          <iframe src="https://www.youtube.com/embed/mde0Y6brTmM" allow="fullscreen" uk-cover></iframe>
        </li>
        <li>
          <video autoplay loop muted playsinline uk-cover
            src="./projects/pentagon-double-scara-robot/2scara-random.MOV">
          </video>
        </li>

  */
}

// Creates DOM node to display mediaData. Returns null if error.
function createMediaNode(mediaData) {
  var mediaNode = null;
  var mediaTemplate;
  if (mediaData.type == "videoIframe") {
    mediaTemplate = "videoIframeWrapper-media-template";
  } else if (mediaData.type == "video") {
    mediaTemplate = "video-media-template";
  } else if (mediaData.type == "image") {
    mediaTemplate = "img-media-template";
  }

  if (mediaTemplate) {
    var n = cloneTemplate(mediaTemplate);
    var ns = n.querySelectorAll(".j-source")[0];
    if (ns) {
      ns.setAttribute("src", mediaData.url);
      mediaNode = n;
    }
  }

  return mediaNode;
}

// Creates a clone of the template with the specified id and returns it.
function cloneTemplate(templateId) {
  // Get the template.
  var template = document.getElementById(templateId).content;

  // Clone the template.
  return template.cloneNode(true);
}