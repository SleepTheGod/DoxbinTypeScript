import { z } from "zod"
import { CONTENT_LIMITS } from "./constants"

export const pasteSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(CONTENT_LIMITS.TITLE_MAX_LENGTH, `Title must be ${CONTENT_LIMITS.TITLE_MAX_LENGTH} characters or less`)
    .trim(),
  content: z
    .string()
    .min(1, "Content is required")
    .max(CONTENT_LIMITS.CONTENT_MAX_LENGTH, `Content must be ${CONTENT_LIMITS.CONTENT_MAX_LENGTH} characters or less`)
    .trim(),
})

export const searchSchema = z.object({
  q: z
    .string()
    .min(
      CONTENT_LIMITS.SEARCH_QUERY_MIN_LENGTH,
      `Search query must be at least ${CONTENT_LIMITS.SEARCH_QUERY_MIN_LENGTH} characters`,
    )
    .max(
      CONTENT_LIMITS.SEARCH_QUERY_MAX_LENGTH,
      `Search query must be ${CONTENT_LIMITS.SEARCH_QUERY_MAX_LENGTH} characters or less`,
    )
    .trim(),
  limit: z.number().int().positive().max(50).optional().default(50),
})

export const paginationSchema = z.object({
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(200).optional().default(150),
})

export type PasteInput = z.infer<typeof pasteSchema>
export type SearchInput = z.infer<typeof searchSchema>
export type PaginationInput = z.infer<typeof paginationSchema>
