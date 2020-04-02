import React, { HTMLProps } from 'react';
import classnames from 'classnames';
import { filterDOMProps, joinName, Override, useField } from 'uniforms';

export type ListDelFieldProps<T> = Override<
  HTMLProps<HTMLSpanElement>,
  {
    disabled?: boolean;
    parent?: any;
    value?: any;
    name: string;
    className: string;
  }
>;

export default function ListDel<T>(rawProps: ListDelFieldProps<T>) {
  const props = useField<ListDelFieldProps<T>, T>(rawProps.name, rawProps, {
    initialValue: false,
  })[0];

  const nameParts = joinName(null, props.name);
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ minCount?: number }, T[]>(parentName, {})[0];
  if (rawProps.parent) Object.assign(parent, rawProps.parent);

  const fieldIndex = +nameParts[nameParts.length - 1];
  const limitNotReached =
    !props.disabled && !(parent.minCount! >= parent.value!.length);
  return (
    <i
      {...filterDOMProps(props)}
      className={classnames(
        'ui',
        rawProps.className,
        limitNotReached ? 'link' : 'disabled',
        'fitted close icon',
      )}
      onClick={() => {
        if (limitNotReached) {
          const value = parent.value!.slice();
          value.splice(fieldIndex, 1);
          parent.onChange(value);
        }
      }}
    />
  );
}
