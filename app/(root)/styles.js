import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    navbar: {
        marginTop: 40,
        color: "black",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "900",
    },
    imageContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    image: {
        width: windowWidth * 0.33,
        height: windowWidth * 0.33,
        borderWidth: 1,
        borderColor: "white",
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    modalImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
    profileIcon: {
        padding: 10,
      },
    addIcon: {
        padding: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        textAlign: 'center',
      },

});