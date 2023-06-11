function loadProjects() {
  projects.forEach((project, i) => createProject(i, project) );
}

loadProjects();

/*
<div class="j-project">
  <div class="j-project-title">Perlin Noise Fields</div>
  <div class="j-project-desc">
    Random fields simulations based on Perlin noise. 3D graphics on <span class="name">p5.js</span> on <span
      class="name">iOS</span>.
  </div>
  <div class="j-project-media">
    <div class="videoIframeWrapper">
      <iframe src="https://www.youtube.com/embed/5hC8sITqggg?autoplay=1&loop=1"
        allow="fullscreen; autoplay"></iframe>
    </div>
  </div>
</div>
*/
function createProject(id, projectData) {
  // Get the template.
  var template = document.getElementById("project-template").content;

  // Clone the template.
  var project = template.cloneNode(true);
  
  // Configure project from project data.
  project.querySelectorAll(".j-project-title")[0].innerHTML = projectData.name;
  project.querySelectorAll(".j-project-desc")[0].innerHTML = projectData.description;

  var mediaData = projectData.media[0];
  var projMedia = project.querySelectorAll(".j-project-media")[0]; 
  projMedia.innerHTML = mediaData.type;
  var mediaTemplate;
  if (mediaData.type == "videoIframe") {
    mediaTemplate = "videoIframeWrapper-media-template";    
    // config
  } else if (mediaData.type == "video") {
    mediaTemplate = "video-media-template";
  } else if (mediaData.type == "image") {
    mediaTemplate = "img-media-template";
  }
   
  if (projMedia) {
    var t = document.getElementById(mediaTemplate).content;
    var n = t.cloneNode(true);
    
    var ns = n.querySelectorAll(".j-source")[0];
    if (ns) {
      ns.setAttribute("src", mediaData.url);
    }
  
    projMedia.appendChild(n);    
  }

  // Add project to the container.
  document.getElementById("projects").appendChild(project);
}

function addMedia() {
  
}