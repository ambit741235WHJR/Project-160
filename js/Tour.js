AFRAME.registerComponent("tour", {
  schema: {
    state: { type: "string", default: "places-list" },
    selectedCard: { type: "string", default: "#card1" },
    zoomAspectRatio: { type: "number", default: 1 }
  },
  init: function() {
    this.placesContainer = this.el;
    this.cameraEl = document.querySelector("#camera");
    this.createPlace();
  },
  update: function() {
    window.addEventListener("keydown", e => {
      if (e.key === "ArrowUp") {
        if (
          (this.data.zoomAspectRatio <= 10 && this.data.state === "view") ||
          (this.data.zoomAspectRatio <= 10 && this.data.state === "change-view")
        ) {
          this.data.zoomAspectRatio += 0.002;
          this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
        }
      }
      if (e.key === "ArrowDown") {
        if (
          (this.data.zoomAspectRatio > 1 && this.data.state === "view") ||
          (this.data.zoomAspectRatio > 1 && this.data.state === "change-view")
        ) {
          this.data.zoomAspectRatio -= 0.002;
          this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
        }
      }
    });
  },
  tick: function() {
    const { state } = this.el.getAttribute("tour");

    if (state === "view") {
      this.hideEl([this.placesContainer]);
      this.showView();
    }
  },
  hideEl: function(elList) {
    elList.map(el => {
      el.setAttribute("visible", false);
    });
  },
  showView: function() {
    const { selectedCard } = this.data;
    const skyEl = document.querySelector("#main-container");
    skyEl.setAttribute("material", {
      src: `./assets/360_images/${selectedCard}/place-0.jpg`,
      color: "#fff"
    });
  },
  createPlace: function() {
    const details = {
      garden: {
        position: { x: 20, y: -4.5, z: -5.5 },
        rotation: { x: 0, y: -90, z: 0 },
        src: "./assets/thumbnails/garden.jpg",
        title: "Garden",
        id: "garden"
      },

      main_gate: {
        position: { x: 4.6, y: -5.5, z: 25 },
        rotation: { x: 180, y: 0, z: 0 },
        src: "./assets/thumbnails/main_gate.jpg",
        title: "Main Gate",
        id: "main_gate"
      },

      home: {
        position: { x: -9, y: 34, z: -100 },
        rotation: { x: 0, y: 0, z: 0 },
        src: "./assets/thumbnails/home.jpg",
        title: "My Home",
        id: "home"
      }
    };

    for (var key in details) {
      const item = details[key];
      // Thumbnail Element
      const thumbNail = this.createThumbNail(item);
      // Title
      const title = this.createTitleEl(item);
      thumbNail.appendChild(title);
      this.placesContainer.appendChild(thumbNail);
    }
  },
  createBorder: function(position, id) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("id", id);
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive: "ring",
      radiusInner: 9,
      radiusOuter: 10
    });
    entityEl.setAttribute("position", position);
    entityEl.setAttribute("material", {
      color: "#0077CC",
      opacity: 1
    });
    entityEl.setAttribute("cursor-listener", {});
    return entityEl;
  },
  createThumbNail: function(item) {
    const entityEl = document.createElement("a-entity");
    const id = `place-${item.id}`;
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("id", id);
    entityEl.setAttribute("geometry", {
      primitive: "circle",
      radius: 3
    });
    entityEl.setAttribute("position", item.position);
    entityEl.setAttribute("rotation", item.rotation);
    entityEl.setAttribute("material", { src: item.src, opacity: 0.6 });
    entityEl.setAttribute("cursor-listener", {});
    return entityEl;
  },
  createTitleEl: function(position, item) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("text", {
      font: "exo2bold",
      align: "center",
      width: 60,
      color: "#e65100",
      value: item.title
    });
    const elPosition = position;
    elPosition.y = -20;
    entityEl.setAttribute("position", elPosition);
    entityEl.setAttribute("visible", true);
    return entityEl;
  }, 
  
});
