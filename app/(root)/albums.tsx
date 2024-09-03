

import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { albums } from '@/constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const AlbumListScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
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
        </View>

      {/* Album List */}
      <FlatList
        data={albums}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.albumTile} 
            onPress={() => { 
              router.push({ pathname: "/(root)/gallery", params: { id: item.id } });
            }}
          >
            <View style={styles.contentContainer}>
              <FontAwesome name="folder" size={40} color="#FFD700" style={styles.icon} />
              <View style={styles.infoContainer}>
                <Text style={styles.albumName}>{item.name || 'Unknown Album'}</Text>
                <Text style={styles.albumInfo}>
                  Last updated: {item.lastUpdated ? String(item.lastUpdated) : 'N/A'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default AlbumListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  profileIcon: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  addIcon: {
    padding: 10,
  },
  albumTile: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  albumName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  albumInfo: {
    fontSize: 14,
    color: '#666',
  },
});
