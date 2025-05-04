import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { doc, setDoc, getDoc, arrayUnion, updateDoc } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
  };  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);



export const FavoriteService = {

    addFavorite: async (country: { cca3: string; name: string; flags: string; capital: string; region: string; population: number; }) => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error('User not logged in');
          return false;
        }
        
        const userDocRef = doc(db, 'userFavorites', user.uid);
        const userDoc = await getDoc(userDocRef);
        
        // Store the country object with minimal needed properties
        const countryData = {
          cca3: country.cca3,
          name: country.name,
          flags: country.flags,
          capital: country.capital,
          region: country.region,
          population: country.population
        };
        
        if (!userDoc.exists()) {
          // Create user favorites document if it doesn't exist
          await setDoc(userDocRef, {
            userId: user.uid,
            favorites: [countryData]
          });
        } else {
          // Check if country already exists in favorites to avoid duplicates
          const favorites: { cca3: string; name: string; flags: string; capital: string; region: string; population: number; }[] = userDoc.data().favorites || [];
          const existingIndex = favorites.findIndex(item => item.cca3 === country.cca3);
          
          if (existingIndex === -1) {
            // Add to favorites if not already present
            await updateDoc(userDocRef, {
              favorites: arrayUnion(countryData)
            });
          }
        }
        
        return true;
      } catch (error) {
        console.error('Error adding favorite:', error);
        return false;
      }
    },
    

    removeFavorite: async (countryId: string) => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error('User not logged in');
          return false;
        }
        
        const userDocRef = doc(db, 'userFavorites', user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const favorites = userDoc.data().favorites || [];
          const updatedFavorites = favorites.filter((country: { cca3: string; name: string; flags: string; capital: string; region: string; population: number; }) => country.cca3 !== countryId);
          
          await updateDoc(userDocRef, {
            favorites: updatedFavorites
          });
        }
        
        return true;
      } catch (error) {
        console.error('Error removing favorite:', error);
        return false;
      }
    },
    

    getFavorites: async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error('User not logged in');
          return [];
        }
        
        const userDocRef = doc(db, 'userFavorites', user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          return userDoc.data().favorites || [];
        } else {
          return [];
        }
      } catch (error) {
        console.error('Error getting favorites:', error);
        return [];
      }
    },


    isFavorite: async (countryId: string) => {
      try {
        const user = auth.currentUser;
        if (!user) {
          return false;
        }
        
        const userDocRef = doc(db, 'userFavorites', user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const favorites = userDoc.data().favorites || [];
          return favorites.some((country: { cca3: string; name: string; flags: string; capital: string; region: string; population: number; }) => country.cca3 === countryId);
        }
        
        return false;
      } catch (error) {
        console.error('Error checking favorite status:', error);
        return false;
      }
    }
  };