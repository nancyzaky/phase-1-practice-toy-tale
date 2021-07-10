let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  document.addEventListener("submit", (event) => {
    event.preventDefault();
    const toysForm = document.querySelector(".add-toy-form");
    const toyName = toysForm.name.value;
    const newToyUrl = toysForm.image.value;
    const newToyObj = {
      name: toyName,
      image: newToyUrl,
      likes: 0,
    };
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newToyObj),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        return error.value;
      });
  });
  fetch("http://localhost:3000/toys")
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      let divContainer = document.getElementById("toy-collection");

      data.forEach((item) => {
        console.log(item);
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card");

        let header = document.createElement("h2");
        header.innerText = item.name;
        let imageUrl = document.createElement("img");
        imageUrl.classList.add("toy-avatar");
        imageUrl.src = item.image;

        let paragraph = document.createElement("p");
        let likesCount = item.likes;

        paragraph.innerText = `${likesCount} likes`;
        let likeButton = document.createElement("button");
        likeButton.classList.add("like-btn");
        likeButton.id = item.id;
        likeButton.innerText = "Like";
        likeButton.addEventListener("click", (e) => {
          item.likes++;
          e.preventDefault();
          console.log(e.target);
          fetchUrl = `http://localhost:3000/toys/${item.id}`;

          fetch(fetchUrl, {
            method: "PATCH",
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ likes: item.likes + 1 }),
          })
            .then((resp) => resp.json())
            .then((data) => {
              console.log(data);
              paragraph.innerText = `${data.likes} likes`;
            });
        });

        cardDiv.appendChild(header);
        cardDiv.appendChild(imageUrl);
        cardDiv.appendChild(paragraph);
        cardDiv.appendChild(likeButton);
        divContainer.appendChild(cardDiv);
      });
    });
});

//

//   let fetchUrl = `http://localhost:3000/toys/${likeButton.id}`;
//   console.log(fetchUrl);
//
// ;
