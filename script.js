let currentPage = 1;
let totalPages = 1;
const itemsPerPage = 6;

async function buscarLibros(page = 1) {
  const query = document.getElementById('searchInput').value;
  const language = document.getElementById('languageFilter').value;
  const sort = document.getElementById('sortFilter').value;
  currentPage = page;

  let url = `https://gutendex.com/books?page=${page}`;
  if (query) url += `&search=${encodeURIComponent(query)}`;
  if (language) url += `&languages=${language}`;
  if (sort) url += `&sort=${sort}`;

  const contenedor = document.getElementById('resultados');
  const loading = document.getElementById('loading');
  const pagination = document.getElementById('pagination');

  contenedor.innerHTML = '';
  loading.classList.remove('hidden');

  try {
    const res = await fetch(url);
    const data = await res.json();

    loading.classList.add('hidden');

    if (data.results.length === 0) {
      contenedor.innerHTML = '<p class="text-center text-gray-600 col-span-full text-lg">No se encontraron libros.</p>';
      pagination.innerHTML = '';
      return;
    }

    // Limit to 6 items per page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedResults = data.results.slice(0, itemsPerPage);

    // Update pagination
    totalPages = Math.ceil(data.count / itemsPerPage);
    renderPagination();

    // Render books
    paginatedResults.forEach((libro, index) => {
      const div = document.createElement('div');
      div.className = 'book-card bg-white p-6 rounded-xl shadow-lg hover-scale';
      div.style.animationDelay = `${index * 0.1}s`;

      const portada = libro.formats['image/jpeg'] || 'https://via.placeholder.com/120x180?text=Sin+Portada';
      const autor = libro.authors.length > 0 ? libro.authors[0].name : 'Autor desconocido';
      const downloadLink = libro.formats['application/epub+zip'] || libro.formats['text/plain'] || '#';

      div.innerHTML = `
        <div class="flex flex-col items-center text-center">
          <img src="${portada}" alt="Portada" class="w-32 h-48 object-cover rounded-lg mb-4" onerror="this.src='https://via.placeholder.com/120x180?text=Sin+Portada'">
          <h3 class="text-xl font-semibold text-gray-800 mb-2">${libro.title}</h3>
          <p class="text-gray-600 mb-1"><strong>Autor:</strong> ${autor}</p>
          <p class="text-gray-600 mb-1"><strong>Idioma:</strong> ${libro.languages.join(', ')}</p>
          <p class="text-gray-600 mb-3"><strong>Descargas:</strong> ${libro.download_count}</p>
          <a
            href="${downloadLink}"
            target="_blank"
            class="inline-block bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            📖 Leer
          </a>
        </div>
      `;

      contenedor.appendChild(div);
    });
  } catch (error) {
    loading.classList.add('hidden');
    contenedor.innerHTML = '<p class="text-center text-red-600 col-span-full text-lg">Error al cargar los libros.</p>';
  }
}

function renderPagination() {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  const prevButton = document.createElement('button');
  prevButton.className = `px-5 py-2 rounded-lg text-sm font-medium ${
    currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'
  }`;
  prevButton.textContent = 'Anterior';
  prevButton.disabled = currentPage === 1;
  prevButton.onclick = () => buscarLibros(currentPage - 1);
  pagination.appendChild(prevButton);

  // Page numbers
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  if (startPage > 1) {
    const firstPage = document.createElement('button');
    firstPage.className = 'px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm font-medium';
    firstPage.textContent = '1';
    firstPage.onclick = () => buscarLibros(1);
    pagination.appendChild(firstPage);

    if (startPage > 2) {
      const dots = document.createElement('span');
      dots.className = 'px-5 py-2 text-gray-500';
      dots.textContent = '...';
      pagination.appendChild(dots);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement('button');
    pageButton.className = `px-5 py-2 rounded-lg text-sm font-medium ${
      i === currentPage ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
    }`;
    pageButton.textContent = i;
    pageButton.onclick = () => buscarLibros(i);
    pagination.appendChild(pageButton);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const dots = document.createElement('span');
      dots.className = 'px-5 py-2 text-gray-500';
      dots.textContent = '...';
      pagination.appendChild(dots);
    }

    const lastPage = document.createElement('button');
    lastPage.className = 'px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm font-medium';
    lastPage.textContent = totalPages;
    lastPage.onclick = () => buscarLibros(totalPages);
    pagination.appendChild(lastPage);
  }

  const nextButton = document.createElement('button');
  nextButton.className = `px-5 py-2 rounded-lg text-sm font-medium ${
    currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'
  }`;
  nextButton.textContent = 'Siguiente';
  nextButton.disabled = currentPage === totalPages;
  nextButton.onclick = () => buscarLibros(currentPage + 1);
  pagination.appendChild(nextButton);
}

// Trigger search on Enter key
document.getElementById('searchInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') buscarLibros(1);
});