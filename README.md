# Mobile Shop App (Expo React Native)

## App tour
- UI-first mobile shop app built with Expo SDK 50, JavaScript, and nativewind (Tailwind for React Native).
- Features Home and Product Detail screens, context state, theming, and pixel-perfect UI.
- Each file includes a code tour and inline comments for learning.
- If some information is missing, please raise a PR or reach out to me

## Setup
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the app:**
   ```sh
   npx expo start
   ```
3. **Data:** Uses static mock data in `/data/products.json`.

## Folder map
```
/components   # Reusable UI components (Header, ProductCard, etc)
/context      # Theme and shop state (Context + useReducer)
/data         # Mock product data (products.json)
/screens      # HomeScreen, ProductDetailScreen
/assets       # Product images, icons
App.js        # App entry, navigation, providers
index.js      # Expo entry point
```

## Screenshots
- Light and dark themes, iOS & Android (see `/screenshots` )
- UI :
-    Home :
-    ![light-background](https://github.com/user-attachments/assets/d7cf0d8e-3604-47e7-a091-c7a946f92fde)
-    ![dark-background](https://github.com/user-attachments/assets/c1ea97c6-a526-4fe5-8e59-b8824a7363cd)
-    Product Details :
-    ![light-productDetails](https://github.com/user-attachments/assets/686bf0ad-c79a-4c27-92fd-377c94e947cf)
-    ![dark-productDetails](https://github.com/user-attachments/assets/f34104b4-0206-409f-b53b-7afdf52834c9)



## Teaching: How it works
- **Navigation:** Stack navigation (React Navigation 6) links Home and Product Detail screens.
- **State:** React Context + useReducer manage theme, favourites, cart, and product selections.
- **Theme:** Light/dark themes, toggle in header, persisted with expo-secure-store.
- **UI:** All UI is built with nativewind (Tailwind utilities) and custom styles for pixel-perfect fidelity.
- **Performance:** FlatList for grid, lazy image loading, haptics on major actions.
- **Animations:** Shared-element style fade-in for product detail hero image.
- **Accessibility:** All touchables have accessibilityRole, screens use SafeAreaView.

## API
- Replace `/data/products.json` with another API by updating data loading logic in HomeScreen.

---

**Every file is documented with a code tour and inline comments. Review the code for detailed explanations.** 
