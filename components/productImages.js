// - Maps product image filenames to require() calls for use in ProductCard and ProductDetailScreen.
// - This is necessary because React Native does not support dynamic require() and will not let local string in the JSON data even if it is just in developement mode.
// - Use the filename in products.json and look up the require here.
export const productImages = {
  // Each key is a filename from products.json, value is a static require
  "nike-air-jordan.png": require("../assets/images/nike-air-jordan.png"),
  "nike-air-max-side.jpeg": require("../assets/images/nike-air-max-side.jpeg"),
  "nike-blazer-low-pair-wht.jpeg": require("../assets/images/nike-blazer-low-pair-wht.jpeg"),
  "nike-react-infinity.jpeg": require("../assets/images/nike-react-infinity.jpeg"),
  "nike-air-force-1.jpeg": require("../assets/images/nike-air-force-1.jpeg"),
  "nike-waffle-1.jpeg": require("../assets/images/nike-waffle-1.jpeg"),
  "nike-zoom-x-vaporfly.jpeg": require("../assets/images/nike-zoom-x-vaporfly.jpeg"),
  "nike-sb-dunk-low.jpeg": require("../assets/images/nike-sb-dunk-low.jpeg"),
  "nike-court-vision.jpeg": require("../assets/images/nike-court-vision.jpeg"),
  "nike-free-rn-5.jpeg": require("../assets/images/nike-free-rn-5.jpeg"),
  "nike-air-zoom-pegasus.jpeg": require("../assets/images/nike-air-zoom-pegasus.jpeg"),
  "nike-daybreak.jpeg": require("../assets/images/nike-daybreak.jpeg")
}; 