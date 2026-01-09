import { cn, formatCurrency, formatDate, slugify, calculateReadingTime } from '@/lib/utils'

describe('Utils', () => {
  describe('cn', () => {
    it('merges class names correctly', () => {
      expect(cn('foo', 'bar')).toBe('foo bar')
      expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
    })
  })

  describe('formatCurrency', () => {
    it('formats currency correctly', () => {
      expect(formatCurrency(100)).toContain('£')
      expect(formatCurrency(100)).toContain('100')
    })
  })

  describe('formatDate', () => {
    it('formats dates correctly', () => {
      const date = new Date('2024-01-15')
      const formatted = formatDate(date)
      expect(formatted).toContain('2024')
    })
  })

  describe('slugify', () => {
    it('converts text to slug', () => {
      expect(slugify('Hello World')).toBe('hello-world')
      expect(slugify('Test & Example!')).toBe('test-example')
    })
  })

  describe('calculateReadingTime', () => {
    it('calculates reading time', () => {
      const content = 'word '.repeat(400) // 400 words
      const result = calculateReadingTime(content)
      expect(result).toBeGreaterThanOrEqual(2)
      expect(result).toBeLessThanOrEqual(3)
    })
  })
})
