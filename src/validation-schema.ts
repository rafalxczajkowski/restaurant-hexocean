import { z } from 'zod'

const schema = z.object({
    name: z.string().min(3, 'Must contain at least 3 characters'),
    preparation_time: z.coerce
      .string().regex(/^(?:(?:(\d\d):)([0-5]\d):)([0-5]?\d)$/gm, 'Must be in HH:MM:SS format')
      .min(1, 'Must be a positive number'),
    type: z.string().min(1, 'Must be selected'),
    no_of_slices: z.coerce
      .number({ invalid_type_error: 'Must be a number' })
      .positive('Must be a positive number')
      .multipleOf(1, 'Must be a whole number')
      .optional(),
    diameter: z.coerce
      .number({ invalid_type_error: 'Must be a number' })
      .positive('Must be a positive number')
      .optional(),
    spiceness_scale: z.coerce
      .number({ invalid_type_error: 'Must be a number' })
      .min(1, 'Must be a number between 1 and 10')
      .max(10, 'Must be a number between 1 and 10')
      .multipleOf(1, 'Must be a whole number')
      .optional(),
    slices_of_bread: z.coerce
      .number({ invalid_type_error: 'Must be a number' })
      .positive('Must be a positive number')
      .multipleOf(1, 'Must be a whole number')
      .optional(),
  })

  export default schema