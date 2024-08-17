import { View, Text, Dimensions } from 'react-native';
import getStyles from './components/styles';

const App = () => {
	const { width } = Dimensions.get('window');
	const styles = getStyles(width);

	return (
		<View style={styles.container}>
			<View style={styles.boxes}>
				<View style={[styles.box, styles.firstBox]}>
					<Text>A</Text>
				</View>
			</View>
			<View style={[styles.two, width <= 768 && styles.twoColumn]}>
				<View style={styles.boxes}>
					<View style={[styles.box, styles.firstBox]}>
						<Text>B</Text>
					</View>
					<View style={[styles.box, styles.notFirstBox]}>
						<Text>C</Text>
					</View>
					<View style={[styles.box, styles.notFirstBox]}>
						<Text>D</Text>
					</View>
					<View style={[styles.box, styles.notFirstBox]}>
						<Text>E</Text>
					</View>
				</View>
				<View style={styles.boxes}>
					<View style={[styles.box, styles.notFirstBox]}>
						<Text>F</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default App;
