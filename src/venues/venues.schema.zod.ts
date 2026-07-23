import { z } from "zod";


// Validation rules for creating a single venue

export const createVenueSchema = z.object({
    body: z.object({

        venueId: z
            .string({ error: "venueId is required" })
            .min(1, "venueId cannot be empty")
            .max(20, "venueId cannot exceed 20 characters")
            .trim(),

        name: z
            .string({ error: "name is required" })
            .min(2, "Name must be at least 2 characters")
            .max(150, "Name cannot exceed 150 characters")
            .trim(),

        sport: z
            .string({ error: "sport is required" })
            .min(2, "Sport must be at least 2 characters")
            .max(100, "Sport cannot exceed 100 characters")
            .trim(),

        image: z
            .string({ error: "image URL is required" })
            .url("image must be a valid URL"),

        address: z
            .string({ error: "address is required" })
            .min(2, "Address must be at least 2 characters")
            .max(200, "Address cannot exceed 200 characters")
            .trim(),

        city: z
            .string({ error: "city is required" })
            .min(2, "City must be at least 2 characters")
            .max(100, "City cannot exceed 100 characters")
            .trim(),

        state: z
            .string({ error: "state is required" })
            .min(2, "State must be at least 2 characters")
            .max(100, "State cannot exceed 100 characters")
            .trim(),

        rating: z
            .number({ error: "rating must be a number" })
            .min(1, "Rating must be at least 1")
            .max(5, "Rating cannot exceed 5"),

        pricePerHour: z
            .number({ error: "pricePerHour must be a number" })
            .int("pricePerHour must be a whole number")
            .positive("pricePerHour must be a positive number"),

        capacity: z
            .number({ error: "capacity must be a number" })
            .int("capacity must be a whole number")
            .positive("capacity must be a positive number"),

        numberOfCourts: z
            .number({ error: "numberOfCourts must be a number" })
            .int("numberOfCourts must be a whole number")
            .min(1, "Venue must have at least 1 court"),

        courtType: z
            .string({ error: "courtType is required" })
            .min(2, "courtType must be at least 2 characters")
            .max(100, "courtType cannot exceed 100 characters")
            .trim(),

        amenities: z
            .array(z.string().min(1, "Amenity cannot be empty").trim(), {
                error: "amenities must be an array of strings",
            })
            .min(1, "Provide at least one amenity"),

        isCancelable: z.boolean({
            error: "isCancelable must be a boolean",
        }),

        venueOwner: z
            .string({ error: "venueOwner is required" })
            .min(2, "venueOwner must be at least 2 characters")
            .max(100, "venueOwner cannot exceed 100 characters")
            .trim(),

        ownerJoinedOn: z
            .string({ error: "ownerJoinedOn is required" })
            .min(1, "ownerJoinedOn cannot be empty")
            .max(30, "ownerJoinedOn cannot exceed 30 characters")
            .trim(),

    }),
});


// Validation rules for creating multiple venues at once

export const bulkCreateVenuesSchema = z.object({
    body: z.array(createVenueSchema.shape.body).min(1, "Provide at least one venue"),
});


// Validate the id parameter from the URL

export const getVenueByIdSchema = z.object({
    params: z.object({
        id: z
            .string({ error: "id param is required" })
            .regex(/^\d+$/, "id must be a positive integer")
            .trim(),
    }),
});


// Validate all optional filter + pagination query params

export const getVenuesQuerySchema = z.object({
    query: z.object({

        sport: z
            .string()
            .min(1)
            .max(100)
            .trim()
            .optional(),

        name: z
            .string()
            .min(1)
            .max(150)
            .trim()
            .optional(),

        minPrice: z
            .string()
            .regex(/^\d+$/, "minPrice must be a positive integer")
            .transform(Number)
            .optional(),

        maxPrice: z
            .string()
            .regex(/^\d+$/, "maxPrice must be a positive integer")
            .transform(Number)
            .optional(),

        capacity: z
            .string()
            .regex(/^\d+$/, "capacity must be a positive integer")
            .transform(Number)
            .optional(),

        numberOfCourts: z
            .string()
            .regex(/^\d+$/, "numberOfCourts must be a positive integer")
            .transform(Number)
            .optional(),

        courtType: z
            .string()
            .min(1)
            .max(100)
            .trim()
            .optional(),

        minRating: z
            .string()
            .regex(/^\d+(\.\d+)?$/, "minRating must be a number")
            .transform(Number)
            .optional(),

        isCancelable: z
            .enum(["true", "false"])
            .transform((v) => v === "true")
            .optional(),

        page: z
            .string()
            .regex(/^\d+$/, "page must be a positive integer")
            .transform(Number)
            .catch(1),

        limit: z
            .string()
            .regex(/^\d+$/, "limit must be a positive integer")
            .transform(Number)
            .catch(16),

    }),
});


// Export generated TypeScript types so we don't have to write them manually

export type CreateVenueInput = z.infer<typeof createVenueSchema>["body"];

export type GetVenueByIdInput = z.infer<typeof getVenueByIdSchema>["params"];

export type GetVenuesQueryInput = z.infer<typeof getVenuesQuerySchema>["query"];

export type BulkCreateVenuesInput = z.infer<typeof bulkCreateVenuesSchema>["body"];
