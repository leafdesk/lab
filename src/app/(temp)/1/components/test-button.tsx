'use client'

import axios from 'axios'
import { Button } from '@chakra-ui/react'

export default function TestButton() {
  return (
    <Button
      variant="surface"
      onClick={() =>
        axios.get('/api/v1/test/log').then((res) => console.log(res))
      }
    >
      Test API Call
    </Button>
  )
}
