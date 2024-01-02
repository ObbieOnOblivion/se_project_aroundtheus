
class Api {

  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  _checkResponse(response) {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  }

  deleteCard(cardId) {
    const url = `${this.baseUrl}/cards/${cardId}`;
    const options = {
      method: "DELETE",
      headers: this.headers,
    };

    return this._request(url, options);
  }

  getInitialcards() {
    const url = `${this.baseUrl}/cards`;
    const options = {
      method: "GET",
      headers: this.headers,
    };

    return this._request(url, options).then((response) => {
      return response.json();
    });
  }

  getProfileInfo() {
    const url = `${this.baseUrl}/users/me`;
    const options = {
      method: "GET",
      headers: this.headers,
    };

    return this._request(url, options).then((data) => {
      return data.json();
    });
  }

  changeAvatar(link) {
    const url = `${this.baseUrl}/users/me/avatar`;
    const options = {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    };

    return this._request(url, options)

      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
  }

  preformToggle(cardId, isLiked, fillButton, vacateButton) {
    // specify that its a function

    const url = `${this.baseUrl}/cards/${cardId}/likes`;
    const options = {
      method: isLiked ? "DELETE" : "PUT",
      headers: this.headers,
    };

    return this._request(url, options)

      .then((response) => {
        return response.json();
      })

      .then((data) => {
        if (data.isLiked) {
          fillButton(); // two handlers
        } else {
          vacateButton();
        }
        return data;
      });
  }

  toggleHeartIcon(id, fillButton, vacateButton) {
    const url = `${this.baseUrl}/cards`;
    const options = {
      method: "GET",
      headers: this.headers,
    };

    return this._request(url, options)
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
          }
        });
      });
  }

  addCardInfo(name, description, addCardMethod) {
    const url = `${this.baseUrl}/cards`;
    const options = {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name: name, link: description }),
    };

    return this._request(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        addCardMethod(data["name"], data["link"], data["_id"]);
        return data;
      });
  }

  setUserInfo(name, about) {
    const patchData = {
      name: name,
      about: about,
    };

    const url = `${this.baseUrl}/users/me`;
    const options = {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(patchData),
    };

    return this._request(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
  }
}

export { Api };
