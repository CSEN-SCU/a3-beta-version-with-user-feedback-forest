document.getElementById("myForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var numVideos = document.getElementById("numVideos").value;
  localStorage.setItem("numVideos", numVideos);
  console.log("Number of videos stored in local storage: " + numVideos);
  window.close();
});