import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Modal, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import { router, useLocalSearchParams } from 'expo-router';
import { albums } from '@/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const { id } = useLocalSearchParams();
    
    const getImagesAPI = () => {
        const album = albums.find(album => album.id === id);
        return album ? album.images_url : null;
    }

    useEffect(() => {
        const fetchImages = async (imagesApi) => {
            try {
                // AsyncStorage.clear(); 
                // Check AsyncStorage for cached images
                // const cachedImages = await AsyncStorage.getItem('cachedImages');
                // if (cachedImages) {
                //     setImages(JSON.parse(cachedImages));
                // } else {
                    const response = await fetch(imagesApi);
                    const data = await response.json();
        
                    if(data && data.results) {
                        setImages(data.results);
                        // Cache the images in AsyncStorage
                        AsyncStorage.setItem('cachedImages', JSON.stringify(data.results));
                    }     
                // }
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        const imagesApi = getImagesAPI();
        fetchImages(imagesApi);
    }, []);

    const handleImagePress = (url) => {
        setSelectedImage(url)

    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <SafeAreaView>
        <View className='flex flex-row bg-white'>
            <View>
                <Text style={styles.headerTitle}>Projects</Text>
            </View>
            <View>
                <FontAwesome 
                name="plus" 
                size={24} 
                color="#333" 
                onPress={() => console.log('Add Album Pressed')} 
                style={styles.addIcon}
                />
            </View>
            <View>
                <FontAwesome 
                name="user" 
                size={24} 
                color="#333" 
                onPress={() => console.log('Profile Icon Pressed')} 
                style={styles.profileIcon}
                />
            </View>
            <Button
                    title="Camera"
                    onPress={() => {
                        console.log('Navigating to camera-screen...');
                        router.push('/camera-screen');
                    }}
                />
            
        </View>
        <ScrollView>
            <ScrollView>
                <View style={styles.imageContainer}>
                    {/* Display recent images */}
                    {images.map((image) => (
                        <TouchableOpacity key={image?.id} onPress={() => handleImagePress(image?.urls?.raw)}>
                            <Image source={{ uri: image?.urls?.raw }} style={styles.image} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* Image open in full size  */}
            <Modal visible={!!selectedImage} transparent={true} onRequestClose={closeModal}>
                <View style={styles.modalContainer}>
                    <Image source={{ uri: selectedImage }} style={styles.modalImage} />
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* <TouchableOpacity onPress={() => { router.push({ pathname: "/(root)/camera-screen", params: { id: 1} }); }} > */}
                


        </ScrollView>
    </SafeAreaView>
    );
};


export default Gallery;

