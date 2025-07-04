const USER_KEY = 'q_user';

const UserStorageService = {
  saveUser(user) {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser() {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  getUserId() {
    const user = this.getUser();
    return user ? user.id : '';
  },

  getUserRole() {
    const user = this.getUser();
    return user ? user.role : '';
  },

  isAdminLoggedIn() {
    return this.getUserRole() === 'ADMIN';
  },

  isUserLoggedIn() {
    return this.getUserRole() === 'USER';
  },

  signOut() {
    localStorage.removeItem(USER_KEY);
  }
};

export default UserStorageService;
