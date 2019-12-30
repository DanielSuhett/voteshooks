export const TOKEN_KEY = "key"

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setAuth = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const isAuth = () => {
    return localStorage.getItem(TOKEN_KEY) != null;
};

export const logout = (props) => {
    localStorage.clear(TOKEN_KEY);
}