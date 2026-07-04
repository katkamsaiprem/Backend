import * as whishlistRepository from "./whishlist.repository.js"
import { CreateWhishlistInput, DeleteWhishlistInput } from "@/types/index.js";
import { AppError } from "@/middlewares/globalErrorHandler.middlewares.js";


export const createWhishlist = async ({ whishlistedItemId }: CreateWhishlistInput) => {

    const createdItem = await whishlistRepository.createWhishListItem(whishlistedItemId)

    return createdItem;


}

export const deleteWhishlist = async ({ id }: DeleteWhishlistInput) => {
    const deletedItem = await whishlistRepository.deleteWhishlistItem(id);

    
    if (!deletedItem) {
        throw new AppError("Whishlist item not found", 404);
    }

    return deletedItem;
}

export const getAllWhishlistItems = async () => {
    const items = await whishlistRepository.getWhishlistItems();
    return items;
}