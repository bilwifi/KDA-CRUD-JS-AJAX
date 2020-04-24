function config() {
  const env = {
    urlApi: "URL DE L'API", // URL de l' API
    myKey: "Votre Clé de l'API",
    getUrl: function(url) {
      return `${this.urlApi}/${url}?api_key=${this.myKey}`;
    }
  };

  return env;
}
