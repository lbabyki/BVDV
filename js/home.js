async function loadNews() {
    try {
      const response = await fetch('https://be.myporfolio.io.vn/news');
      const newsData = await response.json();

      // Hiển thị tin chính
      const main = newsData.main;
      document.getElementById('main-news').innerHTML = `
        <a href="${main.href}" target="_blank">
          <img src="${main.img}" alt="${main.title}">
          <h3>${main.title}</h3>
          <p>${main.sapo}</p>
        </a>
      `;

      // Hiển thị các tin liên quan
      const sideNews = document.getElementById('side-news');
      newsData.related.forEach(item => {
        const div = document.createElement('div');
        div.className = 'news-item';
        div.innerHTML = `
          <a href="${item.href}" target="_blank">
            <img src="${item.img}" alt="${item.title}">
            <h4>${item.title}</h4>
          </a>
        `;
        sideNews.appendChild(div);
      });

    } catch (error) {
      console.error('Lỗi khi tải tin tức:', error);
    }
  }

  loadNews();