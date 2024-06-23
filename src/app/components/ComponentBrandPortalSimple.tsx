import { Button } from '@radix-ui/themes'
import React from 'react'

type ShowcaseType = {
  [key: string]: boolean | undefined | null
}

type ShowcaseTypeComponent = {
  keyComponent: string,
  showcaseComponent: ShowcaseType,
  setShowcaseComponent: React.Dispatch<React.SetStateAction<ShowcaseType>>,
  handleClickShowcaseComponent: () => void 
  
}

const ComponentBrandPortalSimple:React.FC<ShowcaseTypeComponent> = ({
  keyComponent,
  showcaseComponent,
  setShowcaseComponent,
  handleClickShowcaseComponent
}) => { 
  
  return (
    <Button
      onClick={handleClickShowcaseComponent}
      radius="medium"
      variant="surface"
      color="crimson"
      size="2">
        <div className='text-xs mx-3 cursor-pointer'>
          Materials for { keyComponent }
        </div>
    </Button>
  )
}

export default ComponentBrandPortalSimple