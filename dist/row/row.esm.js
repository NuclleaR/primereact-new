'use client';
import * as React from 'react';
import { PrimeReactContext } from 'primereactnew/dist/api';
import { useMergeProps } from 'primereactnew/dist/hooks';
import { ComponentBase } from 'primereactnew/dist/componentbase';
import { ObjectUtils } from 'primereactnew/dist/utils';

var RowBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Row',
    style: null,
    className: null,
    children: undefined
  },
  getCProp: function getCProp(row, name) {
    return ObjectUtils.getComponentProp(row, name, RowBase.defaultProps);
  }
});

var Row = function Row(inProps) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = RowBase.getProps(inProps, context);
  //@todo Pass Parent MetaData
  var _RowBase$setMetaData = RowBase.setMetaData({
      props: props
    }),
    ptm = _RowBase$setMetaData.ptm;
  var rootProps = mergeProps({
    className: props.className,
    style: props.style
  }, RowBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("tr", rootProps, props.children);
};
Row.displayName = 'Row';

export { Row };
