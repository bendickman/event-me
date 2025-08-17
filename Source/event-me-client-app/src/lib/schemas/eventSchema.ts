import { z } from 'zod';
import { requiredString } from '../util/util';

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