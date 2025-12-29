// content.js
// Only job: collect clean, usable images from the webpage and return them

const collectImages = () => {
    const allImages = document.images;

    const imagesObject = Array.from(allImages).map((img) => {
        let url = null;

        if (img.src) {
            url = img.src;
        } else if (img.dataset && img.dataset.src) {
            url = img.dataset.src;
        } else if (img.srcset) {
            // extract first URL from srcset safely
            url = img.srcset.split(',')[0].trim().split(' ')[0];
        }

        return {
            url,
            width: img.naturalWidth,
            height: img.naturalHeight
        };
    });

    const uniqueImages = [];
    imagesObject.forEach((obj) => {
        if (
            obj.url &&                              // valid URL
            obj.width > 30 && obj.height > 30 &&    // ignore tiny images
            !uniqueImages.find(img => img.url === obj.url)
        ) {
            uniqueImages.push(obj);
        }
    });

    return uniqueImages;
};
