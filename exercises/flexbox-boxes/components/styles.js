import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const commonStyles = StyleSheet.create({
	container: {
		margin: 'auto',
		padding: 20,
	},
	box: {
		padding: 20,
		marginVertical: 5,
		marginHorizontal: 2,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'blue',
	},
	firstBox: {
		width: '100%',
	},
	notFirstBox: {
		flex: 1,
	},
});

const styles = (screenWidth) => StyleSheet.create({
	boxes: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		margin: 1,
	},
	two: {
		width: '100%',
		flexDirection: 'row',
	},
	twoColumn: {
		flexDirection: 'column',
	},
	boxesColumn: {
		flexDirection: screenWidth <= 768 ? 'column' : 'row',
	},
	box: commonStyles.box,
	firstBox: commonStyles.firstBox,
	notFirstBox: commonStyles.notFirstBox,
	container: commonStyles.container,
});

export default styles;
