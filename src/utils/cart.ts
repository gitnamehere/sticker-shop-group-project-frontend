// TODO: add size and quantity
export const addStickerToCart = (sticker_id: number, color: string, material: string, quantity: number) => {
  const cart = getCart();

  cart.push({
    sticker_id,
    color,
    material,
    quantity
  });

  // convert cart into a string and store it
  localStorage.setItem("cart", JSON.stringify(cart));
}

export const getCart = () => {
  const storage = localStorage.getItem("cart");
  let cart = [];

  // since localstorage only stores string values, we'll need to convert it to JSON first
  // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#setting_values_in_storage
  if (storage) cart = JSON.parse(storage);

  return cart
}

export const removeStickerFromCart = (index: number) => {
  const cart = getCart();

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));
}
