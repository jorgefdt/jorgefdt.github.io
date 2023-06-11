function loadProjects() {
  projects.forEach((project, i) => createProject(i, project) );
}

loadProjects();


function createProject(id, projectData) {
  var project = cloneTemplate("project-template");
  
  // Configure project from project data.
  project.querySelectorAll(".j-project-title")[0].innerHTML = projectData.name;
  project.querySelectorAll(".j-project-desc")[0].innerHTML = projectData.description;
  projectData.media.forEach(mediaData => {
    var node = createMediaNode(mediaData);
    if (node) {
      var projMedia = project.querySelectorAll(".j-project-media")[0]; 
      projMedia.appendChild(node);
    } else {
      console.warn("Could not create node for mediaData: " + mediaData);
    }
  });
  
  // Add project to the container.
  document.getElementById("projects-container").appendChild(project);
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