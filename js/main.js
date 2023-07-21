const cats = [
  {
    name: "Cat",
    bio: "Cat is an English word.",
    thumb: "images/kitten1-thumb.jpeg",
    img: "images/kitten1.jpeg"
  },
  {
    name: "Mao",
    bio: "Mao is is a Cantonese word.",
    thumb: "images/kitten2-thumb.jpeg",
    img: "images/kitten2.jpeg"
  },
  {
    name: "Gato",
    bio: "Gato is a Spanish word",
    thumb: "images/kitten3-thumb.jpeg",
    img: "images/kitten3.jpeg"
  },
  {
    name: "Billi",
    bio: "Billi is a Hindi word.",
    thumb: "images/kitten4-thumb.jpeg",
    img: "images/kitten4.jpeg"
  },
  {
    name: "Chat",
    bio: "Chat is a French word.",
    thumb: "images/kitten5-thumb.jpeg",
    img: "images/kitten5.jpeg"
  },
  {
    name: "Gatto",
    bio: "Gatto is an italian word.",
    thumb: "images/kitten6-thumb.jpeg",
    img: "images/kitten6.jpeg"
  },
  {
    name: "Kit",
    bio: "Kit is a Ukrainian word.",
    thumb: "images/kitten7-thumb.jpeg",
    img: "images/kitten7.jpeg"
  },
  {
    name: "Kot",
    bio: "Kot is a Russian word.",
    thumb: "images/kitten8-thumb.jpeg",
    img: "images/kitten8.jpeg"
  }
]

const catsRow = document.getElementById("catsRow")
const cards = []

for (const cat of cats) {
  console.log(cat.name)
  // create card HTML template copying from HTML page and replacing content with values from the object
  const card = `
    <div class="col">
      <div class="card">
        <img data-bs-toggle="modal" data-bs-target="#exampleModal" src="${cat.thumb}" class="card-img-top" alt="placeholder kitten" data-fullimg="${cat.img}">
        <div class="card-body">
          <h5 class="card-title">${cat.name}</h5>
          <p class="card-text">${cat.bio}</p>
          <!--Data must be written in lowercase -->
          <a href="#" class="btn btn-light like" data-catname="${cat.name}" data-catbio="${cat.bio}" data-catthumb="${cat.thumb}" data-catfullimg="${cat.img}"> Like </a>
        </div>
      </div>
    </div><!-- col ends -->`

  // push each card template to the cards array
  cards.push(card)
}
catsRow.insertAdjacentHTML("afterbegin", cards.join(""))

// selecting all the images
const cardImages = document.querySelectorAll(".card-img-top")

// adding event listeners multiple elements
for (const cardImage of cardImages) {
  cardImage.addEventListener("click", openModal)
}

// If using event delegation 
// cardImageParent.addEventListener("click", openModal)

// function openModal (e) {
//   if(e.target.classList.contains("image")){

//   }

function openModal () {
  console.log(this.getAttribute("src"))
  const fullImage = this.dataset.fullimg
  const modalBody = document.querySelector(".modal-body")

  modalBody.innerHTML = `<img src="${fullImage}" alt="placeholder">`
}


// ********************************Week 11
//To make the buttons funcitonal and use localStorage
// 1. Add event listener to the button "like"
//The gfunciton attached to the event listener allows to:
  //1.1 Update the button style so it turns red
  //1.2 Find the cat info
  //1.3 Save that cat to fav

  //savedCats is defined from now, to be able to use it many times
  let savedCats = localStorage.getItem("mycats") //what's inside the parenthesis assigns the name to it 
  console.log(savedCats)

  //If the saved cats are null then !savedCats will be true
  if (!savedCats){
    savedCats = []
  } else {
    savedCats = JSON.parse(savedCats)
  }


//Gets all buttons
const likeButtons = document.querySelectorAll(".like")
//First make sure there are buttons.
if(likeButtons.length > 0) {
  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", likedCat)
    //We're gonna loop over the savedCats array and chekc if any catName matches with this button catName
    for (savedCat of savedCats) {
      if(savedCat.name == likeButton.dataset.catname) {
        //Update button style
        likeButton.this.classList.add("btn-danger")
        likeButton.this.classList.remove("btn-light")
        likeButton.textContent = "Liked"
      }
    }
  }
}

//defining the function likedCat
function likedCat(e) {
  //Preventing the page to scroll up looking for href #, when clicking the button
  e.preventDefault()
  //get all info from the card. "This" refers to the element that's calling the function
  const catName = this.dataset.catname
  const catBio = this.dataset.catbio
  const catThumb = this.dataset.catthumb
  const catImg = this.dataset.catfullimg
  //Now create an object with all that info
  const catInfo = {name: catName, bio: catBio, thumb: catThumb, img: catImg}
  //save the cat info 
  console.log(catInfo)

//Before adding the cat to local storage is important to check the cat is not already in local Storage
//1. Get cats from local storage
//2. if (it's not already there) add it to the localStorage
//3. if (is there already) do nothing 
 
  const catExists = findCat(catName)
  console.log(catExists)

  //if the cat name exists, it is not equal to null
  if (catExists !== null) {
    alert("This cat is already liked")
  }  else {
    //push the cat object to savedCats array
    savedCats.push(catInfo)
    //Stringify the savedCats array and add it to localStorage mycats
    localStorage.setItem("mycats", JSON.stringify(savedCats))

    //update Button style
    this.classList.remove("btn-light")
    this.classList.add("btn-danger")
    this.textContent = "Liked"
  }

}
  function findCat(catName) {
    for (const savedCat of savedCats) {
      if(savedCat.name == catName){
        return savedCats.indexOf(savedCat) //Look for indexOf function
      }
    }
    return null
  }




