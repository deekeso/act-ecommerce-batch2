<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-top">
        <a href="/" class="footer-logo">
          <span class="footer-brand-name">Shop+</span>
        </a>
        <ul class="footer-links">
          <li><a href="#" class="footer-link">About</a></li>
          <li><a href="#" class="footer-link">Privacy Policy</a></li>
          <li><a href="#" class="footer-link">Licensing</a></li>
          <li><a href="#" class="footer-link">Contact</a></li>
        </ul>
      </div>
      <hr class="footer-divider" />
      <span class="footer-text">
        © {{ new Date().getFullYear() }} <a href="/" class="footer-link">Shop+</a>
        . All Rights Reserved.
      </span>
    </div>
  </footer>
</template>

<script lang="ts" setup></script>

<style scoped>
.footer {
  background-color: white;
  border-radius: 8px;
  margin-top: 2rem;
  width: 100%;
  overflow-x: hidden; 
}

.footer-container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; 
  gap: 1rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.footer-brand-name {
  font-size: 24px;
  font-weight: bold;
  color: black;
  text-decoration: none;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.footer-link {
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  transition: color 0.3s;
  text-decoration: none;
  white-space: nowrap;
}

.footer-link:hover {
  color: #000;
}

.footer-divider {
  margin: 24px 0;
  border-top: 1px solid #e5e7eb;
}

.footer-text {
  font-size: 12px;
  text-align: center;
  color: #6b7280;
}

.footer-text a {
  color: #000;
  text-decoration: none;
}

.footer-text a:hover {
  text-decoration: underline;
}

/* Mobile tweaks */
@media (max-width: 600px) {
  .footer-top {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-links {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
