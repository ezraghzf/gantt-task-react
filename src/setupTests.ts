// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock createSVGPoint for JSDOM
// @ts-ignore
SVGSVGElement.prototype.createSVGPoint = function () {
  return {
    x: 0,
    y: 0,
    matrixTransform: function () {
      return { x: 0, y: 0 };
    },
  };
};

// Mock getBBox for JSDOM
// @ts-ignore
SVGElement.prototype.getBBox = function () {
  return {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  };
};
