import { Label, LabelProps } from '@adminjs/design-system'
import React from 'react'

import { PropertyJSON } from '../../../../interfaces/index.js'
import { PropertyDescription } from '../property-description/index.js'
import allowOverride from '../../../../hoc/allow-override.js'
import { useTranslation } from '../../../../hooks/index.js'

export type PropertyLabelProps = {
  property: PropertyJSON;
  props?: LabelProps;
}

const PropertyLabel: React.FC<PropertyLabelProps> = (props) => {
  const { property, props: labelProps } = props
  const { translateProperty } = useTranslation()

  if (property.hideLabel) { return null }

  return (
    <Label
      htmlFor={property.path}
      required={property.isRequired}
      {...labelProps}
    >
      {translateProperty(property.label, property.resourceId)}
      {property.description && <PropertyDescription property={property} />}
    </Label>
  )
}

const OverridablePropertyLabel = allowOverride(PropertyLabel, 'PropertyLabel')

export {
  OverridablePropertyLabel as default,
  OverridablePropertyLabel as PropertyLabel,
}
