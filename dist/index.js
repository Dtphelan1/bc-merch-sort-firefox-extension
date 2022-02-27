const wholeGrid = document.getElementById("merch-grid");
if (wholeGrid) {
  const newGrid = document.createDocumentFragment();
  const inStock = [];
  const soldOut = [];

  Array.from(wholeGrid.children).forEach((li) => {
    const cloneLi = li.cloneNode(true);
    if (li.querySelector("p.price.sold-out")) {
      soldOut.push(cloneLi);
    } else {
      inStock.push(cloneLi);
    }
  });

  // Add a light faded look to all sold out items
  soldOut.forEach((li) => {
    li.style = "opacity: 0.7";
  });

  newGrid.append(...inStock);
  newGrid.append(...soldOut);

  // Work around lazy loading of BC photos
  setTimeout(() => {
    Array.from(newGrid.querySelectorAll("img")).forEach((img) => {
      if (img.dataset.original) {
        // The actual src-URL lives on the data-original attribute
        img.src = img.dataset.original;
        // The lazy-loading sometimes gets caught halfway through a fade-in
        // Zero-out the style in case any opacity is stuck anywhere below opacity:1.0
        img.style = "";
      }
    });
    // Finally, replace the merch grid with our cloned, modified elements
    wholeGrid.innerHTML = null;
    wholeGrid.appendChild(newGrid);
  }, 1000);
}
