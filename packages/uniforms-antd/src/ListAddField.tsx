import Button, { ButtonProps } from 'antd/lib/button';
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { filterDOMProps, joinName, Override, useField } from 'uniforms';
import omit from 'lodash/omit';

export type ListAddFieldProps<T> = Override<
  ButtonProps,
  {
    initialCount?: number;
    parent?: any;
    name: string;
    disabled?: boolean;
    value?: T;
  }
>;

function ListAdd<T>(rawProps: ListAddFieldProps<T>) {
  const props = useField<ListAddFieldProps<T>, T>(rawProps.name, rawProps, {
    initialValue: false,
  })[0];

  const parentName = joinName(joinName(null, props.name).slice(0, -1));
  const parent = useField<{ maxCount?: number }, T[]>(parentName, {})[0];
  if (rawProps.parent) Object.assign(parent, rawProps.parent);

  const limitNotReached =
    !props.disabled && !(parent.maxCount! <= parent.value!.length);
  return (
    <Button
      disabled={!limitNotReached || rawProps.disabled}
      onClick={() => {
        if (limitNotReached)
          parent.onChange(parent.value!.concat([cloneDeep(props.value!)]));
      }}
      {...filterDOMProps(omit(props, ['value']))}
    />
  );
}

ListAdd.defaultProps = {
  icon: 'plus-square-o',
  size: 'small',
  style: { width: '100%' },
  type: 'dashed',
};

export default ListAdd;
