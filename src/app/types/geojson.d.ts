declare namespace GeoJSONConverter {
  interface GeoJSONConverterOptions {
    Point?: string | string[];
    MultiPoint?: string;
    LineString?: string;
    MultiLineString?: string;
    Polygon?: string;
    MultiPolygon?: string;
    GeoJSON?: string;
    include?: string[];
    extra?: Object;
    extraGlobal?: Object;
  }

  interface GeoJSONConverter {
    defaults: GeoJSONConverterOptions;
    version: string;
    parse<T extends GeoJSON.GeometryObject>
      (data: any[], options: GeoJSONConverterOptions):
      GeoJSON.FeatureCollection<T>;
  }
}

declare let geojson: GeoJSONConverter.GeoJSONConverter;

declare module 'geojson' {
  export = geojson;
}
