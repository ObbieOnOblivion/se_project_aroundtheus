class Api {
  //refactoring needed
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  deleteCard(cardId) {
    fetch(`https://around-api.en.tripleten-services.com/v1/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Data deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  }

  test() {
    //getCardInfo   for initial cards
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "GET",
      headers: this.headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })
      .catch((error) => {
        console.error("Error updating avatar:", error);
      });
  }

  getInitailcards(){

    const apiUrl = `${this.baseUrl}/cards`;

    const requestOptions = {
      method: "GET",
      headers: this.headers,
    };

    return fetch(apiUrl, requestOptions)
    .then((res) => {
      return res.json()
    } )
    .then((res) =>{
      console.log(res)
    })
  }

  getProfileInfo() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "GET",
      headers: this.headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error updating avatar:", error);
      });
  }

  changeAvatar(link) {
    fetch("https://around-api.en.tripleten-services.com/v1/users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Avatar updated successfully:", data);
      })
      .catch((error) => {
        console.error("Error updating avatar:", error);
      });
  }

  toggleButtonState(cardId, isLiked) {
    const apiUrl = `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`;
    console.log("thisisis");

    const requestOptions = {
      method: isLiked ? "DELETE" : "PUT",
      headers: this.headers,
    };

    return fetch(apiUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Card like status updated successfully:", data);
        return data;
      })
      .catch((error) => {
        console.error("Error updating card like status:", error);
        throw error;
      });
  }

  // deleteCard(resource) {
  //   const apiUrl = `${this.baseUrl}/cards/${resource}`;

  //   const requestOptions = {
  //     method: "DELETE",
  //     headers: this.headers,
  //   };

  //   return fetch(apiUrl, requestOptions)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       console.log("Resource deleted successfully");
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       throw error;
  //     });
  // }

  getCardInfo(nameToFind, linkToFind, apiDelete = false, toggleButton = false) {
    const apiUrl = `${this.baseUrl}/cards`;

    const requestOptions = {
      method: "GET",
      headers: this.headers,
    };

    return fetch(apiUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        const reversedData = [...data].reverse();
        console.log(data);
        const lastIndex = reversedData.findIndex(
          (user) => user.name === nameToFind && user.link === linkToFind
        );

        if (lastIndex !== -1) {
          const lastInstance = data[data.length - 1 - lastIndex];
          console.log("Last instance found:", lastInstance);
          if (apiDelete) {
            this.deleteCard(lastInstance._id);
          }
          console.log(lastInstance.isLiked);
          if (toggleButton) {
            this.toggleButtonState(lastInstance._id, lastInstance.isLiked);
          }
        } else {
          console.log("No instance found with the specified name and link.");
          return undefined;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  }

  addCardInfo(name, description, addCardMethod) {
    const apiUrl = `${this.baseUrl}/cards`;
    const requestOptions = {
      method: "POST",
      headers: this.headers,
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
        addCardMethod(data["name"], data["link"]);
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
