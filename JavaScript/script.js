const apikey = '563492ad6f91700001000001b2d96df6c2ed432bbe541ef4e69dcb27';
const input = document.querySelector('.input');
const btn = document.querySelector('.search-btn');
const cls = document.querySelector('.x');

const place = document.querySelector('.teg')
let value = '';
let search = false;
//default photos

async function defaultPhotos() {
    const data = await fetch('https://api.pexels.com/v1/search?query=nature&per_page=8000', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: apikey,
        }
    })

    const response = await data.json();

    displayimg(response);
}
const disimg = document.querySelector('.display-img');

function displayimg(response) {
    response.photos.forEach(img => {
        const div = document.createElement('div');
        div.className = 'li';
        div.width = img.width
        div.innerHTML = `
      <a>
        <img class='image' id=${img.id} src=${img.src.tiny} alt=${img.url}></img>
        <p class='text'>${img.alt}</p>
      </a>
    
    `
        disimg.appendChild(div)

    });


    disimg.addEventListener('click', (e) => {
        if (e.target.nodeName === 'IMG') {
            let mainimg1 = e.target.id;
            const mainimg = (response.photos).filter(images => {
                if (images.id == mainimg1) {
                    return images
                }
            })
            console.log(mainimg);
            place.innerHTML = `
        <a class='dicullo'>
          <img class='teg' src=${mainimg[0].src.medium} alt=${mainimg[0].url} width=${mainimg[0].width}></img>
        </a>
      `
            searchPhotos(mainimg[0].alt)
        }
    })
}

async function searchPhotos(query) {
    disimg.innerHTML = '';
    const data = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=10000`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: apikey,
        }
    })
    const response = await data.json();
    if (response.total_results == 0) {
        document.querySelector('.ooo').classList.remove('none');
        document.querySelector('.display-img').classList.remove('m-top');
    } else {
        document.querySelector('.ooo').classList.add('none');
        document.querySelector('.display-img').classList.add('m-top');
    }

    displayimg(response);
}

input.addEventListener('input', (e) => {
    e.preventDefault();

    value = e.target.value;
})

btn.addEventListener('click', (e) => {
    if (input.value === '') {
        document.querySelector('.alert').innerHTML = 'Empty search! Please enter any value!';
    } else {
        document.querySelector('.alert').innerHTML = '';
        search = true;
        clear();
        searchPhotos(input.value)
    }
});

cls.addEventListener('click', () => {
    clearvalue()
});

function clear() {
    document.querySelector('.display-img').innerHTML = '';
}

function clearvalue() {
    input.value = '';
}

window.addEventListener('DOMContentLoaded', () => {
    const scr = document.querySelector('.scroll-top');

    window.addEventListener('scroll', () => {
        scr.classList.toggle('active', window.scrollY > 100)
    });
    scr.addEventListener('click', () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
});

defaultPhotos();


