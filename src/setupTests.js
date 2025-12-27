// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// MapLibre (used for the Vietmap basemap) expects TextDecoder/TextEncoder in the test environment
// when loading modules. JSDOM doesn't provide them by default, so we polyfill from Node's util.
import { TextDecoder, TextEncoder } from 'util';

if (!global.TextDecoder) {
  global.TextDecoder = TextDecoder;
}

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}

if (!global.URL.createObjectURL) {
  global.URL.createObjectURL = () => "";
}
