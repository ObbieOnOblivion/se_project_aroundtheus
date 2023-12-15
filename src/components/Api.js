class Api { // refactoring needed. 
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  toggleButtonState(cardId, isLiked){
    const apiUrl = `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`;

    const apiKey = '9b29ae94-bb6f-470b-bccd-5f1bdf13a16a'; 
  
    const requestOptions = {
      method: isLiked ? 'DELETE' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiKey,
      }
    };
  
    return fetch(apiUrl, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Card like status updated successfully:', data);
        return data;
      })
      .catch(error => {
        console.error('Error updating card like status:', error);
        throw error;
      });
  

  }

  deleteCard(resource) { // this whole approach from this function and the function bellow came from not having an object 
    // with only the amount of elements displayed to the screen

    const apiUrl = `${this.baseUrl}/cards/${resource}`;
    
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "9b29ae94-bb6f-470b-bccd-5f1bdf13a16a",

      },
    };
  
    return fetch(apiUrl, requestOptions) // note return statement
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('Resource deleted successfully');
      })
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
    
    
  }

  getCardInfo(nameToFind, linkToFind, apiDelete = false, toggleButton = false) { 
    // when i preform this i get errors, 5x the information is presented
    const apiUrl = `${this.baseUrl}/cards`; 

    const requestOptions = {
      method: "GET",
      headers: { // replace this with this.headers; 
        "Content-Type": "application/json",
        Authorization: "9b29ae94-bb6f-470b-bccd-5f1bdf13a16a",
      },
    };

    return fetch(apiUrl, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const reversedData = [...data].reverse();
        const lastIndex = reversedData.findIndex(user => user.name === nameToFind && user.link === linkToFind);
  
        if (lastIndex !== -1) {
          const lastInstance = data[data.length - 1 - lastIndex];
          console.log('Last instance found:', lastInstance);
          if (apiDelete){
            this.deleteCard(lastInstance._id)
          }
          if (toggleButton){
            this.toggleButtonState(lastInstance._id, lastInstance.isLiked)
          }
          return this.currentId; // some refactoring has to do with this
        } else {
          console.log('No instance found with the specified name and link.');
          return undefined;
        }
      })
      .catch(error => {
        console.error('Error:', error);
        throw error; 
      });
  }

  addCardInfo(name, description, XFunction) {
    // change name of x function
    const apiUrl = `${this.baseUrl}/cards`;
    const requestOptions = {
      method: "POST",
      headers: { // replace this with this.headers; 
        "Content-Type": "application/json",
        Authorization: "9b29ae94-bb6f-470b-bccd-5f1bdf13a16a",
      },
      body: JSON.stringify({ name: name, link: description }),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        XFunction(data["name"], data["link"]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  setUserInfo(name, about) {
    const apiUrl = `${this.baseUrl}/users/me`;

    const patchData = {
      name: name,
      about: about,
    };

    const requestOptions = {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(patchData),
    };

    return fetch(apiUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // console.log('Updated resource:', data);
        return data;
      })
      .catch((error) => {
        // console.error('Error:', error);
      });
  }
}

export { Api };
