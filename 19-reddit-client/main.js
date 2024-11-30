document.addEventListener("DOMContentLoaded", () => {
  const lanesContainer = document.getElementById("lanes")
  const addButton = document.getElementById("add-subreddit")
  const modal = document.getElementById("modal")
  const subredditInput = document.getElementById("subreddit-input")
  const confirmButton = document.getElementById("confirm-button")
  const cancelButton = document.getElementById("cancel-button")

  const savedLanes = JSON.parse(localStorage.getItem("lanes")) || []
  savedLanes.forEach((subreddit) => addLane(subreddit))

  addButton.addEventListener("click", () => {
    modal.classList.remove("hidden")
    subredditInput.value = ""
    subredditInput.focus()
  })

  cancelButton.addEventListener("click", () => {
    modal.classList.add("hidden")
  })

  confirmButton.addEventListener("click", () => {
    const subreddit = subredditInput.value.trim()
    if (subreddit) {
      addLane(subreddit)
      modal.classList.add("hidden")
    }
  })

  function addLane(subreddit) {
    const lane = document.createElement("div")
    lane.classList.add("lane")
    lane.innerHTML = `
      <h2>${subreddit}</h2>
      <button class="refresh-button">Refresh</button>
      <button class="delete-button">Delete</button>
      <div class="posts"></div>
    `

    lanesContainer.appendChild(lane)

    fetchPosts(subreddit, lane)
    saveLane(subreddit)

    lane.querySelector(".refresh-button").addEventListener("click", () => {
      fetchPosts(subreddit, lane)
    })

    lane.querySelector(".delete-button").addEventListener("click", () => {
      lane.remove()
      removeLane(subreddit)
    })
  }

  function fetchPosts(subreddit, lane) {
    const postsContainer = lane.querySelector(".posts")
    postsContainer.innerHTML = "<p>Loading...</p>"

    fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Subreddit not found")
        }
        return response.json()
      })
      .then((data) => {
        postsContainer.innerHTML = ""
        const posts = data.data.children
        if (posts.length === 0) {
          postsContainer.innerHTML = "<p>No posts found.</p>"
        } else {
          posts.forEach((post) => {
            const postElement = document.createElement("div")
            postElement.classList.add("post")
            postElement.innerHTML = `
              <h3>${post.data.title}</h3>
              <p>By: ${post.data.author}</p>
              <p>Votes: ${post.data.ups}</p>
            `
            postsContainer.appendChild(postElement)
          })
        }
      })
      .catch((error) => {
        postsContainer.innerHTML = `<p>Error: ${error.message}</p>`
      })
  }

  function saveLane(subreddit) {
    const lanes = JSON.parse(localStorage.getItem("lanes")) || []
    if (!lanes.includes(subreddit)) {
      lanes.push(subreddit)
      localStorage.setItem("lanes", JSON.stringify(lanes))
    }
  }

  function removeLane(subreddit) {
    let lanes = JSON.parse(localStorage.getItem("lanes")) || []
    lanes = lanes.filter((lane) => lane !== subreddit)
    localStorage.setItem("lanes", JSON.stringify(lanes))
  }
})
