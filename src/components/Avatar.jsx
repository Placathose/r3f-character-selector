import { useGLTF, Html } from '@react-three/drei'
import { useRef } from 'react'

function Avatar({ ...props }) {
  const group = useRef()
  const { nodes } = useGLTF('/models/Armature.glb')

  console.log(nodes)

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  )
}

export default Avatar