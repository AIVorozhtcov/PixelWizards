import { ZodObject, ZodRawShape } from 'zod';

export default async function resultFromSchema<
  SafeSchema extends ZodRawShape,
  ErrorSchema extends ZodRawShape
>(
  safeSchema: ZodObject<SafeSchema>,
  errorSchema: ZodObject<ErrorSchema>,
  response: Response
) {
  const result = safeSchema.safeParse(await response.json());

  if (!result.success) {
    return errorSchema.parse(result);
  } else {
    return result.data;
  }
}
