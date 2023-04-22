export default class UserInfo {
  constructor({ selectorProfileName, selectorProfileAbout }) {
    this._profileName = document.querySelector(selectorProfileName);
    this._profileAbout = document.querySelector(selectorProfileAbout);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
    };
    return this._userInfo;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.profileName;
    this._profileAbout.textContent = data.profileAbout;
  }
}
