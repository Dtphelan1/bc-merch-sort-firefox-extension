const wholeGrid = document.getElementById('merch-grid');
const newGrid = document.createDocumentFragment();
const inStock = [];
const soldOut = [];

Array.from(wholeGrid.children).forEach((li) => {
  const cloneLi = li.cloneNode(true);
  if (li.querySelector('p.price.sold-out')) {
    soldOut.push(cloneLi);
  } else {
    inStock.push(cloneLi);
  }
});

soldOut.forEach((li) => {
    li.style="background:rgba(210,210,210,0.7)"
})

newGrid.append(...inStock);
newGrid.append(...soldOut);

// Work around lazy loading of BC photos
Array.from(newGrid.querySelectorAll('img')).forEach((img) => {
  if (img.dataset.original) { 
      img.src = img.dataset.original; 
  } 
});
wholeGrid.innerHTML = null;
wholeGrid.appendChild(newGrid);
