import * as React from 'react'
import { useMemo, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { InstancedRigidBodies, InstancedRigidBodyProps, CylinderCollider, BallCollider, CuboidCollider, RigidBody, Physics } from '@react-three/rapier'

export const Cart = () => {

  const cubesCount = 20;

  const shoppingCart = useGLTF('../../../../assets/shopping_cart.glb');  

  const instances = useMemo(() => {
    const instances: InstancedRigidBodyProps[] = [];

    for(let i = 0; i < cubesCount; i++)
    {
        instances.push({
            key: 'instance_' + i,
            position: 
            [ 
                (Math.random() - 0.5) * 2,
                6 + i * 0.2,
                (Math.random() -0.5) * 8
            ],
            rotation: [ Math.random(), Math.random(), Math.random() ]
        })
    }

    return instances;
  }, []);

  const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  return (
    <Canvas
      className='r3f'
      camera={ {
        fov: 45,
        near: 0.1,
        far: 2000,
        position: [ 4, 2, 8 ]
      } }
    > 
      <OrbitControls makeDefault/>

      <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
      <ambientLight intensity={ 1.5 } />

      <Physics
        gravity={ [ 0, - 9.08, 0 ] } 
        debug={ false }
      >

        {/* Carrito */}
        <RigidBody
          type='fixed'
          friction={ 0.7 }
          colliders={ "trimesh" }
        >
          <primitive object={ shoppingCart.scene } position={ [ 0, 0, 0 ] } scale={ 4 }/>
        </RigidBody>
        
        {/* Piso */}
        <RigidBody
          type='fixed'
          friction={ 0.7 }
        >
          <mesh position={ [ 0, 0, 0 ] }>
            <boxGeometry args={ [ 10, 0.5, 10 ] }/>
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        {/* Cubos */}
        <InstancedRigidBodies instances={ instances }>
            <instancedMesh castShadow args={ [ undefined, undefined, cubesCount ] } count={ cubesCount } >
                    <boxGeometry args={ [ 0.5, 0.5, 0.5] }/>
                    <meshNormalMaterial />
            </instancedMesh>
        </InstancedRigidBodies>

      </Physics>      
    </Canvas>
  )
}
