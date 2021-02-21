export class UserInfo {
  constructor({ nameSelector, infoSelector,avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    const user = {
      name: this._name.textContent,
      info: this._info.textContent,
    };

    return user;
  }
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.about;
  }
}
