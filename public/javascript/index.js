const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/');
const charactersContainerEl = document.getElementsByClassName('characters-container')[0];
const deleteBtnEl = document.getElementById('delete-one');
const createBtnEl = document.getElementById('create-btn');
const updateBtnEl = document.getElementById('update-btn');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {

    charactersContainerEl.innerHTML = '';

      charactersAPI
        .getFullList()
        .then(response=> {
          console.log(response.data)

          response.data.forEach(character => {
            const characterInfoEl = document.createElement('div');
            characterInfoEl.className = 'character-info';
            characterInfoEl.innerHTML = `
              <div class="name">Character Name: <span>${character.name}</span></div>
              <div class="occupation">Character Occupation: <span>${character.occupation}</span></div>
              <div class="cartoon">Is a Cartoon?: <span>${character.cartoon}</span></div>
              <div class="weapon">Character Weapon: <span>${character.weapon}</span></div>
            `;

            charactersContainerEl.appendChild(characterInfoEl);
          });
        })
        .catch(err => console.log(err))  
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {

    const characterIdInputElement = document.getElementsByName('character-id')
    const idValue = characterIdInputElement[0].value;
    charactersContainerEl.innerHTML = '';

      charactersAPI
        .getOneRegister(idValue)
        .then(response => {
          characterIdInputElement[0].value = '';
          console.log(response.data)
          const character = response.data;
          const characterInfoEl = document.createElement('div');
          characterInfoEl.className = 'character-info';
          characterInfoEl.innerHTML = `
              <div class="name">Character Name: <span>${character.name}</span></div>
              <div class="occupation">Character Occupation: <span>${character.occupation}</span></div>
              <div class="cartoon">Is a Cartoon?: <span>${character.cartoon}</span></div>
              <div class="weapon">Character Weapon: <span>${character.weapon}</span></div>
            `;

          charactersContainerEl.appendChild(characterInfoEl);
        })
        .catch(err => console.log(err))
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {

    const id = document.getElementsByName('character-id-delete')[0].value
    deleteBtnEl.classList.remove('response-ok', 'response-error');
  
      charactersAPI
        .deleteOneRegister(id)
        .then(response => {
          document.getElementsByName('character-id-delete')[0].value = '';
          console.log(response.data)
          deleteBtnEl.classList.add('response-ok');
        })
        .catch(error => {
          console.log(error)
          deleteBtnEl.classList.add('response-error');
        })
        



  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const inputs = document.querySelectorAll('#edit-character-form input')
    updateBtnEl.classList.remove('response-ok', 'response-error');

    const characterInfo = {
      name: inputs[1].value,
      occupation: inputs[2].value,
      weapon: inputs[3].value,
      cartoon: inputs[4].checked
    };

    charactersAPI
      .updateOneRegister(inputs[0].value, characterInfo)
      .then(response => {
        document.querySelector('#edit-character-form').reset()
        console.log(response.data)
        updateBtnEl.classList.add('response-ok');
      })
      .catch(error => {
        console.log(error)
        updateBtnEl.classList.add('response-error');
      })

  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const inputs = document.querySelectorAll('#new-character-form input');
    createBtnEl.classList.remove('response-ok', 'response-error');

    const characterInfo = {
      name: inputs[0].value,
      occupation : inputs[1].value,
      weapon: inputs[2].value,
      cartoon: inputs[3].checked
    };

    charactersAPI
      .createOneRegister(characterInfo)
      .then(response => {
        document.querySelector('#new-character-form').reset()
        console.log(response.data)
        createBtnEl.classList.add('response-ok');
      })
      .catch(err => {
        console.log(err)
        createBtnEl.classList.add('response-error');
      })
     
  });
});

