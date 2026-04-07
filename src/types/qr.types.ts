export type DotType =
  | 'square'
  | 'rounded'
  | 'dots'
  | 'classy'
  | 'classy-rounded'
  | 'extra-rounded';

export type CornerSquareType = 'square' | 'extra-rounded' | 'dot';
export type CornerDotType = 'square' | 'dot';
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QrOptions {
  url: string;
  width: number;
  margin: number;
  dotType: DotType;
  cornerSquareType: CornerSquareType;
  cornerDotType: CornerDotType;
  fgColor: string;
  bgColor: string; // hex or 'transparent'
  errorLevel: ErrorCorrectionLevel;
  logoDataUrl: string | null;
  logoSizeRatio: number; // 0.2–0.4
}

export const DEFAULT_QR_OPTIONS: QrOptions = {
  url: '',
  width: 300,
  margin: 10,
  dotType: 'rounded',
  cornerSquareType: 'extra-rounded',
  cornerDotType: 'dot',
  fgColor: '#000000',
  bgColor: '#ffffff',
  errorLevel: 'M',
  logoDataUrl: null,
  logoSizeRatio: 0.3,
};
