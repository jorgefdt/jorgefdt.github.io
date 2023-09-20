function loadProjects() {
  projects.forEach((project, i) => createProject(i, project));
  // let i0 = 3;
  // for (let i = i0; i < i0 + 3; i++) {
  //   createProject(i, projects[i]);
  // }
}

loadProjects();


// Assume the template structure is valid.
function createProject(id, projectData) {
  var projectNode = cloneTemplate("project-template");

  // Inflate multiline strings to one string.
  if (Array.isArray(projectData.description)) {
    projectData.description = projectData.description.join('<br/>\n');
  }

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
      customizeNodeHeight(projMediaNode, mediaData);
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
      
  // Add carousel to media node.
  projMediaNode.appendChild(carouselNode);

  // Add each media node as a page (an <li>) in the carousel.
  mediaDatas.forEach(mediaData => {
    var node = createMediaNode(mediaData);
    if (node) {
      var liNode = document.createElement("li");
      ulNode.appendChild(liNode);
      liNode.appendChild(node);

      // Add overlay.
      addOverlay(liNode, mediaData);

      // Add custom media height for carrousel media.
      customizeNodeHeight(ulNode, mediaData);
    } else {
      console.warn("Could not create node for mediaData: " + mediaData);
    }
  });
}

// Creates DOM node to display mediaData. Returns null if error.
function createMediaNode(mediaData) {
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

  var mediaNode = null;
  if (mediaTemplate) {
    var n = cloneTemplate(mediaTemplate);
    
    // Identify individual media sources.
    var ns = n.querySelectorAll(".j-source")[0];
    if (ns) {
      ns.setAttribute("src", mediaData.url);
      mediaNode = n;

      // Add custom media height.
      customizeNodeHeight(ns, mediaData);      

      // Make media clicable.
      mediaNode = makeClicable(mediaNode, mediaData.url);
    }    
  }

  return mediaNode;
}


function makeClicable(node, url) {
  const linkNode = document.createElement("a");
  linkNode.setAttribute("href", url);
  linkNode.appendChild(node);
  
  // const formatNode = document.createElement("div");
  // formatNode.style = "background-color: #ffd700;";
  // formatNode.appendChild(node);  
  // linkNode.appendChild(formatNode);

  return linkNode;
}


// If possible, modifies node height dinamically as specified by mediaData.
function customizeNodeHeight(node, mediaData) {
  if (mediaData.whRatio) {
    // Compute height from the configured project width and the requested w/r ratio.
    node.style.height = (siteConfig.projectWidth / mediaData.whRatio).toFixed() + "px";;
  } else if (mediaData.height) {
    node.style.height = mediaData.height;
  }
}

// If possible, adds an overlay as specified by mediaData.
function addOverlay(node, mediaData) {
  if (mediaData.overlay) {
    var overlayNode = document.createElement("div");
    overlayNode.innerHTML = mediaData.overlay;
    overlayNode.classList.add("uk-position-center");
    overlayNode.classList.add("uk-overlay");
    overlayNode.classList.add("uk-light");
    overlayNode.style = "color: #ffd700; font-size: 20px; font-weight: 700;";
    node.appendChild(overlayNode);
  }
}

// Creates a clone of the template with the specified id and returns it.
function cloneTemplate(templateId) {
  // Get the template.
  var template = document.getElementById(templateId).content;

  // Clone the template.
  return template.cloneNode(true);
}
