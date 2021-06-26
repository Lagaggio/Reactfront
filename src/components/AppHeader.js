import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const AppHeader = () => (
	<AppBar position="static">
		<Toolbar>
			<Typography variant="h6">
				Teste do React
			</Typography>
		</Toolbar>
	</AppBar>
);

export default AppHeader;
