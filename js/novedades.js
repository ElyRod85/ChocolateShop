let loadedElements = 0;
const elementsPerLoad = 12;

function loadMoreElements() {
  const startIndex = loadedElements;
  const endIndex = startIndex + elementsPerLoad;

  fetch('js/novedades.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('posts-container');

      for (let i = startIndex; i < endIndex && i < data.length; i++) {
        const news = data[i];

        const postElement = document.createElement('div');
        postElement.classList.add('blog-post');
        postElement.innerHTML = `
          <a href="novedad.html" class="blog-post-img"><img src="${news['cover-img']}" alt="${news.title}"></a>
          <p class="post-date">${news.date}</p>
          <a href="novedad.html"><p class="post-title">${news.title}</p></a>
          <p class="post-desc">${news.description}</p>
          <a href="novedad.html" class="see-all">Leer más <i class="fa-solid fa-chevron-right"></i></a>
        `;

        container.appendChild(postElement);
      }

      loadedElements += elementsPerLoad;

      if (loadedElements >= data.length) {
        document.getElementById('load-more').style.display = 'none';
      }
    })
    .catch(error => console.log(error));
}

document.getElementById('load-more').addEventListener('click', loadMoreElements);

loadMoreElements();
