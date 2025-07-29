export default function announceLiveRegion(message) {
  const liveRegion = document.getElementById("live-region")
  if (liveRegion) {
    liveRegion.textContent = "" // Clear first

    setTimeout(() => {
      liveRegion.textContent = message
    }, 50)
  }
}
