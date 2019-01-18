import * as path from 'path';

export const isProd = process.env.NODE_ENV === 'production';
export const ROOT = path.resolve(__dirname, '../');
