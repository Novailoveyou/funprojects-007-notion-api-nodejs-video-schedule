const videosEl = document.getElementById('videos')
const loaderEl = document.getElementById('loading')
let loading = false

const getVideosFromBackend = async () => {
  loading = true
  const res = await fetch('http://localhost:5000/videos')
  const data = await res.json()
  loading = false
  return data
}

const addVideosToDom = async () => {
  const videos = await getVideosFromBackend()
  if (!loading) {
    loaderEl.style.display = 'none'
  }

  videos.forEach(video => {
    const div = document.createElement('div')
    div.className = 'video'
    div.innerHTML = /* html */ `
      <h3>${video.title}</h3>
      <ul>
        <li>
          <strong>Release Date:</strong> ${video.date}
          <strong>Description:</strong> ${video.description}
        </li>
      </ul>
      <div className="tags">${video.tags}</div>
    `
    videosEl.appendChild(div)
  })
}

addVideosToDom()
