'use client';
import * as React from 'react';
import { PrimeReactContext } from 'primereactnew/dist/api';
import { ComponentBase, useHandleStyle } from 'primereactnew/dist/componentbase';
import { useMergeProps } from 'primereactnew/dist/hooks';
import { classNames } from 'primereactnew/dist/utils';

var classes = {
  root: 'p-progress-spinner',
  spinner: 'p-progress-spinner-svg',
  circle: 'p-progress-spinner-circle'
};
var styles = "\n@layer primereact {\n    .p-progress-spinner {\n        position: relative;\n        margin: 0 auto;\n        width: 100px;\n        height: 100px;\n        display: inline-block;\n    }\n    \n    .p-progress-spinner::before {\n        content: '';\n        display: block;\n        padding-top: 100%;\n    }\n    \n    .p-progress-spinner-svg {\n        animation: p-progress-spinner-rotate 2s linear infinite;\n        height: 100%;\n        transform-origin: center center;\n        width: 100%;\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        left: 0;\n        right: 0;\n        margin: auto;\n    }\n    \n    .p-progress-spinner-circle {\n        stroke-dasharray: 89, 200;\n        stroke-dashoffset: 0;\n        stroke: #d62d20;\n        animation: p-progress-spinner-dash 1.5s ease-in-out infinite, p-progress-spinner-color 6s ease-in-out infinite;\n        stroke-linecap: round;\n    }\n}\n\n@keyframes p-progress-spinner-rotate {\n    100% {\n        transform: rotate(360deg);\n    }\n}\n\n@keyframes p-progress-spinner-dash {\n    0% {\n        stroke-dasharray: 1, 200;\n        stroke-dashoffset: 0;\n    }\n    50% {\n        stroke-dasharray: 89, 200;\n        stroke-dashoffset: -35px;\n    }\n    100% {\n        stroke-dasharray: 89, 200;\n        stroke-dashoffset: -124px;\n    }\n}\n\n@keyframes p-progress-spinner-color {\n    100%,\n    0% {\n        stroke: #d62d20;\n    }\n    40% {\n        stroke: #0057e7;\n    }\n    66% {\n        stroke: #008744;\n    }\n    80%,\n    90% {\n        stroke: #ffa700;\n    }\n}\n";
var inlineStyles = {
  spinner: function spinner(_ref) {
    var props = _ref.props;
    return {
      animationDuration: props.animationDuration
    };
  }
};
var ProgressSpinnerBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'ProgressSpinner',
    id: null,
    style: null,
    className: null,
    strokeWidth: '2',
    fill: 'none',
    animationDuration: '2s',
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles,
    inlineStyles: inlineStyles
  }
});

var ProgressSpinner = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = ProgressSpinnerBase.getProps(inProps, context);
  var elementRef = React.useRef(null);
  var _ProgressSpinnerBase$ = ProgressSpinnerBase.setMetaData({
      props: props
    }),
    ptm = _ProgressSpinnerBase$.ptm,
    cx = _ProgressSpinnerBase$.cx,
    sx = _ProgressSpinnerBase$.sx,
    isUnstyled = _ProgressSpinnerBase$.isUnstyled;
  useHandleStyle(ProgressSpinnerBase.css.styles, isUnstyled, {
    name: 'progressspinner'
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var rootProps = mergeProps({
    id: props.id,
    ref: elementRef,
    style: props.style,
    className: classNames(props.className, cx('root')),
    role: 'progressbar',
    'aria-busy': true
  }, ProgressSpinnerBase.getOtherProps(props), ptm('root'));
  var spinnerProps = mergeProps({
    className: cx('spinner'),
    viewBox: '25 25 50 50',
    style: sx('spinner')
  }, ptm('spinner'));
  var circleProps = mergeProps({
    className: cx('circle'),
    cx: '50',
    cy: '50',
    r: '20',
    fill: props.fill,
    strokeWidth: props.strokeWidth,
    strokeMiterlimit: '10'
  }, ptm('circle'));
  return /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement("svg", spinnerProps, /*#__PURE__*/React.createElement("circle", circleProps)));
}));
ProgressSpinner.displayName = 'ProgressSpinner';

export { ProgressSpinner };
