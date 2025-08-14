import { z } from 'zod';

const requiredString = (fieldName: string) => z
    .string({ message: `${fieldName} is required`})
    .min(1, {message: `${fieldName} is required`}
)

export const eventSchema = z.object({
    title: requiredString('Title'),
    description: requiredString('Description'),
    category: requiredString('Category'),
    date: z.coerce.date({
        message: 'Date is required'
    }),
    venue: requiredString('Venue'),
    city: requiredString('City'),
})

export type EventSchema = z.infer<typeof eventSchema>;