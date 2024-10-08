'use client';
import * as React from 'react';
import { PrimeReactContext } from 'primereactnew/dist/api';
import { ComponentBase, useHandleStyle } from 'primereactnew/dist/componentbase';
import { useMergeProps, useMountEffect } from 'primereactnew/dist/hooks';
import { Tooltip } from 'primereactnew/dist/tooltip';
import { classNames, DomHandler, ObjectUtils } from 'primereactnew/dist/utils';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var classes = {
  root: function root(_ref) {
    var props = _ref.props,
      context = _ref.context;
    return classNames('p-radiobutton p-component', {
      'p-highlight': props.checked,
      'p-disabled': props.disabled,
      'p-invalid': props.invalid,
      'p-variant-filled': props.variant ? props.variant === 'filled' : context && context.inputStyle === 'filled'
    });
  },
  box: 'p-radiobutton-box',
  input: 'p-radiobutton-input',
  icon: 'p-radiobutton-icon'
};
var RadioButtonBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'RadioButton',
    autoFocus: false,
    checked: false,
    className: null,
    disabled: false,
    id: null,
    inputId: null,
    inputRef: null,
    invalid: false,
    variant: null,
    name: null,
    onChange: null,
    onClick: null,
    required: false,
    style: null,
    tabIndex: null,
    tooltip: null,
    tooltipOptions: null,
    value: null,
    children: undefined
  },
  css: {
    classes: classes
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var RadioButton = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = RadioButtonBase.getProps(inProps, context);
  var elementRef = React.useRef(null);
  var inputRef = React.useRef(props.inputRef);
  var _RadioButtonBase$setM = RadioButtonBase.setMetaData({
      props: props
    }),
    ptm = _RadioButtonBase$setM.ptm,
    cx = _RadioButtonBase$setM.cx,
    isUnstyled = _RadioButtonBase$setM.isUnstyled;
  useHandleStyle(RadioButtonBase.css.styles, isUnstyled, {
    name: 'radiobutton'
  });
  var select = function select(event) {
    onChange(event);
  };
  var onChange = function onChange(event) {
    if (props.disabled || props.readonly) {
      return;
    }
    if (props.onChange) {
      var checked = props.checked;
      var radioClicked = event.target instanceof HTMLDivElement;
      var inputClicked = event.target === inputRef.current;
      var isInputToggled = inputClicked && event.target.checked !== checked;
      var isRadioToggled = radioClicked && (DomHandler.hasClass(elementRef.current, 'p-radiobutton-checked') === checked ? !checked : false);
      var value = !checked;
      var eventData = {
        originalEvent: event,
        value: props.value,
        checked: value,
        stopPropagation: function stopPropagation() {
          event === null || event === void 0 || event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event === null || event === void 0 || event.preventDefault();
        },
        target: {
          type: 'radio',
          name: props.name,
          id: props.id,
          value: props.value,
          checked: value
        }
      };
      if (isInputToggled || isRadioToggled) {
        var _props$onChange;
        props === null || props === void 0 || (_props$onChange = props.onChange) === null || _props$onChange === void 0 || _props$onChange.call(props, eventData);

        // do not continue if the user defined click wants to prevent
        if (event.defaultPrevented) {
          return;
        }
        if (isRadioToggled) {
          inputRef.current.checked = value;
        }
      }
      DomHandler.focus(inputRef.current);
    }
  };
  var onFocus = function onFocus(event) {
    var _props$onFocus;
    props === null || props === void 0 || (_props$onFocus = props.onFocus) === null || _props$onFocus === void 0 || _props$onFocus.call(props, event);
  };
  var onBlur = function onBlur(event) {
    var _props$onBlur;
    props === null || props === void 0 || (_props$onBlur = props.onBlur) === null || _props$onBlur === void 0 || _props$onBlur.call(props, event);
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      select: select,
      focus: function focus() {
        return DomHandler.focus(inputRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      },
      getInput: function getInput() {
        return inputRef.current;
      }
    };
  });
  React.useEffect(function () {
    if (inputRef.current) {
      inputRef.current.checked = props.checked;
    }
  }, [props.checked]);
  React.useEffect(function () {
    ObjectUtils.combinedRefs(inputRef, props.inputRef);
  }, [inputRef, props.inputRef]);
  useMountEffect(function () {
    if (props.autoFocus) {
      DomHandler.focus(inputRef.current, props.autoFocus);
    }
  });
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = RadioButtonBase.getOtherProps(props);
  var rootProps = mergeProps({
    id: props.id,
    className: classNames(props.className, cx('root', {
      context: context
    })),
    style: props.style,
    'data-p-checked': props.checked
  }, otherProps, ptm('root'));
  delete rootProps.input;
  delete rootProps.box;
  delete rootProps.icon;
  var createInputElement = function createInputElement() {
    var ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
    var inputProps = mergeProps(_objectSpread({
      id: props.inputId,
      type: 'radio',
      name: props.name,
      defaultChecked: props.checked,
      onFocus: onFocus,
      onBlur: onBlur,
      onChange: onChange,
      disabled: props.disabled,
      readOnly: props.readonly,
      required: props.required,
      tabIndex: props.tabIndex,
      className: cx('input')
    }, ariaProps), inProps.input, ptm('input'));
    return /*#__PURE__*/React.createElement("input", _extends({
      ref: inputRef
    }, inputProps));
  };
  var createBoxElement = function createBoxElement() {
    var boxProps = mergeProps({
      className: cx('box')
    }, inProps.box, ptm('box'));
    var iconProps = mergeProps({
      className: cx('icon')
    }, inProps.icon, ptm('icon'));
    return /*#__PURE__*/React.createElement("div", boxProps, /*#__PURE__*/React.createElement("div", iconProps));
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", _extends({
    ref: elementRef
  }, rootProps), createInputElement(), createBoxElement()), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip,
    pt: ptm('tooltip')
  }, props.tooltipOptions)));
}));
RadioButton.displayName = 'RadioButton';

export { RadioButton };
