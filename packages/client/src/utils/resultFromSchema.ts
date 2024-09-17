import { ZodArray, ZodObject, ZodRawShape } from 'zod';

export async function resultFromSchema<
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

export async function resultFromArraySchema<
  SafeSchema extends ZodRawShape,
  ErrorSchema extends ZodRawShape
>(
  safeSchema: ZodArray<ZodObject<SafeSchema>>,
  errorSchema: ZodObject<ErrorSchema>,
  response: Response
) {
  const data = await response.json();
  const result = safeSchema.safeParse(data);

  if (!result.success) {
    return errorSchema.parse(result);
  } else {
    return result.data;
  }
}
