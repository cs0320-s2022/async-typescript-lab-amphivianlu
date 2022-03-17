// TODO: select the list element where the suggestions should go, and all three dropdown elements
//  HINT: look at the HTML

// const suggestions: HTMLUListElement = document.getElementById('suggestions') as HTMLUListElement
// let sunElem: HTMLSelectElement = document.getElementById('sun') as HTMLSelectElement
// let moonElem: HTMLSelectElement = document.getElementById('moon') as HTMLSelectElement
// let risingElem: HTMLSelectElement = document.getElementById('rising') as HTMLSelectElement

const suggestions = document.getElementById("suggestions") as HTMLUListElement
const sunElem = document.getElementById("sun") as HTMLInputElement
const moonElem = document.getElementById("moon") as HTMLInputElement
const risingElem = document.getElementById("rising") as HTMLInputElement

// Here, when the value of sun is changed, we will call the method postAndUpdate.
// TODO: Do the same for moon and rising
sunElem.addEventListener("change", postAndUpdate)
moonElem.addEventListener("change", postAndUpdate)
risingElem.addEventListener("change", postAndUpdate)

// TODO: Define a type for the request data object here.
type MatchesRequestData = {sun: string, moon: string, rising: string}


// TODO: Define a type for the response data object here.
type Matches = {matches : string[]}


function postAndUpdate(): void {
  // TODO: empty the suggestionList (you want new suggestions each time someone types something new)
  //  HINT: use .innerHTML
  suggestions.innerHTML= ''

  // TODO: add a type annotation to make this of type MatchesRequestData
  const postParameters: MatchesRequestData = {
    sun : sunElem.value,
    moon : moonElem.value,
    rising : risingElem.value
    // TODO: get the text inside the input box
    //  HINT: use sun.value to get the value of the sun field, for example
  };

  console.log(postParameters)


  // TODO: make a POST request using fetch to the URL to handle this request you set in your Main.java
  //  HINT: check out the POST REQUESTS section of the lab and of the front-end guide.
  //  Make sure you add "Access-Control-Allow-Origin":"*" to your headers.
  //  Remember to add a type annotation for the response data using the Matches type you defined above!
  fetch ("http://localhost:4567/route", {
    method: 'post',
    body: JSON.stringify(postParameters),
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
      // TODO: Call and fill in the updateSuggestions method in one of the .then statements in the Promise
      //  Parse the JSON in the response object
      //  HINT: remember to get the specific field in the JSON you want to use
      .then((response : Response) => response.json())
      .then((data : Matches) => { console.log(data.matches)
        updateSuggestions(data.matches)
      })
      .catch((error: any) => console.error("ERROR: ", error));
}

// TODO: make a POST request using fetch to the URL to handle this request you set in your Main.java
//  HINT: check out the POST REQUESTS section of the lab and of the front-end guide.
//  Make sure you add "Access-Control-Allow-Origin":"*" to your headers.
//  Remember to add a type annotation for the response data using the Matches type you defined above!

// TODO: Call and fill in the updateSuggestions method in one of the .then statements in the Promise
//  Parse the JSON in the response object
//  HINT: remember to get the specific field in the JSON you want to use
function updateSuggestions(matches: string[]): void {
  for (let i = 0; i < 5; i++) {
    suggestions.innerHTML += `<li tabindex="0">${matches[i]}</li>`;
  }
  // TODO: for each element in the set of matches, append it to the suggestionList
  //  HINT: use innerHTML += to append to the suggestions list
  //  NOTE: you should use <li> (list item) tags to wrap each element. When you do so,
  //  make sure to add the attribute 'tabindex="0"' (for example: <li tabindex="0">{your element}</li>).
  //  This makes each element selectable via screen reader.
}

// TODO: create an event listener to the document (document.addEventListener) that detects "keyup".
//  When a certain key of your choice is clicked, reset the values of sun, moon, and rising to your own
//  values for the sun, moon, and rising using updateValues. Then call postAndUpdate().
//  HINT: the listener callback function should be asynchronous and wait until the values are
//  updated before calling postAndUpdate().

document.addEventListener("keyup", () =>
    updateValues("Leo", "Aquarius",
        "Gemini").then(postAndUpdate)
)

async function updateValues(sunval: string, moonval: string, risingval: string): Promise<void> {
  // This line asynchronously waits 1 second before updating the values.
  // It's unnecessary here, but it simulates asynchronous behavior you often have to account for.
  await new Promise(resolve => setTimeout(resolve, 1000));

  sunElem.value = sunval;
  moonElem.value = moonval;
  risingElem.value = risingval;
}
