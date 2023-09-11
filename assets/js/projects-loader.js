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

  // Add media nodes as single node or carousel.
  const mediaDatas = projectData.media;
  if (mediaDatas.length == 0) {
    console.warn("Found no media data for project: " + projectData.name);
  } else if (mediaDatas.length == 1) {
    addFirstMediaNode(projectData.media, projMediaNode);
  } else { // mediaDatas.length > 1
    addMediaNodesAsCarousel(projectData.media, projMediaNode);
  }

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
      
      // Add custom media height for individual media (not carrousel).
      if (mediaData.height) {
        projMediaNode.style.height = mediaData.height;
      }
    } else {
      console.warn("Could not create node for mediaData: " + mediaData);
    }
  }
}

// Creates DOM node for each media data and add them to a carousel in projectNode.
function addMediaNodesAsCarousel(mediaDatas, projMediaNode) {
  //const carouselItemsClassname = ".uk-slider-items";
  const carouselItemsClassname = ".uk-slideshow-items";
  
  const carouselNode = cloneTemplate("carusel-media-template");
  if (!carouselNode) {
    console.warn("Could not find carousel at '#carusel-media-template'");
    return;
  }
  var ulNode = carouselNode.querySelectorAll(carouselItemsClassname)[0];
  if (!ulNode) {
    console.warn("Could not find ulNode at " + carouselItemsClassname);
    return;
  }

  // Add each media node as a page (an <li>) in the carousel.
  mediaDatas.forEach(mediaData => {
    var node = createMediaNode(mediaData);
    if (node) {
      var liNode = document.createElement("li");
      ulNode.appendChild(liNode);
      liNode.appendChild(node);

      // Add custom media height for individual media (not carrousel).
      if (mediaData.height) {
        ulNode.style.height = mediaData.height;
      }      
    } else {
      console.warn("Could not create node for mediaData: " + mediaData);
    }
  });

  // Add carousel to media node.
  projMediaNode.appendChild(carouselNode);
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
  } else if (mediaData.type == "image-tall") {
    mediaTemplate = "img-tall-media-template";
  }

  if (mediaTemplate) {
    var n = cloneTemplate(mediaTemplate);
    var ns = n.querySelectorAll(".j-source")[0];
    if (ns) {
      ns.setAttribute("src", mediaData.url);
      mediaNode = n;

      // Add custom media height.
      if (mediaData.height){
        ns.style.height = mediaData.height ;
      }
    }
    
    // // Setup link
    // var nsl = n.querySelectorAll(".j-source-link")[0];
    // if (nsl) {
    //   nsl.setAttribute("href", mediaData.url);
    // }
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