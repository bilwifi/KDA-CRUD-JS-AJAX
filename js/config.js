function config() {
  const env = {
    urlApi: "http://167.71.45.243:4000/api/employes",
    myKey: "imbdyjv",
    getUrl: function(url="/") {
      return `${this.urlApi}${url}?api_key=${this.myKey}`;
    }
  };

  return env;
}
