import {ColorModeScript} from '@chakra-ui/react';
import Document, {Head, Html, Main, NextScript} from 'next/document';
import React from 'react';

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head />
				<body>
					<ColorModeScript initialColorMode='system' />

					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
