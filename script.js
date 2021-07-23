document.body.addEventListener('keyup', (event) => {
  // console.log(event.code); /// code é o código da tecla que foi pressionada;
  playSound(event.code.toLowerCase()); /// colocar tudo minusculo;
});

document.querySelector('.composer button').addEventListener('click', () => {
  let song = document.querySelector('#input').value;
  // console.log(song);
  const erro = document.querySelector('.erro');

  if (song !== '') {
    let songArray = song.split(''); /// transformar a string em um array;
    // console.log(songArray);
    playComposition(songArray);
  } else {
    erro.innerHTML = 'Erro, para tocar é necessário escrever uma composição';
    setTimeout(() => {
      erro.innerHTML = '';
    }, 2000);
  }
});

///dark mode:
const inputDark = document.querySelector('#switch');
const themeDarkLocalStorage = localStorage.getItem('theme');
if (themeDarkLocalStorage) {
  const html = document.querySelector('html');
  html.classList.add('dark');
  const escritaDarkWhite = document.querySelector('#whiteDark');
  escritaDarkWhite.innerHTML = 'Dark / White';
}
inputDark.addEventListener('click', () => {
  const html = document.querySelector('html');
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    localStorage.removeItem('theme');
  } else {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
});

function playSound(sound) {
  let audioElement = document.querySelector(`#s_${sound}`);
  let keyElement = document.querySelector(`div[data-key="${sound}"]`);
  if (audioElement) {
    audioElement.currentTime = 0; // com esse, ele para o som para poder tocar novamente;
    audioElement.play();
  }
  if (keyElement) {
    keyElement.classList.add('active');

    setTimeout(() => {
      keyElement.classList.remove('active');
    }, 300);
  }
}

function playComposition(songArray) {
  let wait = 0;

  for (let songItem of songArray) {
    setTimeout(() => {
      playSound(`key${songItem}`);
    }, wait);
    wait += 250;
  }
}

/// maquina de escrever:
function typeWhiter(element) {
  const textoArray = element.innerHTML.split('');
  element.innerHTML = '';
  // console.log(textoArray);
  textoArray.forEach((letra, i) => {
    setTimeout(() => (element.innerHTML += letra), 75 * i);
  });
}

const titulo = document.querySelector('#maquinaEscrever');
typeWhiter(titulo);
