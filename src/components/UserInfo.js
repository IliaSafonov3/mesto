export class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
  }
  getUserInfo() {
    const user = {
      name: this._name.textContent,
      info: this._info.textContent,
    };

    return user;
  }
  setUserInfo(inputs) {
    this._name.textContent = inputs.name;
    this._info.textContent = inputs.self;
  }
}
