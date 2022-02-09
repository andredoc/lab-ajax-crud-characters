class APIHandler {
  constructor (baseUrl) {
    this.axiosApp = axios.create({
      baseURL: baseUrl
    });
  }

  getFullList () {
    return this.axiosApp.get('/characters')

  }

  getOneRegister(id) {
    return this.axiosApp.get(`/characters/${id}`)
  }

  createOneRegister (characterInfo) {
    return this.axiosApp.post('/characters', characterInfo)
  }

  updateOneRegister (id, infoCharacter) {
    return this.axiosApp.put(`/characters/${id}`, infoCharacter)
  }

  deleteOneRegister (id) {
    return this.axiosApp.delete(`/characters/${id}`)
  }
}


