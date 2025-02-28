document.querySelectorAll(".type_nav a").forEach((tab) => {
  tab.addEventListener("click", function (e) {
    e.preventDefault();

    // Remove active class from all tabs
    document
      .querySelectorAll(".type_nav a")
      .forEach((t) => t.classList.remove("cate_on"));
    this.classList.add("cate_on");

    // Get selected category
    const category = this.dataset.category;

    // Filter products with null check
    document.querySelectorAll(".pro_list").forEach((product) => {
      // Get categories or empty string if undefined
      const categories = product.dataset.category || "";

      if (category === "all") {
        product.classList.remove("hidden");
      } else {
        product.classList.toggle(
          "hidden",
          !categories.split(" ").includes(category)
        );
      }
    });
  });
});
