
const obj = {name: "obbie", ocupation: "Crypto Daytrader"};

class Api {
  //refactoring needed
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  test(){
    const obj2 = {residance: "USA", hobby: "WallSteet Bets"}
    obj2.__proto__ = obj

    return obj2.name
  }

  deleteCard(cardId, handler) {
    return fetch(`https://around-api.en.tripleten-services.com/v1/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Data deleted successfully");
        return response
      })

      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  }

  getInitialcards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "GET",
      headers: this.headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // console.log(response.json())
        return response.json();
      })
      .catch((error) => {
        console.error("Error updating avatar:", error);
      });
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

  preformToggle(cardId, isLiked, fillButton, vacateButton) {
    // specify that its a function

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
        console.log("Card like status updated successfully:", data.isLiked);
        console.log(typeof data.isLiked);
        if (data.isLiked) {
          console.log("well well");
          fillButton(); // two handlers
        } else {
          vacateButton();
        }
        return data;
      })
      .catch((error) => {
        console.error("Error updating card like status:", error);
        throw error;
      });
  }

  toggleHeartIcon(id, fillButton, vacateButton) {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "GET",
      headers: this.headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response;
      })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        res.forEach((element) => {
          if (element._id == id) {
            this.preformToggle(
              element._id,
              element.isLiked,
              fillButton,
              vacateButton
            );
            return element._id;
          }
        });
      })
      .catch((error) => {
        console.error("Error updating avatar:", error);
      });
  }

  addCardInfo(name, description, addCardMethod) {
    const apiUrl = `${this.baseUrl}/cards`;
    const requestOptions = {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name: name, link: description }),
    };

    return fetch(apiUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("api workie workie")
        addCardMethod(data["name"], data["link"], data["_id"]);
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
