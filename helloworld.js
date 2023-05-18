/*
    * This is a sample content script that will run on the pages specified in the manifest.
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

var loadfunction = window.onload;
window.onload = function(event){
    //enter here the action you want to do once loaded

    var delayInMilliseconds = 5000; //1 second

    setTimeout(function() {
    
    function getElementByXpath(path) {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    //your code to be executed after 1 second
    var element = getElementByXpath("/html/body/ytd-app/div[1]/ytd-page-manager/ytd-watch-flexy/div[5]/div[2]/div/div[3]/ytd-watch-next-secondary-results-renderer/div[2]/ytd-item-section-renderer/div[3]")//document.getElementById("secondary-inner");//.getElementById("contents"); //document.getElementById("contents").getElementsByClassName("style-scope ytd-item-section-renderer");//.getElementsByClassName("ytd-item-section-renderer")[0];//document.querySelectorAll('.style-scope .ytd-item-section-renderer #contents')[0];
    if (!element) {
        element = getElementByXpath("/html/body/ytd-app/div[1]/ytd-page-manager/ytd-watch-flexy/div[5]/div[1]/div/div[2]/div[9]/ytd-watch-next-secondary-results-renderer/div[2]/ytd-item-section-renderer/div[3]")
    }
    console.log(element);
    var parent = element.parentElement; //document.getElementById("secondary-inner").parentElement
    //document.getElementById("secondary-inner").remove();
    element.remove();

    // Create a new <p> element
    var message = document.createElement("p");
    message.textContent = "Feed Hidden";
    message.style = "font-size: 50px; color: red; text-align: center;";

    // Get the element with id "primary" from the youtube home page.
    //var primaryElement = document.getElementById("secondary");

    // Append the <p> element to the "primary" element
    parent.appendChild(message);

    console.log(element)

    }, delayInMilliseconds);

   
    if(loadfunction) loadfunction(event);
}


// Remove the youtube home feed
//document.querySelector('ytd-browse[role="main"][page-subtype="home"] #contents').remove();
//document.getElementById("secondary").remove();


