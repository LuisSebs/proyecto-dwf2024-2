import * as React from 'react'
import { useMemo, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { AccumulativeShadows, Environment, useHelper, OrbitControls, useGLTF } from '@react-three/drei'
import { InstancedRigidBodies, InstancedRigidBodyProps, CylinderCollider, BallCollider, CuboidCollider, RigidBody, Physics } from '@react-three/rapier'
import * as THREE from 'three'
import Carrito from './Carrito'

export const Cart = () => {

  return (
    <Canvas
      shadows
      className='r3f'
      camera={ {
        fov: 42,
        near: 0.1,
        far: 2000,
        position: [ -4.03, 3.7, 6.16 ]
      } }
    > 
      <Carrito/>
    </Canvas>
  )
}
