import quickCarousel from "./quick-carousel.js";

window.addEventListener("load",()=>{
    const list_of_images = [
        "./images/sample_images_1.jpg",
        "./images/sample_images_2.jpg",
        "./images/sample_images_3.png",
        "./images/sample_images_4.jpg",
    ];
    const gallery = new quickCarousel(list_of_images);

    gallery.show();
})
