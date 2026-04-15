window.addEventListener("load", () => {

    const elementos = document.querySelectorAll(
      ".slide-down, [class*='slide-up-stagger']"
    );
  
    elementos.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("show");
      }, index * 200);
    });
  
  });
