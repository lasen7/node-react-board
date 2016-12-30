const storage = {};

storage.set = (key, token) => {
  localStorage[key] = token;
}

storage.get = (key) => {
  if (!localStorage[key]) {
    return undefined;
  }

  return localStorage[key];
}

storage.remove = (key) => {
  if (localStorage[key]) {
    localStorage.removeItem(key);
  }
}

export default storage;