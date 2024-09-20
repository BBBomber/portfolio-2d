document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".project-card");
  const infoPanel = document.querySelector(".info-panel");
  const infoTitle = document.querySelector(".project-title");
  const infoDescription = document.querySelector(".project-description");
  const infoTech = document.querySelector(".project-technologies");
  const infoImage = document.querySelector(".project-image");

  const projectData = {
    project1: {
      title: "Project 1",
      description: "A game development project using Unity.",
      technologies: "Unity, C#",
      image: "assets/images/project1.png",
    },
    project2: {
      title: "Project 2",
      description: "A 2D game built with SFML.",
      technologies: "SFML, C++",
      image: "assets/images/project2.png",
    },
    project3: {
      title: "Project 3",
      description: "A VR game prototype using Unreal Engine.",
      technologies: "Unreal Engine, C++",
      image: "assets/images/project3.png",
    },
  };

  function clearInfoPanel() {
    infoTitle.classList.remove("show");
    infoDescription.classList.remove("show");
    infoTech.classList.remove("show");
    infoImage.classList.remove("show");

    setTimeout(() => {
      infoTitle.innerHTML = "";
      infoDescription.innerHTML = "";
      infoTech.innerHTML = "";
      infoImage.style.backgroundImage = "";
    }, 500); // Match the transition duration
  }

  function updateInfoPanel(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    clearInfoPanel();

    setTimeout(() => {
      infoTitle.innerHTML = project.title;
      infoDescription.innerHTML = project.description;
      infoTech.innerHTML = project.technologies;
      infoImage.style.backgroundImage = `url(${project.image})`;

      infoTitle.classList.add("show");
      infoDescription.classList.add("show");
      infoTech.classList.add("show");
      infoImage.classList.add("show");
    }, 600);
  }

  cards.forEach((card) => {
    card.addEventListener("click", function () {
      updateInfoPanel(this.id);

      // Particle Effect on Click
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        infoPanel.appendChild(particle);

        const angle = Math.random() * 360;
        const distance = Math.random() * 100 + 50;
        const x = distance * Math.cos(angle);
        const y = distance * Math.sin(angle);

        particle.style.left = "50%";
        particle.style.top = "50%";
        particle.style.transform = `translate(${x}px, ${y}px) scale(0.5)`;
        particle.style.opacity = "0";

        setTimeout(() => {
          particle.remove();
        }, 1000);
      }
    });
  });
});
