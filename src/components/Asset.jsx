import React, { useMemo } from 'react' 
import { Skeleton, SkinnedMesh } from 'three'
import { useGLTF } from '@react-three/drei'

function Asset({url, skeleton}) {
  const {scene} = useGLTF(url)

  const attachedItems = useMemo(() => {
    const items =[];
    scene.traverse((child) => {
      if (child.isMesh) {
        items.push({
          geometry: child.geometry,
          material: child.material,
        })
      }
    })
    return items;
  }, [scene])

  return attachedItems.map((item, index) => (
    <SkinnedMesh 
      key={index}
      skeleton={skeleton} 
      geometry={item.geometry}
      material={item.material}
      castshadow 
      receiveShadow
    />
  ))
}

export default Asset
