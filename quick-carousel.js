class quickCarousel {
    constructor(list_of_images = [], parent_div=document.querySelector("body")) {
        this.list_of_images     = list_of_images;
        this.parent_div         = parent_div;
        this.current_image      = 0;

        const gallery_box       = this.newel("div","quickCarouselGalleryBox");
        gallery_box.setAttribute('tabindex',0);
        this.gallery_box        = gallery_box;

        const gallery_top_bar = this.newel("div","gallery_top_bar");
        const gallery_slider = this.newel("div","gallery_slider");
        const gallery_thumbnails = this.newel("div","gallery_thumbnails");

        gallery_box.append(gallery_top_bar,gallery_slider,gallery_thumbnails);

        // close & download buttones
        const close_button = this.newel("div","gallery_close_button");
        close_button.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/></svg>`;
        close_button.addEventListener("click",()=>this.hide());

        const download_button = this.newel('div',`gallery_download_button`);
        download_button.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M11 40q-1.2 0-2.1-.9Q8 38.2 8 37v-7.15h3V37h26v-7.15h3V37q0 1.2-.9 2.1-.9.9-2.1.9Zm13-7.65-9.65-9.65 2.15-2.15 6 6V8h3v18.55l6-6 2.15 2.15Z"/></svg>`;
        download_button.addEventListener("click",()=>{
            const download_anchor = this.newel("a");
            download_anchor.href=this.list_of_images[this.current_image];
            download_anchor.download = this.list_of_images[this.current_image].replace(/^.*[\\\/]/, '');
            download_anchor.style.display= "none";

            document.body.appendChild(download_anchor);
            download_anchor.click();
            download_anchor.remove();
        })
        gallery_top_bar.append(download_button,close_button);

        // back & forward buttons
        const backbutton    = this.newel("div","gallery_back_button");
            backbutton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="48" width="30"><path d="M20 44 0 24 20 4l2.8 2.85L5.65 24 22.8 41.15Z"/></svg>`;
            backbutton.addEventListener('click',()=>this.image_previous());
        const forwardbutton = this.newel("div","gallery_forward_button");
            forwardbutton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z"/></svg>`;
            forwardbutton.addEventListener('click',()=>this.image_next());

        const imgwrapper    = this.newel("div","gallery_central_image");

        const imgelement    = this.newel("img");
        imgwrapper.appendChild(imgelement);

        gallery_slider.append(backbutton,imgwrapper,forwardbutton);

        // adding images thumbnails
        this.list_of_images.forEach((img,index)=>{
            var thumbnail = this.newel("img",'gallery_bottom_thumbnail');
            thumbnail.src = img;
            thumbnail.addEventListener('click',()=> { 
                this.current_image = index;
                this.set_current_image();
            });
            thumbnail.setAttribute("image_index",index);

            gallery_thumbnails.appendChild(thumbnail);
        });

        if (this.list_of_images.length > 0 ){
            this.set_current_image();
        }

        // adding keyboard shortcuts
        this.gallery_box.addEventListener("keydown",(event)=>{
            switch (event.code){
                case "ArrowLeft":
                    this.image_previous();
                    break;
                case "ArrowRight":
                    this.image_next();
                    break;
            }
        });

        // this.gallery_box.addEventListener("blur",()=>setTimeout(()=>this.gallery_box.focus(),0));

        parent_div.appendChild(gallery_box);
    }

    show() {
        this.gallery_box.style.display = "grid";
        this.gallery_box.focus()
    }

    hide() {
        this.gallery_box.style.display = "";
    }

    image_previous() {
        this.current_image = Math.max(0,(this.current_image-1)); 
        this.set_current_image();
    }
    image_next() {
        this.current_image = Math.min((this.current_image+1), this.list_of_images.length-1); 
        this.set_current_image();
    }
    set_current_image(){
        this.gallery_box.querySelector(".gallery_central_image img").src = this.list_of_images[this.current_image];
        this.gallery_box.querySelectorAll(`.gallery_thumbnails img`).forEach(img=>img.classList.remove("active"));
        this.gallery_box.querySelector(`.gallery_thumbnails img[image_index='${this.current_image}']`).classList.add("active");
        this.gallery_box.focus();
    }

    newel (elementtype="div",classes = []) {
        const newel = document.createElement(elementtype);
        if (classes.length){
            newel.classList.add(classes);
        }
        return newel;
    }

}
export default quickCarousel;