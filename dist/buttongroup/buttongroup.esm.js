'use client';
import * as React from 'react';
import { PrimeReactContext } from 'primereactnew/dist/api';
import { ComponentBase, useHandleStyle } from 'primereactnew/dist/componentbase';
import { useMergeProps } from 'primereactnew/dist/hooks';
import { ObjectUtils, classNames } from 'primereactnew/dist/utils';

var classes = {
  root: 'p-button-group p-component'
};
var ButtonGroupBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'ButtonGroup',
    children: undefined
  },
  css: {
    classes: classes
  }
});

var ButtonGroup = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = ButtonGroupBase.getProps(inProps, context);
  var elementRef = React.useRef(ref);
  var _ButtonGroupBase$setM = ButtonGroupBase.setMetaData({
      props: props
    }),
    ptm = _ButtonGroupBase$setM.ptm,
    cx = _ButtonGroupBase$setM.cx,
    isUnstyled = _ButtonGroupBase$setM.isUnstyled;
  useHandleStyle(ButtonGroupBase.css.styles, isUnstyled, {
    name: 'buttongroup'
  });
  React.useEffect(function () {
    ObjectUtils.combinedRefs(elementRef, ref);
  }, [elementRef, ref]);
  var rootProps = mergeProps({
    ref: elementRef,
    className: classNames(cx('root')),
    role: 'group'
  }, ButtonGroupBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("span", rootProps, props.children);
}));
ButtonGroup.displayName = 'ButtonGroup';

export { ButtonGroup };
