import quickCarousel from "../dist/quick-carousel.js";

window.addEventListener("load",()=>{


    document.getElementById('show_anchor').addEventListener('click',show_gallery);
})

function show_gallery() {
    const list_of_images = [
        "./images/sample_images_1.jpg",
        "./images/sample_images_2.jpg",
        "./images/sample_images_3.png",
        "./images/sample_images_4.jpg",
    ];
    const gallery = new quickCarousel(list_of_images);

    gallery.show();

}
