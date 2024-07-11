import React from 'react'

const MaterialTable = ({materialComponent}: any) => {

    const componentsList = Object.entries(materialComponent)

    return (
    <>
        { componentsList.map((i:any) => (
            <div>{ i }</div>
        )) }
    </>
  )
}

export default MaterialTable