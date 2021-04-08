const { ipcMain, session } = require('electron');

ipcMain.on('logout', (event, arguments) => {
	console.debug(session.defaultSession);
	session.defaultSession.clearStorageData();
})