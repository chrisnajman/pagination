// Show the loader by removing the hidden class
export function showLoader() {
  const loader = document.getElementById("loader")
  const pageLoaded = document.getElementById("page-loaded")

  if (loader) {
    loader.classList.remove("loader-hidden")

    // Reset live region for screen readers
    pageLoaded.textContent = ""
    pageLoaded.setAttribute("aria-hidden", "true")
  }
}

// Hide the loader with a fade transition
export function hideLoader() {
  const loader = document.getElementById("loader")
  const pageLoaded = document.getElementById("page-loaded")

  if (loader) {
    loader.classList.add("loader-hidden")

    // Wait for the transition to finish before announcing
    loader.addEventListener(
      "transitionend",
      () => {
        // Do NOT remove the loader; keep it for future use
        pageLoaded.textContent = "Page has loaded."
        pageLoaded.setAttribute("aria-hidden", "false")
      },
      { once: true } // Run this only once per transition
    )
  }
}

// Setup: hide loader after initial page load
export function setupInitialLoader() {
  window.addEventListener("load", hideLoader)
}
