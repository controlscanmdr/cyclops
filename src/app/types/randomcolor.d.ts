declare module 'randomcolor' {

  function randomColor(options?: randomColor.RandomColorOptions): string[] | string;

  namespace randomColor {
    interface RandomColorOptions {
      hue?: number | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'monochrome' | 'random';
      luminosity?: 'bright' | 'light' | 'dark' | 'random';
      count?: number;
      seed?: number | string;
      format?: 'hsvArray' | 'hslArray' | 'hsl' | 'hsla' | 'rgbArray' | 'rgb' | 'rgba' | 'hex';
    }
  }

  export = randomColor;
}
