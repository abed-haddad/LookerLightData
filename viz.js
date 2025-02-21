const dscc = require('@google/dscc');

// Function to draw visualization
const drawViz = (data) => {
  const container = document.getElementById('viz-container');
  container.innerHTML = ''; // Clear previous render

  if (!data.tables.DEFAULT || data.tables.DEFAULT.length === 0) {
    container.innerHTML = "<p>No data available</p>";
    return;
  }

  // Extract selections and image URLs from Looker Studio dataset
  const dataset = data.tables.DEFAULT.map(row => ({
    selection: row.Selection[0],
    imageUrl: row['Image URL'][0]
  }));

  // Create a dropdown menu
  const select = document.createElement('select');
  dataset.forEach((item) => {
    const option = document.createElement('option');
    option.value = item.imageUrl;
    option.textContent = item.selection;
    select.appendChild(option);
  });

  // Create an image element
  const image = document.createElement('img');
  image.src = dataset[0].imageUrl;
  image.style.maxWidth = "100%";
  image.style.height = "auto";
  image.style.display = "block";
  image.style.marginTop = "10px";

  // Update image on dropdown change
  select.addEventListener('change', () => {
    image.src = select.value;
  });

  // Append elements to the container
  container.appendChild(select);
  container.appendChild(image);
};

// Listen for data updates
dscc.subscribeToData(drawViz, { transform: dscc.objectTransform });
