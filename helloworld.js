/*
    
*/

/*
References:
Wait for page to load (probably dont need because of the delay below)
https://stackoverflow.com/questions/28202736/how-to-execute-content-script-after-the-page-is-loaded-completely/28203168

Delay
https://stackoverflow.com/questions/17883692/how-to-set-time-delay-in-javascript

XPath
https://stackoverflow.com/questions/10596417/is-there-a-way-to-get-element-by-xpath-using-javascript-in-selenium-webdriver

*/
// chrome.storage.local.set({"local_suggestions": 5 }).then(() => {
//     console.log("Value is set to " + value);
// });
chrome.storage.local.set({'local_suggestions':'5'});

// Hide the main suggestions elelemts container for 3 seconds, then run main
var delayInMilliseconds = 100;
var runsLeft = 25;
const startInterval = setInterval(function() {
    // Temporarily hide entire suggestions element container until fully loaded
    var recommendationsContainer = document.querySelectorAll("#related ytd-watch-next-secondary-results-renderer")[0];
    if (recommendationsContainer)
        recommendationsContainer.style.display = "none";


    // Hide the suggestions filtering
    if (document.getElementsByTagName("yt-related-chip-cloud-renderer")[0])
        document.getElementsByTagName("yt-related-chip-cloud-renderer")[0].remove();

    runsLeft--; // decrement remaining runs before main runs

    // Unhide the suggestions container, and run the main function
    if (runsLeft == 0) {
        if (recommendationsContainer)
            recommendationsContainer.style.display = "block";

        main();
        clearInterval(startInterval)
    }

}, delayInMilliseconds);

// Hides all the suggestions, then unhides a specified amount after 5 seconds
function main() {
    // Access an element from a full xpath
  
    // Get the container that holds the recommendations
    var element = document.querySelectorAll(".ytd-watch-next-secondary-results-renderer #contents")[0];
    console.log(element)

    if (!element) {
        console.log("Failed to find sidebar element")
        return
    }

    chrome.storage.local.get("local_suggestions").then((result) => {
        console.log("Value currently is " + result.key);
    });

    // Get the parent of the recommendations box in order to add our custom form on top
    
    var parent = element.parentElement;

    // Hides all suggestion thumbnails
    hideSuggestions(element);


    // Wait 5 seconds, and then unhide them
    var delayInMilliseconds2 = 5000;
    setTimeout(function() {
        unhideSuggestions(element, 3);
    }, delayInMilliseconds2);
}

// Hides all the thumbnails of suggestions
function hideSuggestions(element) {
    for (child of element.children) {
        child.style.display = "none";
    }
    
    // Adds the text saying feed hidden
    var message = document.createElement("p");
    message.id = "custom-extension";
    message.textContent = "Feed Hidden";
    message.style = "font-size: 50px; color: red; text-align: center;";

    element.parentElement.appendChild(message);
}

// Unhide n suggestion thumbnails
function unhideSuggestions(element, n) {
    // remove the feed hidden text
    element.parentElement.querySelector("#custom-extension").remove();

    // Unhide n thumbnails
    var count = 0;
    for (child of element.children) {
        if (count <= n) {
            child.style.display = "block";
            count++;
        }
    }
}

// Supporting Function to get elements from their full xpath (https://stackoverflow.com/questions/10596417/is-there-a-way-to-get-element-by-xpath-using-javascript-in-selenium-webdriver)
function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function once_available(querySelector, callback) {
    var interval = setInterval(function () {
        if (document.querySelector(querySelector)) {
            clearInterval(interval);
            callback();
        }
    }, 100);
}