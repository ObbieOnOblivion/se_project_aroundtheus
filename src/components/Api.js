class Api {
  constructor({baseUrl, headers}) { // private vars and methods
    this.nameElement = NaN; // set to profile name
    this.aboutElement = NaN; // set to 
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getInitialCards() {
    // ...
  }

  _getUserInfo(name, about) {
    this.nameElement.textContent = name;
    this.aboutElement.textContent = about
  };

  getCardInfo(){ // when i preform this i get errors, 5x the information is presented 
    const apiUrl = `${this.baseUrl}/cards`;
    const requestOptions = {
        method: "GET",
        headers: {
          'Authorization': "9b29ae94-bb6f-470b-bccd-5f1bdf13a16a",
        },
      };
    
      fetch(apiUrl, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Data received:', data);
          
        })
        .catch(error => {
          console.error('Error:', error);
        });
  }


  addCardInfo(name, description, XFunction){
    const apiUrl = `${this.baseUrl}/cards`; // fix this
    const requestOptions = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "9b29ae94-bb6f-470b-bccd-5f1bdf13a16a",
        },
        body: JSON.stringify({ name: name, link: description })
      };
    
      fetch(apiUrl, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Data received:', data);
          XFunction(data['name'], data['link']);
          
        })
        .catch(error => {
          console.error('Error:', error);
        });
  };

  setUserInfo(name, about) { // mix match the names getuserinfo and change x and y 

    const apiUrl = `${this.baseUrl}/users/me`;
    
    const patchData = {
      name: name,
      about: about,
    };
    
    const requestOptions = {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(patchData),
    };
    
    fetch(apiUrl, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Updated resource:', data);
        this._getUserInfo(data['name'], data['about']);

      })
      .catch(error => {
        console.error('Error:', error);
      });

  }

}

export { Api };
