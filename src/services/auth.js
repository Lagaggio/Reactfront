export const TOKEN = "credentials";
export const isAuthenticated = () => {
	console.log(localStorage.getItem(TOKEN));
	return localStorage.getItem(TOKEN);
}
export const getToken = () => localStorage.getItem(TOKEN);
export const login = token => {
	localStorage.setItem(TOKEN, token);
}
export const logout = () => {
	localStorage.removeItem(TOKEN);
}
