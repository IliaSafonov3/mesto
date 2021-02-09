export class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._nameSelector = nameSelector;
    this._infoSelector = infoSelector;
  }
  getUserInfo() {
    const user = {
      name: document.querySelector(this._nameSelector).textContent,
      info: document.querySelector(this._infoSelector).textContent,
    };
    console.log(user);

    return user;
  }
  setUserInfo(inputs) {
    document.querySelector(this._nameSelector).textContent = inputs.name;
    document.querySelector(this._infoSelector).textContent = inputs.self;
  }
}
