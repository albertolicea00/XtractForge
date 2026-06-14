import { describe, it, expect } from 'vitest';
import { getThumbnailUrl, formatDuration, formatBytes, parseSpeedToBps } from '../src/lib/format';

describe('formatBytes', () => {
  it('handles zero / falsy', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(undefined)).toBe('0 B');
  });
  it('formats KB/MB/GB', () => {
    expect(formatBytes(1024)).toBe('1 KB');
    expect(formatBytes(1024 * 1024)).toBe('1 MB');
    expect(formatBytes(1536)).toBe('1.5 KB');
  });
});

describe('formatDuration', () => {
  it('mm:ss under an hour', () => {
    expect(formatDuration(0)).toBe('00:00');
    expect(formatDuration(65)).toBe('01:05');
  });
  it('hh:mm:ss over an hour', () => {
    expect(formatDuration(3661)).toBe('01:01:01');
  });
});

describe('parseSpeedToBps', () => {
  it('parses binary and decimal units', () => {
    expect(parseSpeedToBps('1 KiB/s')).toBe(1024);
    expect(parseSpeedToBps('1 KB/s')).toBe(1000);
    expect(parseSpeedToBps('2MiB/s')).toBe(2 * 1024 * 1024);
  });
  it('returns 0 on garbage', () => {
    expect(parseSpeedToBps('')).toBe(0);
    expect(parseSpeedToBps('fast')).toBe(0);
    expect(parseSpeedToBps(null)).toBe(0);
  });
});

describe('getThumbnailUrl', () => {
  it('prefers thumbnail, then last of thumbnails', () => {
    expect(getThumbnailUrl({ thumbnail: 'a' })).toBe('a');
    expect(getThumbnailUrl({ thumbnails: [{ url: 'x' }, { url: 'y' }] })).toBe('y');
    expect(getThumbnailUrl(null)).toBe('');
    expect(getThumbnailUrl({})).toBe('');
  });
});
