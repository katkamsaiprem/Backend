import * as wishlistRepository from "./wishlist.repository.js"
import { CreateWishlistInput, DeleteWishlistInput } from "./wishlist.schema.zod.js";
import { AppError } from "../middlewares/globalErrorHandler.middlewares.js";


export const createWishlist = async ({ wishlistedItemId }: CreateWishlistInput) => {

    const createdItem = await wishlistRepository.createWhishListItem(wishlistedItemId)

    return createdItem;


}

export const deleteWishlist = async ({ id }: DeleteWishlistInput) => {
    const deletedItem = await wishlistRepository.deleteWishlistItem(id);

    
    if (!deletedItem) {
        throw new AppError("Wishlist item not found", 404);
    }

    return deletedItem;
}

export const getAllWishlistItems = async () => {
    const items = await wishlistRepository.getWishlistItems();
    return items;
}