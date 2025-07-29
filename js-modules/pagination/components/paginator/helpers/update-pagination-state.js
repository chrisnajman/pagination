export default function updatePaginationState(
  currentId,
  totalPages,
  previousBtn,
  nextBtn
) {
  if (currentId === "1") {
    previousBtn.setAttribute("disabled", "")
  } else {
    previousBtn.removeAttribute("disabled")
  }

  if (currentId === totalPages.toString()) {
    nextBtn.setAttribute("disabled", "")
  } else {
    nextBtn.removeAttribute("disabled")
  }
}
