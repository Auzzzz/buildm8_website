
import { z } from "zod";

export const newPropertySchema = z.object({

    property_address: z.string().min(1, {message: "A address is required.",}),
    property_suburb: z.string().min(1, {message: "A suburb is required.",}),
    property_state: z.string().min(1, {message: "A state is required.",}),
    property_postcode: z.string().min(4, {message: "Postcode must be 4 characters.",}).max(4, {message: "Postcode must be 4 characters.",}).regex(/^(0[289][0-9]{2}|[1-9][0-9]{3})$/, {message: "Postcode is invalid.",}),
    property_nickname: z.string().min(3, {message: "A nickname is required.",}),
    property_type: z.enum(["House", "Unit", "Townhouse", "Apartment", "Villa", "Duplex", "Studio", "Farm", "Warehouse", "Commercial", "Industrial", "Store", "Other"], {
        message: "Please select a property type.",
        }),
    property_use: z.enum(["Owner Occupied", "Rental Property", "Investment Property", "Holiday Home", "Commercial", "Industrial", "Other"], {
        message: "Please select a residence type.",
        }),

})