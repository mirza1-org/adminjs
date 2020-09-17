import React from 'react'
import { Box, H1, Text, Label, Input } from '@admin-bro/design-system'

const ExamplePage: React.FC = () => (
  <Box variant="grey">
    <Box variant="white">
      <H1>Example page</H1>
      <H1>Which you can tailor to your needs</H1>
      <Text>
        Here you can put whatever you want, like....
      </Text>
      <Box>
        <Label size="lg">Fancy inputs</Label>
        <Input variant="xxl" borderless placeholder="I am fancy" />
      </Box>
    </Box>
  </Box>
)

export default ExamplePage
