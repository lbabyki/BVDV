document.addEventListener('DOMContentLoaded', function () {
  // ===== TẢI TIN TỨC =====
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

      // Hiển thị tin liên quan
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

  // ===== TÌM KIẾM TRONG HEADER =====
  const searchIcon = document.querySelector('.search-icon');
  const actions = document.querySelector('.actions');

  if (searchIcon && actions) {
    searchIcon.addEventListener('click', function () {
      actions.classList.toggle('show-search');
    });
  }

  // ===== FORM ĐĂNG KÝ TRONG FOOTER (hiệu ứng 1.5s) =====
  const form = document.querySelector('.footer-form form');
  const message = document.createElement('p');
  message.id = 'register-message';
  message.textContent = 'Đăng ký thành công!';
  message.style.cssText = 'display: none; color: green; font-weight: bold; text-align: center; margin-top: 10px;';
  form.appendChild(message); // Thêm thông báo vào cuối form

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const button = this.querySelector('button');
      button.disabled = true;
      button.textContent = 'ĐANG XỬ LÝ...';

      // Sau 1.5s mới hiện kết quả
      setTimeout(() => {
        button.textContent = 'ĐÃ ĐĂNG KÝ';
        button.style.backgroundColor = 'orange';
        button.style.color = 'black';
        message.style.display = 'block';
      }, 1500);
    });
  }

  // ===== NÚT CUỘN LÊN ĐẦU TRANG =====
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  window.onscroll = function () {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  };

  scrollToTopBtn.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ===== XỬ LÝ FAQ =====
  const faqItems = document.querySelectorAll('.faq-item .question');

  faqItems.forEach(function (item) {
    item.addEventListener('click', function () {
      const parent = this.closest('.faq-item');
      parent.classList.toggle('open'); // Toggle class 'open' để điều khiển việc mở rộng/thu gọn
    });
  });
});
