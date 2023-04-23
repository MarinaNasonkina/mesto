export default class UserInfo {
  constructor({ selectorProfileName, selectorProfileAbout }) {
    this._profileName = document.querySelector(selectorProfileName);
    this._profileAbout = document.querySelector(selectorProfileAbout);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
    };
  }

  setUserInfo(data) {
    this._profileName.textContent = data.profileName;
    this._profileAbout.textContent = data.profileAbout;
  }
}
