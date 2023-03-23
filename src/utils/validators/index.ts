import { z } from "zod";

export const cattleSchema = z
  .object({
    type: z.string().min(1, "Please select type"),
    breed: z.string().optional(),
    pregnancy: z.number().optional(),
    milk: z.number().optional(),
    price: z.number().positive("Please enter price"), //({ required_error: "Price is required" }).positive(),
    //   photos: z.array(typeof window === "undefined" ? z.any() : z.instanceof(File)),
    address: z.late.object(() => ({
      display: z.string().min(3),
      location: z.object({
        type: z.string(),
        coordinates: z.array(z.number()),
      }),
    })),
    milkCapacity: z.number().optional(),
    bargain: z.boolean(),
    isPregnant: z.boolean().optional(),
    pregnancyAge: z.number().optional(),
    baby: z.boolean().optional(),
    moreDetails: z.string().optional(),
    animalAge: z.number().positive(),
  })
  .required({
    type: true,
    price: true,
    bargain: true,
    address: true,
  });

export const validateCattle = (input: unknown) => cattleSchema.safeParse(input);

export const userSchema = z
  .object({
    name: z.string().min(4, "Name must contain at least 4 character"),
    phone: z
      .string()
      .regex(
        /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        "Invalid phone number"
      ),
    avatar:
      typeof window === "undefined"
        ? z.any()
        : z.instanceof(FileList).optional(),
  })
  .required({
    name: true,
    phone: true,
  });

export const validateUser = (user: unknown) => userSchema.safeParse(user);
