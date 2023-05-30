// document.getElementById("myForm").addEventListener("submit", function(event) {
//   event.preventDefault();

//   var numVideos = document.getElementById("numVideos").value;
//   localStorage.setItem("numVideos", numVideos);
//   console.log("Number of videos stored in local storage: " + numVideos);
//   window.close();
// });
document.getElementById("myForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var numVideos = document.getElementById("numVideos").value;
  chrome.storage.local.set({"numVideos": numVideos}, function() {
    console.log("Number of videos stored in local storage: " + numVideos);
    window.close();
  });
});

window.addEventListener('DOMContentLoaded', (event) => {
    chrome.storage.local.get(["numVideos"], function(result) {
      console.log('Value currently is ' + result.numVideos);
      if(result.numVideos) {
        document.getElementById("displayNumVideos").textContent = "The count set: " + result.numVideos;
      }
    });
});

