document.addEventListener("DOMContentLoaded", () => {
  const lanesContainer = document.getElementById("lanes")
  const addButton = document.getElementById("add-subreddit")
  const modal = document.getElementById("modal")
  const subredditInput = document.getElementById("subreddit-input")
  const confirmButton = document.getElementById("confirm-button")
  const cancelButton = document.getElementById("cancel-button")

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
      <h2>
        r/${subreddit}
        <span class="menu-icon">⋮</span>
      </h2>
      <div class="menu">
        <button class="refresh-button">Refresh</button>
        <button class="delete-button">Delete</button>
      </div>
      <div class="posts"></div>
    `

    lanesContainer.appendChild(lane)

    const menuIcon = lane.querySelector(".menu-icon")
    const menu = lane.querySelector(".menu")
    menuIcon.addEventListener("click", () => {
      menu.classList.toggle("open")
    })

    const refreshButton = lane.querySelector(".refresh-button")
    refreshButton.addEventListener("click", () => {
      fetchPosts(subreddit, lane)
    })

    const deleteButton = lane.querySelector(".delete-button")
    deleteButton.addEventListener("click", () => {
      lane.remove()
    })

    fetchPosts(subreddit, lane)
  }

  function fetchPosts(subreddit, lane) {
    const postsContainer = lane.querySelector(".posts")
    postsContainer.innerHTML = "<p>Loading...</p>"

    fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then((response) => {
        if (!response.ok) throw new Error("Subreddit not found")
        return response.json()
      })
      .then((data) => {
        postsContainer.innerHTML = ""
        const posts = data.data.children
        posts.forEach((post) => {
          const postElement = document.createElement("div")
          postElement.classList.add("post")

          postElement.innerHTML = `
            <div class="post-header">
              <div class="vote-icon">
                <p>⬆</p>
                <p>${post.data.ups}</p>
              </div>
              <div>
                <h3>${post.data.title}</h3>
                <p>By: ${post.data.author}</p>
              </div>
            </div>
          `
          postsContainer.appendChild(postElement)
        })
      })
      .catch((error) => {
        postsContainer.innerHTML = `<p>Error: ${error.message}</p>`
      })
  }
})
