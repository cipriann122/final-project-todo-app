<template>
  <div class="about-page">
    <h1 class="title">About EZ2DO</h1>
    <p class="intro">
      Welcome to <span class="highlight">EZ2DO</span>, your ultimate
      productivity companion designed to help you organize and manage your tasks
      effortlessly. Our app offers a seamless and intuitive experience, enabling
      you to keep track of your personal and professional goals, ensuring you
      stay on top of your to-dos without the hassle.
    </p>

    <h2 class="section-title">Key Features</h2>
    <ul class="feature-list">
      <li class="feature-item">
        <strong>User-Friendly Interface:</strong> EZ2DO is designed with
        simplicity and ease of use in mind. Whether you're a tech-savvy user or
        new to task management apps, our intuitive interface ensures you can get
        started right away.
      </li>
      <li class="feature-item">
        <strong>Task Organization:</strong> Create, edit, and manage your tasks
        with ease. Our app allows you to categorize tasks by priority, set
        deadlines, and add detailed notes to keep all necessary information at
        your fingertips.
      </li>
      <li class="feature-item">
        <strong>Account Management:</strong> Effortlessly manage your account
        settings, update personal information, and secure your data with our
        robust authentication features.
      </li>
      <li class="feature-item">
        <strong>Responsive Design:</strong> Enjoy a seamless experience on any
        device. EZ2DO is optimized for both desktop and mobile devices, allowing
        you to access your tasks whenever and wherever you need.
      </li>
      <li class="feature-item">
        <strong>Customizable Experience:</strong> Tailor your task management
        with customizable settings and preferences. Adjust themes,
        notifications, and other features to fit your unique workflow and style.
      </li>
      <li class="feature-item">
        <strong>Secure and Reliable:</strong> Built with cutting-edge security
        measures, EZ2DO ensures that your data is protected and your privacy is
        maintained.
      </li>
    </ul>
    <p class="cta">
      Get started today and experience the difference with EZ2DO!
    </p>
  </div>
</template>

<style scoped>
.about-page {
  max-width: 800px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: var(--card-background);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  color: var(--text-color);
}

.title {
  font-size: 2.5rem;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 1rem;
}

.intro {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  text-align: justify;
}

.section-title {
  font-size: 1.75rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 0.5rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.feature-item {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  position: relative;
}

.feature-item::before {
  content: "✔";
  position: absolute;
  left: 0;
  color: var(--primary-color);
  font-weight: bold;
}

.highlight {
  color: var(--primary-color);
  font-weight: bold;
}

.cta {
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-top: 2rem;
}
</style>
